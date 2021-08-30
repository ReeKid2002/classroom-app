// ONLY FOR TEACHER
const Classroom = require('../models/classroomModel');
const Teacher = require('../models/teacherModel');
module.exports.createClassroomForm = function(req,res){
    if(req.user.person === 'T'){
        res.render('testCreateClassroom');
    } else {
        return res.status(500).json({
            message: "Student Can't Access This Page"
        });
    }
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
            return res.render("studentClassroomDashboard", {
                msg:'Classroom Exist'
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
            res.redirect('/showclassroom')
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
}