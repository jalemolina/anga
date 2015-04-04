'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:CursoCtrl
 * @description
 * # CursoCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('CursoCtrl', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.info($routeParams.anio, $routeParams.div);
  });
