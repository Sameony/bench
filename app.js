const express = require("express");
const connectToDb = require("./src/config/db");
const port = process.env.port || 3001;
const app = express();
const path = require('path')
// view engine setup
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






const server = app.listen(port, ()=>{
    console.log("server is listening on port", port)
})
