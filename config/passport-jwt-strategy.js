const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
var cookieExtractor = function(req) {
    var token = null;
    // console.log(`Cookie: ${req.cookies}`);
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
let opt = {
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken(),cookieExtractor]),
    secretOrKey: "secret"
};
passport.use(new JWTStrategy(opt,async function(jwtPayload,done){
    try{
        let user;
        if(jwtPayload.type === 'T'){
            user = await Teacher.findById(jwtPayload.id);
        } else {
            user = await Student.findById(jwtPayload.id);
        }
        // console.log(user);
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