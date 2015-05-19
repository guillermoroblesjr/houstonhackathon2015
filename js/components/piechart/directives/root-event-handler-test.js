define(function(require){

  var angular = require('angular');
  var _ = require('lodash');
  var $ = require('jquery');

  return function(){

    angular.module('app').directive('rootEventHandlerTest', function() {

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
        link: function (scope, element, attrs, rootEvHdlrCtrl) {
          
          // $scope is the $scope of the root-event-handler
          var $scope = scope,
              $el = $(element),
              attr = attrs,
              rootController = rootEvHdlrCtrl[0];

          // console.log('rootEventHandlerTest has ran it\'s link function!');
          // console.log('it\'s scope is: ', $scope);
          // console.log('the rootEvHdlrCtrl is: ', rootEvHdlrCtrl);

          // we have access to the controller instance within rootEvHdlrCtrl[0]
          rootController.bindEvent({
            selector: '.column-header',
            eventType: 'click.rootEventHandlerTest, click.rootEventHandlerTest',
            handler: function(){
              console.log('guillermo said to do it.');
            }
          });
        },
        // // # Bind properties/methods to $scope available or this keyword. 
        // // # The data bound to this will be accessible in other directives 
        // // # by injecting the controller using 'require' option.
        // controller: function($scope, $element, $attrs){},
        // # Name of directive required
        require: ['^rootEventHandler'],
        // // # Default is 'false'; you share the same scope as its parent.
        // // # Using 'true' allows you to prototypically inherit from the parent scope.
        // // # Using 'isolate' is something else...google it.
        scope: false
      };
    });
  };
});