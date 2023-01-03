const express = require("express")
const router = express.Router();
const {authFunction, verifyLogin, addStudent, removeResult, fetchAllResult, updateResult} = require("../controller/auth/teacherController")

router.post("/add", authFunction);
router.post("/login",verifyLogin);
router.post("/fetchResults", fetchAllResult)
router.post("/updateResult", updateResult)
router.post("/removeResult", removeResult)
router.post("/addStudent", addStudent)
router.post("/allStudents", (req,res)=>{
    res.render("showStudents",{uname:req.body.username})
})
module.exports = router; 