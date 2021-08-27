const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");
var cookieExtractor = function(req) {
    var token = null;
    console.log(req.cookies);
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
let opt = {
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken(),cookieExtractor]),
    secretOrKey: "codeial"
};
passport.use(new JWTStrategy(opt,async function(jwtPayload,done){
    try{
        const user = await User.findById(jwtPayload._id);
        console.log(user);
        if(user){
            return done(null,user);
        } else {
            return done(null,false);
        }
    } catch(err) {
        console.log(err);
        return done(err);
    }
}));

module.exports = passport;