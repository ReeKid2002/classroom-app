const express = require('express');
const router = express.Router();
router.use('/student',require('./studentSignUpRoute'));
module.exports = router;