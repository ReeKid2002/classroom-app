const express = require('express');
const passport = require('passport');
const { showClassroom } = require('../controller/showClassroom');
const router = express.Router();
router.get('/',passport.authenticate("jwt", {session: false}),showClassroom);
module.exports = router;