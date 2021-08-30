const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
module.exports.renderLogin = function (req, res) {
  res.render("signInTeacher");
};
module.exports.createJWT = async function (req, res) {
  try {
    const { email, password } = req.body;
    // console.log(`${email} ${password}`);
    const checkUser = await Teacher.findOne({ email: email });
    if (checkUser) {
      // console.log(checkUser);
      const checkPassword = await bcrypt.compareSync(password,checkUser.password);
      if (checkPassword) {
        // console.log(checkPassword);
        // console.log(email + " " + checkUser.email);
        const jwtPayloadTeacher = {
          id: checkUser._id,
          name: checkUser.name,
          email: email,
          type: 'T'
        };
        // console.log("JwtPayload: " + jwtPayloadTeacher.email);
        const token = jwt.sign(jwtPayloadTeacher, "secret");
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect('/showclassroom');
      } else {
        res.redirect("/teacher/login");
      }
    } else {
      res.redirect("/teacher/login");
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
