const express = require("express");
<<<<<<< HEAD
const {renderLogin,renderSignUp,createSession,createNewTeacher } = require('../controller/teacherSignController')
const router = express.Router();
router.get("/sign-up", renderSignUp);
router.get("/sign-in", renderLogin);

router.post("/sign-up", createNewTeacher);
router.post("/sign-in", createSession);
