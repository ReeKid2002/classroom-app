const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
module.exports.signUpStudent = function(req,res){
    res.render("signUpStudent");
};
module.exports.createNewStudent = async function(req,res){
    try{
        const {name,email,password} = req.body;
        const findStudent = await Student.findOne({email: email});
        if(findStudent){
            return res.status(500).json({
                message: "Existing User"
            });
        } else {
            const saltRounds = 5;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            const student = new Student({
                name: name,
                email: email,
                password: hashedPassword,
                person: 'S',
                classroom: [],
                assignment: []
            });
            await student.save();
            res.redirect('/student/login')
        }
    } catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
};