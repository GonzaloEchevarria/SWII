const express = require("express")
const { ruta } = require("./rutas/index")
const app = express()

//RUTAS
const routes = require("./rutas/index")
app.use(routes)

app.listen(3000, ()=>{
    console.log("Servidor a la espera de conexiones ")
})




//var router = express.Router();
//const dbo = require('../db/conn');
//const ObjectID = require('mongodb').ObjectID;

