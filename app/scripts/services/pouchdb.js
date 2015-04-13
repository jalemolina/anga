'use strict';

/**
 * @ngdoc service
 * @name angaApp.pouchdb
 * @description
 * # pouchdb
 * Factory in the angaApp.
 */
angular.module('angaApp')
  .factory('$db', function ($log, pouchDB, $q, $rootScope) {

    var db = {'cursos': pouchDB('cursos', {adapter : 'idb'}),
            'alumnos': pouchDB('alumnos', {adapter : 'idb'})
    };

    db.cursos.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', function (change) {
      // change.id contains the doc id, change.doc contains the doc
      if (change.deleted) {
        $log.info('El documento fue borrado');
      } else {
        $log.info('Se añadió o modificó: ', change.doc)
      }
    }).on('error', function (err) {
      $log.error(err)
    });

    // Arreglar las demas funciones del wrapper de no tienen deferred
    var wrapper = {
      'getAllCursos': function() {
        var deferred = $q.defer();
        db.cursos.allDocs({
          include_docs: true,
          descending: true
        })
        .then(function (doc) {
          console.info('Obteniendo todos los cursos', doc.rows);
          deferred.resolve(doc.rows);
        })
        .catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getAllAlumnos': function() {
        db.alumnos.allDocs({include_docs: true, descending: true}, function(err, doc) {
          console.info('Obteniendo todos los alumnos', doc.rows);
          return doc.rows;
        });
      },
      'getCurso': function(item) {
        var deferred = $q.defer();
        db.cursos.get(item).then(function (doc) {
          deferred.resolve(doc);
        }).catch(function (err) {
          console.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getAlumno': function(item) {
        db.alumnos.get(item).then(function (doc) {
          // handle doc
          return doc;
        }).catch(function (err) {
          console.error(err);
        });
      },
      'insertCurso': function(curso) {
        db.cursos.post(curso, function callback(err, result) {
          if (!err) {
            console.log('Se añadió correctamente el curso!', curso);
          } else {
            console.error('Error: ', err)
          }
        });
      },
      'insertAlumno': function(alumno) {
        db.alumnos.post(alumno, function callback(err, result) {
          if (!err) {
            console.log('Se añadió correctamente el curso!', alumno);
          } else {
            console.error('Error: ', err)
          }
        });
      },
      'removeCurso': function(item) {
        var deferred = $q.defer();
        db.cursos.get(item).then(function(doc) {
          deferred.resolve(db.cursos.remove(doc));
        }).catch(function (err) {
          console.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'removeAlumno': function(item) {
        db.alumnos.get(item).then(function(doc) {
          return db.alumnos.remove(doc);
        }).then(function (result) {
          // handle result
        }).catch(function (err) {
          console.error(err);
        }); 
      }
    };

    // Public API here
    return wrapper;
  });
