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
                const jwtPayload = {
                    id: checkUser._id,
                    name: checkUser.name,
                    email: checkUser.email
                }
                const token = jwt.sign(jwtPayload, "secret");
                res.cookie("jwt",token,{httpOnly:true});
                res.status(200).json({
                    message:"Login Successfully",
                    header: {
                        token: token
                    }
                });
            } else {
                return res.status(500).json({
                    message: "Password Not Matched!"
                });
            }
        } else {
            return res.status(500).json({
                message: "User Not Found"
            });
        }
    } catch (err) {
        return res.status(500).json({
                message:err.message
            });
    }
};