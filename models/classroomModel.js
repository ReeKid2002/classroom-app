const mongoose = require('mongoose');
const Assignment = require('./assignmentModel');
const Teacher = require('./teacherModel');
const Student = require('./studentModel');
const Schema = mongoose.Schema;
const classroomSchema = new Schema({
    name: String,
    subject: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    assignment: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
});
const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;