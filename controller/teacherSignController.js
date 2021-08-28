const Teacher = require('../models/teacherModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


module.exports.renderSignUp = function(req,res){
    res.render("signUpTeacher");
};


module.exports.renderLogin = function (req, res) {
  res.render("signInTeacher");
};

module.exports.createSession = async function (req, res) {
  try {
    const teacher = await Teacher.login(req.body.email, req.body.password);
    // const obj = {
    //     id: user._id,
    //     name:user.name,
    //     email:user.email
    // };
    // const objJson = JSON.stringify(obj);

    const token = jwt.sign(Teacher.toJSON(), "classroomApp");
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({
      message: "Login Successfully",
      header: {
        token: token,
      },
    });
    // res.redirect('/api/v1/user')
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createNewTeacher = async function(req,res){
    try{
        const { name,email,password } = req.body;
        const findTeacher = await Teacher.findOne({email: email});
        if(findTeacher){
            return res.status(500).json({
                message: "Existing User"
            });
        } else {
            const saltRounds = 5;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            const teacher = new Teacher({
                name: name,
                email: email,
                password: hashedPassword,
                classroom: [],
                assignment: []
            });
            await teacher.save();
            res.status(200).json({
                message: "Teacher Saved"
            })
        }
    } catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
};