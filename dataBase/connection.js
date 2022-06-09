const mongoose = require("mongoose")
const password = "b5bHsjQwt0njEEDw"
const dbname = "comidas"
const uri = `mongodb+srv://GonzaloEchevarria:${password}@cluster0.ck48e.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports =()=> mongoose.connect(uri, {userNewUrlParser: true, useUnifiedTopology: true})





//const { MongoClient } = require("mongodb");
//const connectionString = process.env.MONGODB_URI;
//const client = new MongoClient(connectionString, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
//});

//let dbConnection;

//module.exports = {
    //connectToServer: function (callback) {
      //  client.connect(function (err, db) {
        //    if (err || !db) {
          //      return callback(err);
            //}

            //dbConnection = db.db(process.env.DB);
            //console.log("Successfully connected to MongoDB.");

            //return callback();
        //});
    //},

    //getDb: function () {
      //  return dbConnection;
    //}
//};