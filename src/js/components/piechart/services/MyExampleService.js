 // jshint camelcase:false 
 // jshint unused:false

(function(window, undefined){

    'use strict';

    var myExampleService = angular.module('myExampleService', ['ngResource']);

    // 'myExampleService' service
    myExampleService.factory( 'Awesome', ['$resource', function($resource){
        console.log('ran Awesome factory');
        return 'Hola!';
    }]);

})(window);