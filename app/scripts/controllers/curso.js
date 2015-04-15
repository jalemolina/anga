'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:CursoCtrl
 * @description
 * # CursoCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('CursoCtrl', function ($scope, $routeParams, $modal, $db, $log) {
    $scope.alus = [];

    var refresh = function() {
      $db.getAlumnosByCurso($routeParams.anio, $routeParams.div)
      .then(function(doc) {
        $scope.alus = doc.rows;
      });
    };
    refresh();
    $scope.$on("REFRESH", refresh);

    $scope.showModalNuevoAlumno = function() {
      $scope.nuevoAlumno = {};
      var modalInstance = $modal.open({
        templateUrl: 'views/nuevo-alumno.html',
        controller: 'NuevoAlumnoCtrl',
        resolve: {
          nuevoAlumno: function() {
            return $scope.nuevoAlumno;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        var temp = {apellido: selectedItem.apellido,
                   nombre: selectedItem.nombre,
                   dni: selectedItem.dni,
                   inasistencias: [],
                   calificaciones: [],
                   curso: {anio: $routeParams.anio, division: $routeParams.div},
                   obs: selectedItem.obs
        };

        $db.insertAlumno(temp);
        $scope.$broadcast("REFRESH");
      });
    };

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

    $scope.$watch('$viewContentLoaded', function(){
      $.material.init();
    });
  })
  .controller('NuevoAlumnoCtrl', function ($scope, $modalInstance, nuevoAlumno) {
    $scope.nuevoAlumno = nuevoAlumno;

    $scope.agregarNuevoAlumno = function() {
      $modalInstance.close(nuevoAlumno);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.$watch('$viewContentLoaded', function(){
      $.material.init();
    });
  });
