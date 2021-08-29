const express = require('express');
const router = express.Router();
router.get('/',function(request,reposne){
    return reposne.render('landingPage');
});
router.use('/student',require('./studentSignUpRoute'));
router.use('/student',require('./studentLoginRoute'));
router.use('/teacher',require('./teacherSignUpRoute'));
router.use('/teacher', require('./teacherLoginRoute'));
router.use('/classroom', require('./createClassroomRoute'));
router.use('/classroom',require('./teacherDashboard'));
router.use('/logout',require('./logoutRoute'));
router.use('/',require('./googleTeacherAuthentication'));
module.exports = router;
