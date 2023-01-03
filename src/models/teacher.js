const mongoose  = require("mongoose");

const teacherSchema = mongoose.Schema({
    name:{ type:String, required:true},
    password:{type:String},
})

module.exports = mongoose.model( "Teach_data", teacherSchema)