'use strict';

/**
 * @ngdoc function
 * @name project1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the project1App
 */
angular.module('project1App')
  .controller('MainCtrl', function ($scope, forecast) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.myawesomeThings = function() {
    	return true;
    };
    forecast.currentData().then(function(response){
      var result = response.data;
    }, function(error) {
      var errorResponse = error;
    });

  });
