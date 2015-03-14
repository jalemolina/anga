'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
