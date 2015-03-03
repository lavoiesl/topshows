'use strict';

/* Filters */

var topShowsFilters = angular.module('topShowsFilters', []);

topShowsFilters.filter('urlDomain', function() {
  return function(url) {
    var parser = document.createElement('a');
    parser.href = url;

    return parser.hostname.replace(/^www\./, '');
  };
});

// http://stackoverflow.com/a/14932395
topShowsFilters.filter('range', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
        case 1:
            lowBound = 0;
            highBound = parseInt(input[0]) - 1;
            break;
        case 2:
            lowBound = parseInt(input[0]);
            highBound = parseInt(input[1]);
            break;
        default:
            return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
            result.push(i);
        return result;
    };
});

topShowsFilters.filter('encodeURI', [
  '$window',
  function ($window) {
    return $window.encodeURIComponent;
  }
]);
