const Assignment = require('../models/assignmentModel');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');
const Classroom = require('../models/classroomModel');

// module.exports.create
module.exports.createAssignmentPost = async function(req,res){
    try{
        const { title, description, total } = req.body;
        const classroomId = req.params.classid;
        const currentUser = req.user;
        const classroom = await Classroom.findOne({_id: classroomId});
        const newAssignment = new Assignment({
            title: title,
            description: description,
            totalPoint: total,
            teacher: currentUser._id,
            student: classroom.student,
            classroom: classroomId
        });
        const assignment = await newAssignment.save();
        const addAssignmentToTeacher = await Teacher.findOneAndUpdate({_id: currentUser._id},{$addToSet: {assignment: assignment._id}});
        const addAssignmentToClassroom = await Classroom.findOneAndUpdate({_id: classroomId},{$addToSet: {assignment: assignment._id}});
        for(let i=0; i<classroom.student.length; i++){
            const obj = {
                marked: '',
                assign: assignment._id
            };
            await Student.findOneAndUpdate({_id: classroom.student[i]},{$addToSet: {assignment: obj}});
        }
        // return res.status(200).json({
        //     message: "Assignment Saved",
        //     assignment: assignment
        // });
        res.render('teacherAssignmentDashboard',{
            assignment:assignment
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }
}