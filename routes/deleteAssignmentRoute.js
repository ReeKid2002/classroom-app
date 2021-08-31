const express = require('express');
const passport = require('passport');
const { deleteSingleAssignment } = require('../controller/deleteAssignmentController');
const router = express.Router();
router.post('/delete/:classId/:assignId', deleteSingleAssignment);
module.exports = router;