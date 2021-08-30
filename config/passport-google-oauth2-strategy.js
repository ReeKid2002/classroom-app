const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherModel');
// const findOrCreate = require("mongoose-findorcreate");
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      consumerSecret: process.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      // passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      Teacher.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in Google Strategy", err);
          return;
        }
        console.log(profile);
        if (user) {
          return null, user;
        } else {
          Teacher.create(
            {
              name: profile.displayname,
              email: profile.emails[0].value,
              password: bcrypt.hashSync(profile.emails[0].value, 5),
            },
            function (err, user) {
              if (err) {
                console.log("Error in Creating User ", err);
                return;
              }
              return null, user;
            }
          );
        }
      });
    }
  )
);

// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       //   console.log(profile);
//       Teacher.findOrCreate(
//         {
//           googleId: profile.id,
//           email: profile.emails[0].value,
//           name: profile.displayName,
//         },
//         function (err, user) {
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );

// app.get(
//   "/auth/google", //GOOGLE AUTH ROUTE
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   })
// );

// app.get(
//   "/auth/google/classroomapp", //GOOGLE AUTH REDIRECT ROUTE
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/home");
//   }
// );

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");

module.exports=passport;