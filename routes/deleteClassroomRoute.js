const express = require('express');
const passport = require('passport');
const { deleteSingleClassroom } = require('../controller/deleteClassroomController');
const router = express.Router();
router.post('/delete/:classId', passport.authenticate("jwt", {session: true}), deleteSingleClassroom);
module.exports = router;