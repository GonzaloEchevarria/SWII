const mongoose = require("mongoose")
const user = "SWII"
const password = "YiicaAxtvAbSnjUJ"
uri = `mongodb+srv://${user}:${password}@cluster0.xihdh.mongodb.net/?retryWrites=true&w=majority`
module.exports = ()=> mongoose.connect(uri)


    //.then(() => console.log("base de datos conectada"))
    //.catch(e=>console.log(e))

