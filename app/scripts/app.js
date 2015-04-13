'use strict';

/**
 * @ngdoc overview
 * @name angaApp
 * @description
 * # angaApp
 *
 * Main module of the application.
 */

//window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

//var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

//var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;


angular
  .module('angaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'pouchdb'
  ])
  .config(function ($provide, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/curso/:anio/:div', {
        templateUrl: 'views/curso.html',
        controller: 'CursoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $provide.constant('_', window._);
  });
