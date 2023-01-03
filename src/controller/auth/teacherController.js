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
        console.log(req)
        const password = req.body.password;
        const username = req.body.userEmail;
        console.log("u are at auth, and ur name is: "+username)
        let result = await teacher_model.find({name:username})
        let verified = await cryptService.verify(password, result[0].password)
        if(!verified)
         throw ("Wrong password")
        else   
            {
                sessionStorage.setItem("username",username)
                res.render("showStudents",{uname:username})
            }
    }catch(error){
        res.render("landingPage", {error: error})
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
const removeResult = async (req,res,next)=>{
    try{
        const {rollno} = req.body;
        if(!rollno)
            throw("Insufficient arguments")
        else
        {
            let status = await student_model.findOneAndRemove({roll:rollno})
            if(status)
                res.status(200).send("Successfully removed one entry")
            else
                throw("Something went wrong while performing this operation.")
        }
    }catch(error)
    {
        res.status(400).send(error+"Something went wrong")
    }
}
const addStudent =  async (req, res) =>{
    try {
        const {name, roll, dob, marks} = req.body;
        if(!roll || !name || !dob || !marks)
        throw("Insufficient arguments")
        const studentData = student_model.create({name:name, roll:roll, marks:marks, dob:dob})
        if(studentData)
            res.status(200).send("Succesfully inserted data")
        else
            throw("Something went wrong.")
    }catch(error){
        res.status(400).send(error);
        }
        
    }
module.exports = {authFunction, verifyLogin, updateResult, fetchAllResult, removeResult, addStudent};
