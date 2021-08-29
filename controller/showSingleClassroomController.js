const Classroom = require('../models/classroomModel');
const Assignment = require('../models/assignmentModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
module.exports.showSingleClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        const classId = req.params.classId;
        const classroom = Classroom.findOne({_id: classId});
        if(classroom){
            let allAssignment = [];
            let allStudent = [];
            for(let i=0; i<classroom.assignment.length; i++){
                let assignment = Assignment.findOne({_id: classroom.assignment[i]});
                allAssignment.push(assignment);
            }
            for(let i=0; i<classroom.student.length; i++){
                let student = Student.findOne({_id: classroom.assignment[i]});
                allStudent.push(student);
            }
            //DO Something with Data Fetched
        } else {
            return res.status(200).json({
                message: "Classroom Doesn't Exist"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}