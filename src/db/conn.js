const mongoose = require("mongoose");
const dbName = "portfolio";

//  For Server
mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${dbName}.c2llnif.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

// For Local use
// mongoose.connect(`mongodb://localhost:27017/${dbName}`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

console.log("Connection Successfull");
}).catch((e)=>{
    console.log(`Cannot Connect:${e}`);
});

