const express = require("express");
const connectToDb = require("./src/config/db");
const bodyParser = require("body-parser")
const port = process.env.port || 3001;
const app = express();
const path = require('path')
// view engine setup
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('views',path.join(__dirname,"src","views"))
app.set('view engine','hbs')
// database
connectToDb();

app.use(express.json())
app.use("/auth", require("./src/routes/teacherRoutes"))
app.use("/student", require("./src/routes/studentRoutes"))
app.get("/check", (req, res)=>{
    res.render("landingPage", {inp: "check"})
})
app.get("/landingPage",(req,res)=>{
    res.render("landingPage")
})
app.get("/registerStudent",(req,res)=>{
    res.render("addStudent")
})
app.get("/registerTeacher",(req,res)=>{
    res.render("addTeacher")
})
app.post("/editStudentDetails",(req,res)=>{
    res.render("editStudent",{name:req.body.name, marks:req.body.marks, dob:req.body.dob, roll:req.body.roll})
})
app.get("/",(req,res)=>{
    res.render("enter")
})
app.get("/showAllStudent",(req,res)=>{
    res.render("showStudents")
})

const server = app.listen(port, ()=>{
    console.log("server is listening on port", port)
})
