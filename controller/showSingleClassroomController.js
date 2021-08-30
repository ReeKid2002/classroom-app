const Classroom = require('../models/classroomModel');
const Assignment = require('../models/assignmentModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
module.exports.showSingleClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        const classId = req.params.classId;
        const classroom = await Classroom.findOne({_id: classId});
        // console.log(classroom);
        // console.log(currentUser);
        if(classroom){
            let allAssignment = [];
            let allStudent = [];
            for(let i=0; i<classroom.assignment.length; i++){
                let assignment = await Assignment.findOne({_id: classroom.assignment[i]});
                allAssignment.push(assignment);
            }

            // console.log(classroom.student.length);

            for(let i=0; i<classroom.student.length; i++){
                let student = await Student.findOne({_id: classroom.student[i]});
                // console.log(student)
                allStudent.push(student);
            }
            if(currentUser.person === 'T'){
                //Send allAssignment and allStudent
                // console.log(allStudent)
                res.render('teacherClassDashboard',{
                    allAssignment:allAssignment,
                    allStudent:allStudent,
                    classroom:classroom

                })
            } else {
                // Send All Assignment
                // console.log(allAssignment)
                res.render("studentClassDashboard",{
                    allAssignment:allAssignment
                });
            }
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