const controller = {}

//comportamiento
controller.index = (req,res)=>{
    res.send("Conexion correcta")
}

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