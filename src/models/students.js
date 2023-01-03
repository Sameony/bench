const mongoose  = require("mongoose");

const studentSchema = mongoose.Schema({
    name:{ type:String, required:true},
    dob:{type:Date},
    roll:{type:Number},
    marks:{type:Number}
    
})

module.exports = mongoose.model( "student_data", studentSchema)