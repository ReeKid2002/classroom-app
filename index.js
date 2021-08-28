const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const app = express();
const PORT = process.env.PORT | 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/classroomDB',{useUnifiedTopology:true, useNewUrlParser:true});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',require('./routes'));
app.get('/',function(req,res){
    res.sendFile(__dirname + '/template/index.html');
});
app.listen(PORT, function(err){
    if(err){
        console.log(err);
    } else {
        console.log(`Server Running On PORT: ${PORT}`);
    }
});


