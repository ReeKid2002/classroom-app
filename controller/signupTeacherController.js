const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt");
module.exports.signUpTeacher = function (req, res) {
  res.render("signUpTeacher");
};
module.exports.createNewTeacher = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const findTeacher = await Teacher.findOne({ email: email });
    if (findTeacher) {
      return res.status(500).json({
        message: "Existing User",
      });
    } else {
      const saltRounds = 5;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const teacher = new Teacher({
        name: name,
        email: email,
        password: hashedPassword,
        person: 'T',
        classroom: [],
        assignment: [],
      });
      await teacher.save();
      // res.status(200).json({
      //   message: "Teacher Saved",
      // });
      res.redirect('/teacher/login');
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
