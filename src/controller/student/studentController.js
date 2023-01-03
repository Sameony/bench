const crypt = require("../../config/bcrypt");
const student_model = require("../../models/students")

const authFunction =  async (req, res) =>{
    try {
    const {name, dob} = req.body;
    console.log("u are at student auth, and ur name is: "+name)
    let result = await student_model.find({name:name, dob:dob})
    if(!result[0])
        throw ("No Record Found")
    else
    {
        res.status(200).send({status:"success", data:result[0]})
    }
        
    res.status(200).send("Succesfully inserted data")
}catch(error){
    res.status(400).send(error);
}
    
}


module.exports = {authFunction};
