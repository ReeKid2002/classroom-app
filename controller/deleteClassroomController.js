const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
module.exports.deleteSingleClassroom = async function(req,res){
    try {
        const currentUserId = req.params.id;
        const currentPerson = req.params.person;
        const classId = req.params.classId;
        const classroom = await Classroom.findOne({_id: classId});
        
        if(classroom){
            if(currentPerson === 'T'){
                const removeClassroomFromTeacher = await Teacher.findByIdAndUpdate({_id: classroom.teacher},{$pull:{ classroom: classroom._id }});
                for(let i=0; i<classroom.student.length; i++){
                    const removeClassroomFromStudent = await Student.findByIdAndUpdate({_id: classroom.student[i]},{$pull:{ classroom: classroom._id }});
                }
                const deletedClass = await Classroom.findOneAndDelete({_id: classroom._id});
            } else {
                const leaveClassroom = await Student.updateOne({_id: currentUserId},{$pull:{ classroom: classroom._id}});
            }
            res.redirect('/showclassroom')
            } else {
                return res.status(500).json({
                message: "No Such Classroom Exist"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err
        });
    }
}