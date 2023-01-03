
const student_model = require("../../models/students")

const fetchOneResult = async (req,res,next)=>{
    try{
        const {rollno, dob} = req.body;
        if(!rollno || !dob)
            throw("Insufficient arguments")
        else
        {
            let status = await student_model.findOne({roll:rollno, dob:dob})
            if(status)
                res.status(200).send({data:status, status:"success"})
            else
                throw("Something went wrong while performing fetching operation.")
        }
    }catch(error)
    {
        res.status(400).send(error+"Something went wrong")
    }
}

const studentLogin = async (req,res,next)=>{
    try{
        const {rollno, dob} = req.body;
        if(!rollno || !dob)
            throw("Insufficient arguments")
        else
        {
            let status = await student_model.findOne({roll:rollno, dob:dob})
            if(status)
                res.status(200).send({data:status, status:"success"})
            else
                throw("Something went wrong while performing fetching operation.")
        }
    }catch(err)
    {
        res.status(400).send(err+"Something went wrong")
    }
}


module.exports = {fetchOneResult};
