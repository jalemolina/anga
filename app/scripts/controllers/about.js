'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
