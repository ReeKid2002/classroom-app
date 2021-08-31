const express = require('express');
const passport = require('passport');
const { deleteSingleClassroom } = require('../controller/deleteClassroomController');
const router = express.Router();
router.post('/delete/:id/:person/:classId', deleteSingleClassroom);
module.exports = router;