// This is to help you create event handlers delegated from a 'root' location.
// The root DOM node is set where you place the 'root-event-handler' attribute.
// All events will be delegated from that node. Typically, it is the <body>.

define(function(require){

  var angular = require('angular');
  var $ = require('jquery');

  return function(){

    angular.module('app').directive('rootEventHandler', function() {

      'use strict';

      return {
        // # Good info located at:
        // # https://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/
        restrict: 'A',
        // // # Use replace:true if template/templateUrl is used.
        // template: '<div></div>'
        // tempalteUrl: 'myTemplate.html'
        // replace: true,
        // // # Higher priorities get executed first. Default is zero.
        // priority: 0,
        // // # Setting 'true' allows your directive to consume the existing content
        // // # of an element into a template.
        // transclude: false,
        // // # Runs ONLY ONCE
        // compile: function(tElement, tAttrs){},
        // # Runs anytime the scope changes.
        // # The 4th parameter is only available if the option 'require' is used.
        link: function (scope, element, attrs /*, 'SomeCtrl'*/) {
          var $scope = scope,
              $el = $(element),
              attr = attrs;
        },
        // # Bind properties/methods to $scope available or this keyword. 
        // # The data bound to this will be accessible in other directives 
        // # by injecting the controller using 'require' option.
        controller: function($scope, $element, $attrs){

          this.$scope = $scope;
          this.$element = $element;
          this.$attrs = $attrs;
          this.$scope.eventTypes = {};

          // give the root-event-handler:
          //    1. $el.delegate('#catalog','mouseover mouseleave', $scope, function(e){}
          //    2. $scope.$broadcast('overlaychange', 'hello!');
          this.bindEvent = function(data){
            var scope = this.$scope;
            var $element = $(this.$element);
            
            var checkIfApplied = function(scope, eventType){
              if (scope.eventTypes[eventType] !== true) {
                return false;
              } else {
                return true;
              }
            };
            // check if the selector has already been applied. if applied more than once
            // it'll run more times than you want!
            var isApplied = checkIfApplied(scope, data.eventType);
            if (!isApplied) {
              $element.delegate( data.selector, data.eventType, $scope, data.handler );
              scope.eventTypes[data.eventType] = true;
            };
          };
        },
        // // # Name of directive required
        // require: ['someDirective'],
        // # Default is 'false'; you share the same scope as its parent.
        // # Using 'true' allows you to prototypically inherit from the parent scope.
        // # Using 'isolate' is something else...google it.
        scope: false
      };
    });
  };
});