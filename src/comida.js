const express = require("express")
const app = express()
const path = require("path")//

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

//RUTAS
const routes = require("./rutas/index")
app.use(routes)
app.use((req,res)=>{
    res.sendFile("index.html")
})

//rutas estaticas
app.use(express.static(path.join(__dirname,"../public")))
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"));
})


app.use(express.json())

app.listen(3000, ()=>{
    console.log("Servidor a la espera de conexiones ")
})




//var router = express.Router();
//const dbo = require('../db/conn');
//const ObjectID = require('mongodb').ObjectID;

