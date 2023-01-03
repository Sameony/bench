const crypt = require("../../config/bcrypt");
var cryptService = new crypt();
const teacher_model = require("../../models/teacher");
const student_model = require("../../models/students")
const authFunction =  async (req, res) =>{
    try {
    const {name, password} = req.body;
    console.log("u are at auth, and ur name is: "+name)
    let encoded_pass = await cryptService.cryptify(password)
    const teacherData = teacher_model.create({name:name, password:encoded_pass})
    res.status(200).send("Succesfully inserted data")
}catch(error){
    res.status(400).send(error);
}
    
}

const verifyLogin= async (req, res) =>{
    try {
        const {username, password} = req.body;
        console.log("u are at auth, and ur name is: "+username)
        let result = await teacher_model.find({name:username})
        let verified = await cryptService.verify(password, result[0].password)
        if(!verified)
         throw ("Wrong password")
        else   
            res.status(200).send("Logged in successfully")
    }catch(error){
        res.status(400).send(error);
    }
}

const fetchAllResult =async (req,res,next) =>{
    try{
        let results = await student_model.find();
        if(results.length)
        {
            res.status(200).send({status:"success", data:results})
        }
    }
    catch(error)
    {
        res.status(400).send(error);
    }
}
const updateResult = async(req,res,next) =>{
    const {updatedName, updatedDob, roll, updatedMarks} = req.body;
    let updationStatus = await student_model.findOneAndUpdate({roll:roll},{
        $set:{
            name:updatedName,
            dob:updatedDob,
            marks:updatedMarks
        }
    })
    if(updationStatus)
    {
        res.status(200).send("Successfully updated result.")
    }
    else
    {
        throw("Something went wrong. Please try again after some time")
    }
}
module.exports = {authFunction, verifyLogin, updateResult, fetchAllResult};
