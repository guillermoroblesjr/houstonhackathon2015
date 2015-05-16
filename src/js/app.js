define(function(require){
  
  'use strict';

  var _ = require('lodash'),
      angular = require('angular'),
      Class = require('Class');

  var MainController = require('components/piechart/controllers/Main');

  // Set up the Angular app dependencies
  var appDependencies = [];

  // Initialize the app
  var app = angular.module('app', appDependencies);

  // Add the configurations
  // app.config([]);

  // Add the controllers
  MainController();

  // Add the directives
  // rootEventHandlerDirective();
  // rootEventHandlerTestDirective();

  // Manually bind angular due to asyncronously loading
  angular.bootstrap(document, ['app']);

});