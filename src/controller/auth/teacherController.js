const crypt = require("../../config/bcrypt");
var cryptService = new crypt();
const teacher_model = require("../../models/teacher");
const student_model = require("../../models/students")
const authFunction = async (req, res) => {
    try {
        const {
            name,
            password
        } = req.body;
        console.log("u are at auth, and ur name is: " + name)
        let encoded_pass = await cryptService.cryptify(password)
        const teacherData = teacher_model.create({
            name: name,
            password: encoded_pass
        })
        res.status(200).send("Succesfully inserted data")
    } catch (error) {
        res.status(400).send(error);
    }

}

const fetchAllResult = async (req, res, next) => {
    try {
        let results = await student_model.find();
        res.render("showStudents", {
            resultArray: results
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
const verifyLogin = async (req, res) => {
    try {
        const password = req.body.password;
        const username = req.body.userEmail;
        console.log("u are at auth, and ur name is: " + username)
        let result = await teacher_model.find({
            name: username
        })
        console.log(result)
        let verified = await cryptService.verify(password, result[0].password)
        console.log(verified)
        if (!verified)
            throw ("Wrong password")
        else {
            let results = await student_model.find();
            res.render("showStudents", {
                uname: username,
                resultArray: results
            })
        }
    } catch (error) {
        res.render("landingPage", {
            error: error
        })
    }
}

const updateResult = async (req, res, next) => {
    try {
        const {
            updatedName,
            updatedDob,
            roll,
            updatedMarks
        } = req.body;
        if (!roll)
            throw ("Insufficient arguments")
        let updationStatus = await student_model.findOneAndUpdate({
            roll: roll
        }, {
            $set: {
                name: updatedName,
                dob: updatedDob,
                marks: updatedMarks
            }
        })
        if (updationStatus) {
            let results = await student_model.find();
            res.render("showStudents", {
                success: "Successfully edited entry",
                resultArray: results
            })
        } else {
            throw ("Something went wrong. Please try again after some time")
        }
    } catch (error) {
        res.render("editStudent", {
            error: error
        })
    }
}
const removeResult = async (req, res, next) => {
    try {
        const {
            rollno
        } = req.body;
        if (!rollno)
            throw ("Insufficient arguments")
        else {
            let status = await student_model.findOneAndRemove({
                roll: rollno
            })
            if (status) {
                let results = await student_model.find();
                res.render("showStudents", {
                    success: "Successfully Removed Student Entry",
                    resultArray: results
                })
            } else
                throw ("Something went wrong while performing this operation.")
        }
    } catch (error) {
        let results = await student_model.find();
        res.render("showStudents", {
            error: "Failure:"+error,
            resultArray: results
        })
    }
}
const addStudent = async (req, res) => {
    try {
        const {
            name,
            roll,
            dob,
            marks
        } = req.body;
        if (!roll || !name || !dob || !marks)
            throw ("Insufficient arguments")
        const studentData = student_model.create({
            name: name,
            roll: roll,
            marks: marks,
            dob: dob
        })
        if (studentData)
            res.render("addStudent", {
                success: "Sucessfully added the student"
            });
        else
            throw ("Something went wrong.")
    } catch (error) {
        res.render("addStudent", {
            error: error
        });
    }

}
module.exports = {
    authFunction,
    verifyLogin,
    updateResult,
    fetchAllResult,
    removeResult,
    addStudent
};