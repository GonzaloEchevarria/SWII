
'use strict';

require('dotenv').config();

var path = require('path');
var http = require('http');
var express = require('express');
const dbo = require('./db/connection');

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

var oas3Tools = require('oas3-tools');
var serverPort = normalizePort(process.env.PORT || '8080');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
app.use(express.static('public'));

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}