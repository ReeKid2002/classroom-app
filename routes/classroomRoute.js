const express = require('express');
const passport = require('passport');
const { createClassroomForm, createClassroomPost } = require('../controller/createClassroomController');
const router = express.Router();
// router.get('/',passport.authenticate("jwt",{session:false}), createClassroomForm);
router.post('/',passport.authenticate("jwt", {session: false}), createClassroomPost);
module.exports = router;