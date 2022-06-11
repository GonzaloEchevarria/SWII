'use strict';

var utils = require('../utils/writer.js');
var Receta = require('../service/NewsService');

module.exports.getNews = function getNews (req, res, next) {
  Receta.getNews()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
