const express = require('express');
const {signUpStudent, createNewStudent} = require('../controller/signupStudentController');
const router = express.Router();
router.get('/',signUpStudent);
router.post('/',createNewStudent);
module.exports = router;