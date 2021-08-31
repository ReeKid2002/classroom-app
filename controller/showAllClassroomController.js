const Classroom = require('../models/classroomModel');
module.exports.showClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        // console.log(currentUser);
        if(currentUser.person === "T"){
            const allClassroom = await Classroom.find({teacher: currentUser._id});
            res.render('teacherDashboard',{
                allclassroom:allClassroom,
                id:currentUser._id,
                person:currentUser.person
            })
        } else {
            const allClassroom = [];
            for(let i=0; i<currentUser.classroom.length; i+=1){
                let individualClassroom = await Classroom.findOne({_id: currentUser.classroom[i]});
                allClassroom.push(individualClassroom);
            }
            // console.log(allClassroom);
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