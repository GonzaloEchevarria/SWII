const controller = {};
const connection =require("../dataBase/connection");
const ReceModel = require("../models/recetas.model")

//comportamiento
controller.index = async (req,res)=>{
    try {
        //const title = "RECETAS"
        await connection()
        console.log("Conexion BD OK")
        const allRecetas = await ReceModel.find()
        console.log(allRecetas)
        //res.render("index", {title});
        res.json(allRecetas)
    }catch (err){
        console.error(err)
    }
};

controller.addReceta = async (req,res)=>{
    try {
        console.log(req.body);
        const receta = {
            titulo: req.body.titulo,
            ingredientes: req.body.ingredientes,
            instrucciones: req.body.instrucciones,
            imagen: req.body.imagen
        };
        await connection();
        await ReceModel.create(receta)
        const allRecetas = await ReceModel.find()
        console.log(allRecetas)
        res.status(201).send("Receta añadida")
    }catch (err){
        res.status().send("Error al añadir receta")
        console.error(err)
    }
};

module.exports = controller
