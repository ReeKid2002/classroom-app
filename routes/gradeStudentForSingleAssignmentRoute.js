const express = require('express');
const passport = require('passport');
const { gradeStudentForSingleAssignment } = require('../controller/gradeStudentForSingleAssignmentController');
const router = express.Router();
router.get('/:assignId/:studentId', passport.authenticate("jwt", {session: false}), gradeStudentForSingleAssignment);
return router;