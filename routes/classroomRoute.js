const express = require('express');
const passport = require('passport');
const { showClassroom, createClassroom } = require('../controller/classroomController');
const router = express.Router();
router.get('/',passport.authenticate("jwt",{session:false}), showClassroom);
router.post('/',passport.authenticate("jwt", {session: false}), createClassroom);
module.exports = router;