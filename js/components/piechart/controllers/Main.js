define(function(require){

  'use strict';

  var angular = require('angular');
  var _ = require('lodash');

  // Add the main controller
  return function(){
    
    angular.module('app').controller('MainCtrl', [
      // Controller Dependencies
      '$scope',
      
      // Constructor function
      function($scope, $http/*, Awesome*/){

        // ===[ Properties ]===

        $scope.controllerDefaults = {};
 
        // ===[ Methods ]===


        // Apply defaults when instantiated
        (function($scope){
          // Create Classes

        })($scope);
      }
    ]);
  };
});


