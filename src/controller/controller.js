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

module.exports = controller



//const connection = require("../../dataBase/connection")


//controller.index = async (req,res)=>{
  //  try {
    //    const title = "INDEX desde el servidor"
      //  await connection()
        //console.log("CONECTION OK")
        //res.render("index", {title})
    //}catch (err){
      //  console.error(err)
    //}
//}

//module.exports = controller