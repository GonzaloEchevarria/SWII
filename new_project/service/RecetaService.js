'use strict';
const dbo = require('../db/connection');
const ObjectID = require('mongodb').ObjectID;

/**
 * Crear una nueva receta
 * TODO
 *
 * body Receta_editada  (optional)
 * returns info_nuevo_elemento
 **/
exports.createReceta = function(body) {
  return new Promise(function(resolve, reject) {
    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('recetas');
    collection.find({}).sort({_id:-1}).limit(1).toArray((err, result)=> {
      let newId = result[0]._id+1;
      body._id=newId;
      collection.insertOne(body, (err, result) => {
        if(err) {
        console.log(err);
        reject({codigo: 500, descripcion: "Se ha producido un error"});
      } else{
        resolve({id: result.insertedId});
      }
      });
    });
  });
}


/**
 * Borrar una receta específica
 * TODO
 *
 * id id ID del elemento
 * no response value expected for this operation
 **/
exports.deleteReceta = function(id) {
  return new Promise(function(resolve, reject) {
    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('recetas');
    collection.deleteOne({_id:id}, (err, result) => {
      if(err) {
        console.log(err);
        reject({codigo: 500, descripcion: "Se ha producido un error"});
      } else{
        if(result.deletedCount == 0) reject({codigo: 404, descripcion: "No existe ninguna receta con ese identificador"})
        else resolve("OK");
      }
    });
  });
}





/**
 * Obtener información de una receta concreta
 * TODO
 *
 * id id ID del elemento
 * returns receta
 **/
exports.getReceta = function(id) {
  return new Promise(function(resolve, reject) {
    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('recetas');
    collection.findOne({_id:id}, (err, result) => {
      if(err) {
        console.log(err);
        reject({codigo: 500, descripcion: "Se ha producido un error"});
      } else{
        if(result == null) reject({codigo: 404, descripcion: "No existe ninguna receta para el id indicado"});
        else resolve(result);
      }
    });
  });
}


/**
 * Obtener todas las recetas
 * Obtener un listado de todas las recetas
 *
 * returns recetas
 **/
exports.getRecetas = function(page, page_size, search) {
  return new Promise(function(resolve, reject) {
    console.log(search);
    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('recetas');
    var f = {};
      if(search != undefined) f = {Title: {$regex: new RegExp( "^" +search.toLowerCase(), "i")}};
    collection.countDocuments(f).then((count) => {
      if(count == 0) reject({codigo: 404, descripcion: "No se ha encontrado ninguna receta"});
      if(page_size == null) {
        page_size = 20;
      }
      if(page == null) {
        page = 1;
      } else if((page-1)*page_size>count) reject({codigo: 400, descripcion: "limite de páginas superado"});
      var page_count = Math.ceil(count/page_size);
      collection
        .find(f)
        .skip((page-1)*page_size)
        .limit(page_size)
        .toArray(function (err, result){
          if (err){
            reject({codigo: 500, descripcion: "Error al obtener las recetas"});
          } else {
            if (result.length > 0) {
              resolve({page:page,page_size:page_size,page_count:page_count,data:result});
            } else {
              resolve();
            }
          }
      });
    });
  });
}


/**
 * Modificar información de una receta concreta
 * TODO
 *
 * body Receta_editada  (optional)
 * id id ID del elemento
 * no response value expected for this operation
 **/
exports.updateReceta = function(body,id) {
  return new Promise(function(resolve, reject) {
    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('recetas');
    body._id= id
    collection.replaceOne({_id:id}, body, (err, result) => {
      if(err) {
        console.log(err);
        reject({codigo: 500, descripcion: "Se ha producido un error"});
      } else{
        if(result.modifiedCount == 0) reject({codigo: 404, descripcion: "No existe ninguna receta con ese identificador"})
        else resolve("OK");
      }
    });
  });
}

