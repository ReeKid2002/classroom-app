const mongoose = require('mongoose');
const Classroom = require('./classroomModel');
const Assignment = require('./assignmentModel');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    name: String,
    email: String,
    password: String,
    person: String,
    classroom:  [{
        type: Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
    assignment: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
});
const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;