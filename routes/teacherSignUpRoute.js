const express = require("express");
const { signUpTeacher, createNewTeacher } = require("../controller/signupTeacherController");
const router = express.Router();
router.get("/signup", signUpTeacher);
router.post("/signup", createNewTeacher);
module.exports = router;
