'use strict';

var utils = require('../utils/writer.js');
var NewsService = require('../service/NewsService');

module.exports.getNews = function getNews (req, res, next) {
  NewsService.getNews()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
