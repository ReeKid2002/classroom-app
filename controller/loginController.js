const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");
module.exports.renderLogin = function(req,res){
    res.render("login");
}
module.exports.createSession = async function(req,res){
    try{
        const user = await User.login(req.body.email,req.body.password);
        // const obj = {
        //     id: user._id,
        //     name:user.name,
        //     email:user.email
        // };
        // const objJson = JSON.stringify(obj);
        
        const token = jwt.sign(user.toJSON(),"codeial");
        res.cookie("jwt",token,{httpOnly:true});
            res.status(200).json({
                message:"Login Successfully",
                header: {
                    token: token
                }
            });
            // res.redirect('/api/v1/user')
    } catch (err) {
        return res.status(500).json({
                message:err.message
            });
    }
};