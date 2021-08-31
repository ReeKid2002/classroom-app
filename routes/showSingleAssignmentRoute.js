const express = require('express');
const passport = require('passport');
const { showSingleAssignment } = require('../controller/showSingleAssignmentController');
const router = express.Router();
router.get('/:classId/:assignId', passport.authenticate("jwt", {session: false}), showSingleAssignment);
module.exports = router;