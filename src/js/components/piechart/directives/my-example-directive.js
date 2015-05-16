define(function(require){

  var angular = require('angular');
  require('ngRoute');
  var _ = require('lodash');
  var $ = require('jquery');

  return function(){

    angular.module('app').directive('myExampleDirective', function() {

      'use strict';

      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<button id=\"showMenu\" class=\"btn btn-default\"></button>',
        link: function (scope, element, attrs) {
         
          var $scope = scope,
              $el = $(element),
              attr = attrs;


        } 
      };
    });
  };
});