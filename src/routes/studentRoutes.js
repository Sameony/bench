const express = require("express")
const router = express.Router();
const {fetchOneResult} = require("../controller/student/studentController");

router.post("/fetchResultById", fetchOneResult);

module.exports = router;