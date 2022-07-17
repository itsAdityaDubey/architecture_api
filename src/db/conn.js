const mongoose = require("mongoose");
//  For Server
// const dbName = "stplayer";
// `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${dbName}.v2fuw.mongodb.net/?retryWrites=true&w=majority`

// For Local use
mongoose.connect(`mongodb://localhost:27017/stplayer`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

console.log("Connection Successfull");
}).catch((e)=>{
    console.log(`Cannot Connect:${e}`);
});

