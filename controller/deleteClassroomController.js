const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
module.exports.deleteSingleClassroom = async function(req,res){
    try {
        const currentUser = req.user;
        const classId = req.params.classId;
        const classroom = await Classroom.findOne({_id: classId});
        if(classroom){
            if(currentUser.person === 'T'){
                for(let i=0; i<classroom.student.length; i++){
                    const removeAssign = Student.updateOne({_id: classroom.student[i]},{ $pull:{ classroom: classroom._id}});
                }
                const deletedClass = await Classroom.findOneAndDelete({_id: classroom._id});
            } else {
                const leaveClassroom = await Student.updateOne({_id: currentUser._id},{$pull:{ classroom: classroom._id}});
            }
            return res.status(500).json({
                message: "Classroom Deleted"
            });
            } else {
                return res.status(500).json({
                message: "No Such Classroom Exist"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }
}