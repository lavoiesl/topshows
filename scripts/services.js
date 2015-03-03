'use strict';

/* Services */

var topShowsServices = angular.module('topShowsServices', []);

topShowsServices.factory('LastFM', ['$http',
  function($http){
    return new function() {
      this.endpoint = 'http://ws.audioscrobbler.com/2.0/';
      this.options = {
        api_key: 'c6cca6523bd539429625505c94863735',
        format: 'json',
        callback: 'JSON_CALLBACK',
      };

      this.jsonp = function(method, options) {
        var url = this.endpoint + '?method=' + encodeURI(method);
        $.each($.extend({}, this.options, options), function(name, value) {
          if (value !== null) {
            url += '&' + name + '=' + encodeURI(value);
          }
        });

        return $http.jsonp(url);
      };
    };
  }]);

