'use strict';

/* Controllers */

var topShowsControllers = angular.module('topShowsControllers', ['topShowsServices', 'ngRoute']);

topShowsControllers.controller('MainCtrl', ['$scope', '$route', '$rootScope',
  function($scope, $route, $rootScope) {
    $scope.title = 'Top shows';
    $scope.route = $route;
    $scope.menu = {
      '/shows/search/location': 'By Location',
      '/shows/search/artist': 'By Artist'
    };

    $scope.$on('$routeChangeSuccess', function(ev,data) {
      if (data.$$route && data.$$route.originalPath && $scope.menu[data.$$route.originalPath]) {
        $scope.title = $scope.menu[data.$$route.originalPath];
      }
    });
  }
]);

topShowsControllers.controller('ShowSearchLocationCtrl', ['$scope', '$http', 'LastFM', '$routeParams',
  function($scope, $http, LastFM, $routeParams) {
    $scope.events = [];
    $scope.attrs = null;
    $scope.error = null;

    $scope.settings = {
      limit: 25,
      tag: null,
      location: $routeParams.location
    };

    $scope.search = function() {
      var options = $.extend({location: 'Montreal'}, {
        location: $scope.settings.location,
        limit: $scope.settings.limit,
        tag: $scope.settings.tag,
        page: $scope.settings.page
      });

      LastFM.jsonp('geo.getEvents', options).success(function(data, status) {
          if (data.events && data.events.event) {
            for (var i = 0; i < data.events.event.length; i++) {
              if (data.events.event[i].tags && typeof data.events.event[i].tags.tag == 'string') {
                // cast to array
                data.events.event[i].tags.tag = [data.events.event[i].tags.tag];
              }
              if (data.events.event[i].startDate) {
                data.events.event[i].startDate = new Date(data.events.event[i].startDate);
              }
            }

            $scope.events = data.events.event;
            $scope.attrs = data.events['@attr'] ? data.events['@attr'] : null;
          } else {
            $scope.events = [];
            $scope.attrs = null;
          }

          $scope.error = data.error ? {code: data.error, message: data.message} : null;
      });
    };

    $scope.$watch('settings', $scope.search, true);

    $scope.search();
  }]);

topShowsControllers.controller('ShowSearchArtistCtrl', ['$scope', '$http', 'LastFM', '$routeParams',
  function($scope, $http, LastFM, $routeParams) {
    $scope.events = [];
    $scope.attrs = null;
    $scope.error = null;

    $scope.settings = {
      limit: 25,
      tag: null,
      artist: $routeParams.artist
    };

    $scope.search = function() {
      if (!$scope.settings.artist) {
          $scope.events = [];
          $scope.attrs = null;
          $scope.error = null;
          return;
      }

      var options = {
        artist: $scope.settings.artist,
        limit: $scope.settings.limit,
        page: $scope.settings.page
      };

      LastFM.jsonp('artist.getEvents', options).success(function(data, status) {
          if (data.events && data.events.event) {
            for (var i = 0; i < data.events.event.length; i++) {
              if (data.events.event[i].tags && typeof data.events.event[i].tags.tag == 'string') {
                // cast to array
                data.events.event[i].tags.tag = [data.events.event[i].tags.tag];
              }
              if (data.events.event[i].startDate) {
                data.events.event[i].startDate = new Date(data.events.event[i].startDate);
              }
            }

            $scope.events = data.events.event;
            $scope.attrs = data.events['@attr'] ? data.events['@attr'] : null;
          } else {
            $scope.events = [];
            $scope.attrs = null;
          }

          $scope.error = data.error ? {code: data.error, message: data.message} : null;
      });
    };

    $scope.$watch('settings', $scope.search, true);

    $scope.search();
  }]);

topShowsControllers.controller('ShowDetailCtrl', ['$scope', '$routeParams', 'LastFM',
  function($scope, $routeParams, LastFM) {
    $scope.event = [];
    $scope.error = null;

    $scope.get = function(id) {
      LastFM.jsonp('event.getInfo', {event: id}).success(function(data, status) {
          if (data.event) {
            for (var i = 0; i < data.event.length; i++) {
              if (data.event[i].tags && typeof data.event[i].tags.tag == 'string') {
                // cast to array
                data.event[i].tags.tag = [data.event[i].tags.tag];
              }
              if (data.event[i].startDate) {
                data.event[i].startDate = new Date(data.event[i].startDate);
              }
            }

            $scope.event = data.event;
            $scope.attrs = data.event['@attr'] ? data.event['@attr'] : null;
            $scope.$parent.title = data.event.title;
          } else {
            $scope.event = [];
            $scope.attrs = null;
          }

          $scope.error = data.error ? {code: data.error, message: data.message} : null;
      });
    }

    $scope.get($routeParams.showId);
  }]);