const express = require('express');
const passport = require('passport');
const { createAssignmentGet, createAssignmentPost } = require('../controller/createAssignmentController');
const router = express.Router();
router.get('/:classid',passport.authenticate("jwt", {session: false}), createAssignmentGet);
router.post('/:classid',passport.authenticate("jwt", {session: false}), createAssignmentPost);
module.exports = router;