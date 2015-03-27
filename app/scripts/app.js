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
    'indexedDB'
  ])
  .config(function ($provide, $routeProvider, $indexedDBProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $provide.constant('indexedDB', window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB);
    $provide.constant('_', window._);
    $provide.constant('localStorage', window.localStorage);
    $provide.constant('Offline', window.Offline);
    $indexedDBProvider
      .connection('angaIndexedDB')
      .upgradeDatabase(2, function(event, db, tx){
        var objStore = db.createObjectStore('curso', {keyPath: 'id', autoIncrement : true});
        objStore.createIndex('anio_idx', 'anio', {unique: true});
      });
  });
