const express = require('express');
const passport = require('passport');
const { createClassroomForm, createClassroomPost } = require('../controller/createClassroomController');
const router = express.Router();
router.get('/',passport.authenticate("jwt",{session:false}), showClassroom);
router.post('/',passport.authenticate("jwt", {session: false}), createClassroom);
module.exports = router;