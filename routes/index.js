const express = require('express');
const router = express.Router();
router.use('/student',require('./studentSignUpRoute'));
router.use('/teacher',require('./teacherSignUpRoute'));
module.exports = router;