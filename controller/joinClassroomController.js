// ONLY FOR STUDENT
const Student = require('../models/studentModel');
const Classroom = require('../models/classroomModel');
module.exports.joinClassroomPost = async function(req,res){
    try{
        // console.log(req.user);
        const { classroomId } = req.body;
        const findClassroomInStudent = await Student.findOne({classroom:{$elemMatch: {_id: classroomId}}});
        // console.log(findClassroomInStudent);
        if(findClassroomInStudent){
            return res.status(200).json({
                message: "Already Joined"
            });
        } else {
            const classroom = await Classroom.findOne({_id: classroomId});
            // console.log(classroom);
            if(classroom){
                const addStudentToClassroom = await Classroom.findOneAndUpdate({_id: classroomId},{$addToSet: { student: req.user._id }});
                const addClassroomToStudent = await Student.findOneAndUpdate({_id: req.user._id},{$addToSet: { classroom: classroom._id}});
                // console.log("Classroom :",addClassroomToStudent);
                // console.log("Student" ,addStudentToClassroom);
                res.redirect('/showclassroom')
            } else {
                return res.status(200).json({
                    message: "Classroom Doenot Exist"
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}