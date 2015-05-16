/* global mocha */
require(["../src/js/require-config"], function () {

	require.config({
		baseUrl: "../src/js",
		paths: {
			chai: "vendor/chai/chai",
			sinon: 'vendor/sinon/lib/sinon',
			'sinon-chai': 'vendor/sinon-chai/lib/sinon-chai'
		},
		shim: {
			'sinon-chai': {
				deps: ['chai']
			}
		}
	});

	require([ "chai" , 'sinon', 'sinon-chai'], function (chai, sinon, sinonChai) {
			
			chai.use(sinonChai);
			chai.should();
			window.expect = chai.expect;
			window.assert = chai.assert;
			mocha.setup("bdd");

			require([ "specs.js" ], function () {
				mocha.run();

			  var $ = require('jquery');

			  // Automatically view some file code coverage
			  $(document).ready(function(){
			    setTimeout(function(){

			      var fileNameToToggle = 'SomeFile.js';

			      $('a').each(function(index, el){
			        var $this = $(this);
			        var stringLocation = $this.text().search(fileNameToToggle);
			        if (stringLocation > 1) {
			          // debugger;
			          var fullEl = $this[0];
			          fullEl = fullEl.toString();
			          var startFileString = fullEl.search('"file-');
			          var id = fullEl.slice(startFileString + 1, startFileString + 7);
			          $('#' + id).toggle();
			        };
			      });

			    }, 500);
			  });

			});
		});

});