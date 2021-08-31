const express = require('express');
const router = express.Router();
const {renderDashboard} = require('../controller/renderTeacherDashboard');

router.get('./',function(request,response){
    return response.render('/teacherDashboard');
})

module.exports = router;