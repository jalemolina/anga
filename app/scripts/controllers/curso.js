'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:CursoCtrl
 * @description
 * # CursoCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('CursoCtrl', function ($scope, $routeParams, $modal, $db) {
      //$indexedDB.openStore('curso', function(store) {
        //store.getAll().then(function(curso) {
          //$scope.alus = curso;
        //});
      //});

    console.info($routeParams.anio, $routeParams.div);
    $scope.cargar = function() {
      console.info('estoy en la funcion cargar');
      //$indexedDB.openStore('alumno', function(store) {
        //store.insert({'apellido': 'Molina',
                       //'nombre': 'alejandro',
                       //'dni': 293878050,
                       //'asistencia': {'motivo': '',
                                       //'asignatura': 'electricidad',
                                       //'fecha': 'hoy',
                                       //'turno': 't',
                                       //'estado': 'a'},
                       //'curso': {'anio': $routeParams.anio, 'division': $routeParams.div},
                       //'obs': ''})
        //.then(function(e){console.info(e)});
        //store.getAll().then(function(alumno) {
          //$scope.alus = alumno;
        //});
      //});
    };

  });
