const mongoose = require('mongoose');
const Classroom = require('./classroomModel');
const Teacher = require('./teacherModel');
const Student = require('./studentModel');
const Schema = mongoose.Schema;
const assignmentSchema = new Schema({
    title: String,
    description: String,
    totalPoint: Number,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    classroom:  {
        type: Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;