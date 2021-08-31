const mongoose = require("mongoose");
const Classroom = require("./classroomModel");
const Assignment = require("./assignmentModel");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: { type: String, required: [true, "Enter Name"] },
  email: { type: String, required: [true, "Enter Email"] },
  password: { type: String, required: [true, "Enter Password"] },
  person: String,
  classroom: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
  ],
  assignment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
