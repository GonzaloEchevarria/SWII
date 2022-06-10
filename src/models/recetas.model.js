const mongoose = require("mongoose")
const { Schema } = mongoose

const ReceSchema = new Schema({
    titulo: String,
    ingredientes: String,
    instrucciones: String,
    imagen: String
})

const ReceModel = mongoose.model("Comidas", ReceSchema)

module.exports = ReceModel