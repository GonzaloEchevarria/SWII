const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")

//FUNCIONES
router.get("/",controller.index);

router.post("/",controller.addReceta);

module.exports = router
