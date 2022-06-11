'use strict';

var utils = require('../utils/writer.js');
var Nutricional = require('../service/NutricionalService');

module.exports.getNutricional = function getNutricional (req, res, next, ingrediente) {
  Nutricional.getNutricional(ingrediente)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
