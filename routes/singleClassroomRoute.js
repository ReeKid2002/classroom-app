const express = require('express');
const passport = require('passport');
const {
  showSingleClassroom,
} = require("../controller/showSingleClassroomController");
const router = express.Router();
router.get(
  "/:classId",
  passport.authenticate("jwt", { session: false }),
  showSingleClassroom
);
module.exports = router;