'use strict';

var utils = require('../utils/writer.js');
var Receta = require('../service/RecetaService');
const { create } = require('xmlbuilder2');

module.exports.createReceta = function createReceta (req, res, next, body) {
  Receta.createReceta(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res,response,response.codigo);
    });
};

module.exports.deleteReceta = function deleteReceta (req, res, next, id) {
  Receta.deleteReceta(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res,response,response.codigo);
    });
};

module.exports.getReceta = function getReceta (req, res, next, id) {
  Receta.getReceta(id)
    .then(function (response) {
      if(req.headers.accept && req.headers.accept == "application/xml"){
          response['@id'] = response._id;
          let tm = [];
          for (var i = response.Ingredients.length - 1; i >= 0; i--) {
            tm.push(response.Ingredients[i]);
          }
          delete response.Ingredients;
          delete response._id;
          console.log(response);
          res.writeHead(200, {'Content-Type': 'application/xml'});
          let tmp = create({receta: response});
          let ing = tmp.root().ele("Ingredients");
          tm.forEach((val) => {
            ing.ele('Ingredient').txt(val);
          });
          const xml = tmp.end({ prettyPrint: true });
          res.end(xml);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      if(req.headers.accept == "application/xml"){
        let payload = create();
        let error = payload.ele('error');
        error.ele('codigo').txt(response.codigo);
        error.ele('description').txt(response.descripcion);
        res.writeHead(response.codigo, {'Content-Type': 'application/xml'});
        res.end(payload.end({prettyPrint: true}));
      } else {
        utils.writeJson(res,response,response.codigo);
      }
    });
};

module.exports.getRecetas = function getRecetas (req, res, next, page, page_size) {
  Receta.getRecetas(page, page_size)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.log(response);
      utils.writeJson(res,response,response.codigo);
    });
};

module.exports.updateReceta = function updateReceta (req, res, next, body, id) {
  Receta.updateReceta(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res,response,response.codigo);
    });
};
