const mongoose = require('mongoose');

const connectToDb = async () =>{
   try{
       await mongoose.connect('mongodb+srv://teacher:!Password123@cluster0.eqsmq3y.mongodb.net/test')
        console.log("connected")
   }
    catch(err){console.log(err)}
}

module.exports = connectToDb;