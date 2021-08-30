const Assignment = require('../models/assignmentModel');
const Student = require('../models/studentModel');
module.exports.deleteSingleAssignment = async function(req,res){
    try {
        const currentUser = req.user;
        if(currentUser.person === 'T'){
        const classId = req.params.classId;
        const assignId = req.params.assignId;
        const assignment = Assignment.findOne({_id: assignId, classroom: classId});
        if(assignment){
                for(let i=0; i<assignment.student.length; i++){
                    const removeAssign = Student.updateOne({_id: assignment.student[i]},{$pull:{ 'assignment.assign': assignment._id}});
                }
                const deletedAssign = Assignment.findOneAndDelete({_id: assignment._id});
            return res.status(500).json({
                message: "Classroom Deleted"
            });
            } else {
                return res.status(500).json({
                message: "No Such Classroom Exist"
            });
        }
    } else {
        return res.status(500).json({
            message: "Student cant delete Assignment"
        });
    }
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }
}