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
        $log.info('El documento fue borrado de #cursos#');
      } else {
        $log.info('En #cursos# se añadió o modificó: ', change.doc)
      }
    }).on('error', function (err) {
      $log.error('Se produjo un error en db.cursos \n', err)
    });

    db.alumnos.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', function (change) {
      // change.id contains the doc id, change.doc contains the doc
      if (change.deleted) {
        $log.info('El documento fue borrado de #alumnos#');
      } else {
        $log.info('En #alumnos# se añadió o modificó: ', change.doc)
      }
    }).on('error', function (err) {
      $log.error('Se produjo un error en db.alumnos \n', err)
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
          $log.info('Obteniendo todos los cursos', doc.rows);
          deferred.resolve(doc.rows);
        })
        .catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getAllAlumnos': function() {
        var deferred = $q.defer();
        db.alumnos.allDocs({
          include_docs: true,
          descending: true
        })
        .then(function (doc) {
          $log.info('Obteniendo todos los alumnos', doc.rows);
          deferred.resolve(doc.rows);
        })
        .catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getCurso': function(item) {
        var deferred = $q.defer();
        db.cursos.get(item).then(function (doc) {
          deferred.resolve(doc);
        }).catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getAlumno': function(item) {
        var deferred = $q.defer();
        db.alumnos.get(item).then(function (doc) {
          deferred.resolve(doc);
        }).catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'insertCurso': function(curso) {
        db.cursos.post(curso, function callback(err, result) {
          if (!err) {
            $log.info('Se añadió correctamente el curso!', curso);
          } else {
            $log.error('Error: ', err)
          }
        });
      },
      'insertAlumno': function(alumno) {
        db.alumnos.post(alumno, function callback(err, result) {
          if (!err) {
            $log.info('Se añadió correctamente el Alumno!', alumno);
          } else {
            $log.error('Error: ', err)
          }
        });
      },
      'removeCurso': function(item) {
        var deferred = $q.defer();
        db.cursos.get(item).then(function(doc) {
          deferred.resolve(db.cursos.remove(doc));
        }).catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'removeAlumno': function(item) {
        var deferred = $q.defer();
        db.alumnos.get(item).then(function(doc) {
          deferred.resolve(db.alumnos.remove(doc));
        }).catch(function (err) {
          $log.error(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'getAlumnosByCurso': function(anio, div) {
        function map(doc) {
          console.info('En map se encontro', doc);
          emit([doc.curso.anio, doc.curso.division]);
        }

        var deferred = $q.defer();
        db.alumnos.query(map, {key: [anio, div], include_docs : true})
        .then(function (result) {
          // handle result
          console.info('en query tengo esto \n', result);
          deferred.resolve(result);
        }).catch(function (err) {
          console.error('Error al realizar consulta de alumnos por curso. \n', err);
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };

    // Public API here
    return wrapper;
  });
