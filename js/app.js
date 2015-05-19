define(function(require){
  
  'use strict';

  var _ = require('lodash'),
      angular = require('angular'),
      Class = require('Class'),
      d3 = require('d3');

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

  var init = function( domainData, jobsData ){

    // create the basic svg and group elements
    var svg = d3.select("#donut")
      .append("svg")
      .append("g")

    svg.append("g")
      .attr("class", "slices");
    svg.append("g")
      .attr("class", "labels");
    svg.append("g")
      .attr("class", "lines");

    // create the general pie structure
    var width = 960,
        height = 450,
        radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

    var arc = d3.svg.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var getDomainData = function(){
      var defaultData = ["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"];
      var domainData;
      return domainData === undefined ? defaultData : domainData;
    };

    var getRangeData = function(){
      var defaultData = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
      var rangeData;
      return rangeData === undefined ? defaultData : rangeData;
    };

    // domainData = getDomainData();
    var rangeData = getRangeData();

    // create the color scale
    var color = d3.scale.ordinal()
      .domain( domainData )
      .range( rangeData );

    function randomData (){
      // get the currently used domain
      var labels = color.domain();

      // Returns a new array of objects
      // built from the currently used color domain.
      // The values are created randomly.
      // [{
      //   "label": "Lorem ipsum",
      //   "value": 0.24983089813031256
      // }]
      return labels.map(function(label){
        return { label: label, value: Math.random() }
      });
    }

    var key = function(d){ 
      return d.data.label;
    };

    var buildData = function(){
      // get the currently used domain
      var labels = color.domain();

      // Returns a new array of objects
      // built from the currently used color domain.
      // The values are created randomly.
      // [{
      //   "label": "Musicians",
      //   // # of non-basic jobs due to the label (job title)
      //   "value": 0.24983089813031256
      // }, ...]
      
      // return labels.map(function(label){
      //   return { label: label, value: Math.random() * 10000 }
      // });
      var giveJobsForAJob = function( item ){

        var jobTitle = item;
        var jobsCreated = Math.random() * 10000;

        // must return an object with: {
        // 'label': '<Job title>', value: <# of non-basic jobs due to the label>}
        return {
          label: jobTitle,
          value: jobsCreated
        };
      };

      var data = _.map( labels, giveJobsForAJob );
      return data;
    };

    var runInitialVisualization = function(){
      // data returned example
      // [{
      //   "label": "Lorem ipsum",
      //   "value": 0.9449701141566038
      // }, ... ];
      
      // var data = randomData();
      // var data = buildData();
      change( jobsData );
    };

    runInitialVisualization();

    // button click handler
    // runs change( data ) with new random data
    d3.select(".randomize")
      .on("click", function(){
        var data = randomData();
        change( data );
      });

    function change(data) {

      /* ------- PIE SLICES -------*/
      var renderPieSlices = function( pieData /*, attrChangeVal*/ ){
        // Bind data
        var slice = svg.select(".slices").selectAll("path.slice")
          .data( pieData, key );

        // Enter
        slice.enter()
          .insert("path")
          .style("fill", function(d) { return color(d.data.label); })
          .attr("class", "slice");

        // Update
        slice   
          .transition().duration(1000)
          .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              return arc(interpolate(t));
            };
          })

        // Exit
        slice.exit().remove();
      };

      var getPieData = function( data ){
        return pie(data);
      };

      // pieData example
      // [{
      //   "data": {
      //     "label": "Lorem ipsum",
      //     "value": 0.9449701141566038
      //   },
      //   "value": 0.9449701141566038,
      //   "startAngle": 0,
      //   "endAngle": 1.094470332723908,
      //   "padAngle": 0
      // }];
      var pieData = getPieData( data );

      renderPieSlices( pieData );

      /* ------- TEXT LABELS -------*/

      var text = svg.select(".labels").selectAll("text")
        .data(pie(data), key);

      text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
          return d.data.label;
        });
      
      function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
      }

      text.transition().duration(1000)
        .attrTween("transform", function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            return "translate("+ pos +")";
          };
        })
        .styleTween("text-anchor", function(d){
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start":"end";
          };
        });

      text.exit()
        .remove();

      /* ------- SLICE TO TEXT POLYLINES -------*/

      var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), key);
      
      polyline.enter()
        .append("polyline");

      polyline.transition().duration(1000)
        .attrTween("points", function(d){
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };      
        });
      
      polyline.exit()
        .remove();
    };
  };

  d3.csv("../src/data/2014-El-Paso-Job-Titles-and-Jobs-per-Job.csv")
    .header("header-name", "header-value")
    .get(function(error, data) {

      var domainData = _.map( data, function(item){
        return item.occupationTitle;
      });

      var jobsData = _.map( data, function(item){
        return {
          label: item.occupationTitle,
          value: parseInt( item.jobsCreated )
        };
      });

      init( domainData, jobsData );
    });

});