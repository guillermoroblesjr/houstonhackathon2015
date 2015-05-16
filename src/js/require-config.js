(function(){

  'use strict';

  var bc = '../../bower_components/';

  require.config({
    paths: {
      app: './app',
      main: './main',
      Class: './components/Class.js/Class',

      // Bower Components
      angular: bc + 'angular/angular.min',
      lodash: bc + 'lodash/lodash.min',
      d3: bc + 'd3/d3.min'
    },
    shim: {
      jquery: {
        exports: 'jQuery'
      },
      Class: {
        exports: 'Class'
      },
      angular: {
        exports: 'angular'
      },
      d3: {
        exports: 'd3'
      }
    },
  });

})();