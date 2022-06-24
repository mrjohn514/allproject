//require library
const mongoose = require('mongoose');

//imporitn environennt file
const env=require('./environment');

console.log(`dbname ismongodb://localhost/${env.db}`);

//connext to the database //when u write this line codeial_env name  database is created in mongodb 
mongoose.connect(`mongodb://localhost/${env.db}`);

//acquire the connection to check it is succesful or not
const db=mongoose.connection;

//if there is error handle error
db.on('error',console.error.bind(console,"connextion error"));

//if succes then hurray running
db.once('open', function(){
    console.log("bsdk connected")
})