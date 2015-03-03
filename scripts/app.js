'use strict';

/* App Module */

var topShowsApp = angular.module('topShowsApp', [
  'ngRoute',
  'ui.date',

  'topShowsServices',
  'topShowsControllers',
  'topShowsFilters'
]);

topShowsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/shows/search/location', {
        templateUrl: 'partials/show-search-location.html',
        controller: 'ShowSearchLocationCtrl'
      }).
      when('/shows/search/artist', {
        templateUrl: 'partials/show-search-artist.html',
        controller: 'ShowSearchArtistCtrl'
      }).
      when('/show/:showId', {
        templateUrl: 'partials/show-detail.html',
        controller: 'ShowDetailCtrl'
      }).
      otherwise({
        redirectTo: '/shows/search/location'
      });
  }]);