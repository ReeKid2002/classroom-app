const Classroom = require('../models/classroomModel');
const Teacher = require('../models/teacherModel');
module.exports.showClassroom = function(req,res){
    res.render('testCreateClassroom');
}
module.exports.createClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        const { classroomName,  subject } = req.body;
        const checkClassroom = await Classroom.find({name: classroomName});
        if(checkClassroom){
            return res.status(500).json({
                message: "Classroom With Same Name Exist"
            });    
        } else {
            const teacherId = currentUser.id;
            const teacher = await Teacher.findOne({_id: teacherId});
            const classroom = new Classroom({
                name: classroomName,
                subject: subject,
                teacher: teacher._id,
                student:[],
                assignment:[]
            });
            const newClassroom = await classroom.save();
            console.log(newClassroom);
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
}