const express = require('express')
const router = express.Router();
const passport = require('passport');
const {createJWT} = require('../controller/loginTeacherController');
const {createNewTeacher} = require('../controller/signupTeacherController');

router.get(
  "/auth/google", //GOOGLE AUTH ROUTE
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

// app.get("/auth/google/classroomapp",passport.authenticate("google", { failureRedirect: "/login" }),function (req, res) {
//     res.redirect("/home");
//   }
// );


router.get('/auth/google/classroomapp',passport.authenticate('google',{failureRedirect:'/teacher/login'}),createNewTeacher);
module.exports = router;