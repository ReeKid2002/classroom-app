const Assignment = require('../models/assignmentModel');
const Student = require('../models/studentModel');
module.exports.gradeStudentForSingleAssignment = async function(req,res){
    try{
        const currentUser = req.user;
        if(currentUser.person === 'T'){
            const studentId = req.params.studentId;
            const assignId = req.params.assignId;
            const { marked } = req.body;
            const student = await Student.findOne({_id: studentId, 'assignment.assign': assignId});
            if(student){
                const updateStudent = await Student.findOneAndUpdate({_id: student._id},{'assignment.marked': marked});
                return res.status(200).json({
                    message: "Marked"
                });
            } else {
                return res.status(500).json({
                    message: "Student with Assignment Not Found"
                });
            }   
        } else {
            return res.statur(500).json({
                message: "Student Can't Update Mark"
            });
        }
    } catch(err) {
        return res.status(500).json({
                message: err
            })
    }
}