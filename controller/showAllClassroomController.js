const Classroom = require('../models/classroomModel');
module.exports.showClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        // console.log(currentUser);
        if(currentUser.person === "T"){
            const allClassroom = await Classroom.find({teacher: currentUser._id});
            res.render('teacherDashboard',{
                allclassroom:allClassroom
            })
        } else {
            const allClassroom = [];
            for(let i=0; i<currentUser.classroom.length; i+=1){
                let individualClassroom = await Classroom.find({_id: currentUser.classroom[i]});
                allClassroom.push(individualClassroom);
            }
            res.render("studentClassroomDashboard", {
              allclassroom: allClassroom,
            });
        }
    } catch (err) {
        return req.status(500).json({
            message: err.message
        });
    }
}