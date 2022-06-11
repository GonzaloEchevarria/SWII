'use strict';
const dbo = require('../db/connection');
const ObjectID = require('mongodb').ObjectID;
/**
 * Obtener Un listado de nuevas recetas
 * Obtiene un listado con las nuevas recetas y sus enlaces
 *
 * returns news
 **/
exports.getNews = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "descripcion" : "descripcion",
  "link" : "link",
  "title" : "title"
}, {
  "descripcion" : "descripcion",
  "link" : "link",
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}