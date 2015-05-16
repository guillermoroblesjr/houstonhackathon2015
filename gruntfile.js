module.exports = function (grunt) {
	"use strict";

	/**
	 * Grunt Config
	 */
	grunt.initConfig({

		/**
		 * Get package.json data
		 */
		pkg: grunt.file.readJSON("package.json"),


		/**
		 * Mocha Unit Tests & Blanket Coverage
		 */
		blanket_mocha: {
			all: ["test/**/*.html"],
			options: {
				threshold: 90,
				run: false
			}
		},

	  connect: {
	    tests: {
	      options: {
	        port: 9101,
	        base: './'
	      }
	    }
	  }

	});

	// Load NPM Tasks
	grunt.loadNpmTasks("grunt-blanket-mocha");
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Register Tasks
	grunt.registerTask("tests", ["blanket_mocha", "connect:tests:keepalive"]);

	grunt.registerTask("default", ["tests"]);

};
