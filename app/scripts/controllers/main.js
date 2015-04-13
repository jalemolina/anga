'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$modal', '$db', '$log',
    function ($scope, $rootScope, $modal, $db, $log) {
        $scope.cursos = [];

        var refresh = function() {
          $db.getAllCursos()
          .then(function(doc) {
            $scope.cursos = doc;
          });
        };
        refresh();
        $scope.$on("REFRESH", refresh);

        // agregar esto en cada controlador para que funcione material-design
        $scope.$watch('$viewContentLoaded', function(){
          $.material.init();
        });

        $scope.showModal = function() {
          $scope.nuevoCurso = {};
          var modalInstance = $modal.open({
            templateUrl: 'views/nuevo-curso.html',
            controller: 'NuevocursoCtrl',
            resolve: {
              nuevoCurso: function() {
                return $scope.nuevoCurso;
              }
            }
          });

          modalInstance.result.then(function(selectedItem) {
            var temp = {'anio': selectedItem.anio,
                        'divisiones': selectedItem.divisiones
            };
            
            $db.insertCurso(temp);
            $scope.$broadcast("REFRESH");
          });
        };

        $scope.showDeleteModal = function(id) {

          $scope.idCurso = id;
          var modalInstance = $modal.open({
            templateUrl: 'views/borrar-anio.html',
            controller: 'borrarAnioCtrl',
            resolve: {
              idCurso: function() {
                return $scope.idCurso;
              }
            }
          });

          modalInstance.result.then(function(selectedItem) {
            $db.removeCurso(selectedItem)
            .then(function() {
              $scope.$broadcast("REFRESH");
            });
          });
        };
  }])
  .controller('NuevocursoCtrl', function ($scope, $modalInstance, nuevoCurso) {
    $scope.nuevoCurso = nuevoCurso;
    $scope.nuevoCurso.divisiones = {
      a: true,
      b: true,
      c: true,
      d: true,
      e: false,
      f: false,
      g: false
    };
    $scope.$watch('$viewContentLoaded', function(){
      $.material.init();
    });
    $scope.agregarNuevoCurso = function() {
      $modalInstance.close(nuevoCurso);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('borrarAnioCtrl', function ($scope, $modalInstance, idCurso, $db, $log) {
    $scope.idCurso = idCurso;

    $db.getCurso(idCurso)
    .then(function(doc) {
      $scope.bCurso = doc;
    });

    $scope.$watch('$viewContentLoaded', function(){
      $.material.init();
    });

    $scope.borrarCurso = function() {
      $modalInstance.close(idCurso);
    };
    
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
