const express = require('express');
const passport = require('passport');
const { joinClassroomGet, joinClassroomPost } = require('../controller/joinClassroomController');
const router = express.Router();
router.get('/',passport.authenticate("jwt", {session: false}), joinClassroomGet);
router.post('/',passport.authenticate("jwt", {session: false}), joinClassroomPost);
module.exports = router;