const Classroom = require('../models/classroomModel');
const Assignment = require('../models/assignmentModel');
module.exports.showSingleAssignment = async function(req,res){
    try{
        const currentUser = req.user;
        const classId = req.params.classId;
        const assignId = req.params.assignId;
        const classroom = await Classroom.findOne({_id: classId});
        if(classroom){
            const assignment = await Assignment.findOne({_id: assignId, classroom: classId});
            if(assignment){
                let allStudent = [];
                for(let i=0; i<classroom.student.length; i++){
                    let student = Student.findOne({_id: classroom.assignment[i]});
                    allStudent.push(student);
                }
                if(currentUser.person === 'T'){
                    //Send Data for Teacher
                } else {
                    //Send Data for Student
                }
            } else {
                return res.status(500).json({
                    message: "No Assignment Found"
                });
            }
        } else {
            return res.status(500).json({
                message: "No Classroom Found"
            })    
        }
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}