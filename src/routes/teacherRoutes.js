const express = require("express")
const router = express.Router();
const {authFunction, verifyLogin} = require("../controller/auth/teacherController")

router.post("/add", authFunction);
router.post("/login",verifyLogin);

module.exports = router; 