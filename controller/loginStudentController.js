const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
module.exports.renderLogin = function(req,res){
    res.render("loginStudent");
}
module.exports.createJWT = async function(req,res){
    try{
        const {email, password} = req.body;
        // console.log(`${email} ${password}`);
        const checkUser = await Student.findOne({email: email});
        if(checkUser){
            // console.log(checkUser);
            const checkPassword = await bcrypt.compareSync(password, checkUser.password);
            if(checkPassword){
                // console.log(checkPassword);
                const jwtPayloadStudent = {
                    id: checkUser._id,
                    name: checkUser.name,
                    email: checkUser.email,
                    type: 'S'
                }
                const token = jwt.sign(jwtPayloadStudent, "secret");
                res.cookie("jwt",token,{httpOnly:true});
                res.redirect('/showclassroom');
            } else {
                res.redirect("/student/login");
            }
        } else {
            res.redirect('/student/login');
        }
    } catch (err) {
        return res.status(500).json({
                message:err.message
            });
    }
};