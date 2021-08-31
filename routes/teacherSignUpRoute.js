const express = require("express");
const {signUpTeacher,createNewTeacher } = require('../controller/signupTeacherController')
const router = express.Router();
router.get("/sign-up", signUpTeacher);
router.post("/sign-up", createNewTeacher);
module.exports = router;