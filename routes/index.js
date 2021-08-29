const express = require('express');
const router = express.Router();
router.get('/',function(request,reposne){
    return reposne.render('landingPage');
});
router.use('/student',require('./studentSignUpRoute'));
router.use('/student',require('./studentLoginRoute'));
router.use('/teacher',require('./teacherSignUpRoute'));
router.use('/teacher', require('./teacherLoginRoute'));
router.use('/createclassroom', require('./classroomRoute'));
router.use('/showclassroom', require('./showAllClassroomRoute'));
router.use('/joinclassroom', require('./joinClassroomRoute'));
router.use('/classroom', require('./assignmentRoute'));
router.use('/logout',require('./logoutRoute'));
router.use('/',require('./googleTeacherAuthentication'));
module.exports = router;
