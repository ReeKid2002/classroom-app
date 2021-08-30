const express = require('express');
const passport = require('passport');
const { deleteSingleAssignment } = require('../controller/deleteAssignmentController');
const router = express.Router();
router.post('/delete/:classId/:assignId', passport.authenticate("jwt", {session: true}), deleteSingleAssignment);
module.exports = router;