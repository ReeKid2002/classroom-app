const express = require('express');
const {signUpStudent, createNewStudent} = require('../controller/signupStudentController');
const router = express.Router();
router.get('/signup',signUpStudent);
router.post('/signup',createNewStudent);
module.exports = router;