'use strict';

/**
 * @ngdoc function
 * @name angaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angaApp
 */
angular.module('angaApp')
  .controller('MainCtrl', ['$scope', '$modal',
    function ($scope, $modal) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
        // agregar esto en cada controlador para que funcione material-design
        $scope.$watch('$viewContentLoaded', function(){
          $.material.init()
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
            var newPost = "código para guardar en la db";
            console.info(newPost);

          });
        };
  }])
  .controller('NuevocursoCtrl', function ($scope, $modalInstance, nuevoCurso) {
    $scope.nuevoCurso = nuevoCurso;
    $scope.$watch('$viewContentLoaded', function(){
      $.material.init()
    });
    $scope.agregarNuevoCurso = function() {
      $modalInstance.close(nuevoCurso);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
