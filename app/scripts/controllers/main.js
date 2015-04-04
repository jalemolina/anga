'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('MainCtrl', ['$scope', '$modal', '$indexedDB',
    function ($scope, $modal, $indexedDB) {
        $scope.cursos = [];

        $indexedDB.openStore('curso', function(store) {
          store.getAll().then(function(curso) {  
            // Update scope
            $scope.cursos = curso;
          });
        });
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
            var newPost = 'código para guardar en la db, ver que pasa con selectedItem: ';
            console.info(newPost, selectedItem);
            $indexedDB.openStore('curso', function(store) {
              store.upsert({'anio': selectedItem.anio, 'divisiones': selectedItem.divisiones, 'id': ''})
              .then(function(e){console.info(e)});
              store.getAll().then(function(curso) {
                $scope.cursos = curso;
              });
            });
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
            var newPost = 'código para borrar en la db, ver que pasa con selectedItem: ';
            console.info(newPost, selectedItem);
            $indexedDB.openStore('curso', function(store) {
              store.delete(selectedItem)
              .then(function(e){console.info(e)});
              store.getAll().then(function(curso) {
                $scope.cursos = curso;
              })
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
  .controller('borrarAnioCtrl', function ($scope, $modalInstance, idCurso, $indexedDB) {
    $scope.idCurso = idCurso;

    $indexedDB.openStore('curso', function(store) {
      store.find(idCurso)
      .then(function(e){$scope.bCurso = e;});
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
