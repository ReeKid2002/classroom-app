const express = require('express');
const router = express.Router();
const { renderLogin, createJWT } = require('../controller/loginStudentController');
router.route('/login')
.get(renderLogin)
.post(createJWT);

module.exports = router;