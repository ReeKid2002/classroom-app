const express = require("express");
const {
  signUpTeacher,
  createNewTeacher,
} = require("../controller/signupTeacherController");
const router = express.Router();
router.get("/", signUpTeacher);
router.post("/", createNewTeacher);
module.exports = router;
