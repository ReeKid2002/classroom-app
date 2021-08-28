const express = require('express');
const router = express.Router();
const {logout} = require('../controller/logoutController');
router.route('/')
.post(logout);
module.exports = router;