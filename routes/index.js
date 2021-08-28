const express = require('express');
const router = express.Router();
router.get('/',function(request,reposne){
    return reposne.render('landingPage');
})
router.use('/student',require('./studentSignUpRoute'));
router.use('/teacher',require('./teacherSignUpRoute'));
module.exports = router;