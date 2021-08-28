const express = require('express');
const router = express.Router();
router.use('/student',require('./studentSignUpRoute'));
router.use('/student',require('./studentLoginRoute'));
router.use('/teacher',require('./teacherSignUpRoute'));
router.use('/logout', require('./logoutRoute'));
module.exports = router;