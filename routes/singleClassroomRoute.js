const express = require('express');
const passport = require('passport');
const { showClassroom } = require('../controller/showSingleClassroomController');
const router = express.Router();
router.get('/:classId', passport.authenticate("jwt", {session: false}), showClassroom);
module.exports = router;