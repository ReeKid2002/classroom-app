const express = require('express');
const passport = require('passport');
const { createAssignmentGet, createAssignmentPost } = require('../controller/createAssignmentController');
const router = express.Router();
// router.get('/assignment/:classid',passport.authenticate("jwt", {session: false}), createAssignmentGet);
router.post('/assignment/:classid',passport.authenticate("jwt", {session: false}), createAssignmentPost);
module.exports = router;