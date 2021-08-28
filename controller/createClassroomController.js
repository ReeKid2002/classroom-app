const Classroom = require('../models/classroomModel');
const Teacher = require('../models/teacherModel');
module.exports.createClassroomForm = function(req,res){
    res.render('testCreateClassroom');
}
module.exports.createClassroomPost = async function(req,res){
    try{
        const currentUser = req.user;
        // console.log(currentUser);
        const { classroomName,  subject } = req.body;
        const teacherId = currentUser.id;
        const teacher = await Teacher.findOne({_id: teacherId});
        const checkClassroom = await Classroom.findOne({name: classroomName, teacher: teacherId});
        // console.log(checkClassroom);
        if(checkClassroom){
            return res.status(500).json({
                message: "Classroom With Same Name Exist"
            });    
        } else {
            const classroom = new Classroom({
                name: classroomName,
                subject: subject,
                teacher: teacher._id,
                student:[],
                assignment:[]
            });
            const newClassroom = await classroom.save();
            // console.log(`classroom: ${newClassroom._id}`);
            const pushClassroomIntoTeacher = await Teacher.findByIdAndUpdate({_id: teacherId},{$addToSet : { classroom: newClassroom._id }});
            // console.log(newClassroom);
            return res.status(200).json({
                message: "Classroom Created"
            })
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
}