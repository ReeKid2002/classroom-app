const express = require('express');
const passport = require('passport');
const { gradeStudentForSingleAssignment } = require('../controller/gradeStudentForSingleAssignmentController');
const router = express.Router();
router.get('/:classId/:assignId/:studentId', passport.authenticate("jwt", {session: false}), gradeStudentForSingleAssignment);

module.exports = router;