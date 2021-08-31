const Assignment = require("../models/assignmentModel");
const Classroom = require("../models/classroomModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");
module.exports.deleteSingleAssignment = async function (req, res) {
  try {
    const classId = req.params.classId;
    const assignId = req.params.assignId;
    const assignment = await Assignment.findOne({
      _id: assignId,
      classroom: classId,
    });
    if (assignment) {
      const removeAssignmentFromTeacher = await Teacher.updateOne(
        { _id: assignment.teacher },
        { $pull: { assignment: assignId } }
      );
      const removeAssignmentFromClassroom = await Classroom.updateOne(
        { _id: classId },
        { $pull: { assignment: assignId } }
      );
      for (let i = 0; i < assignment.student.length; i++) {
        const removeAssignmentFromStudent = await Student.updateOne({ _id: assignment.student[i] }, { $pull: { assignment: assignId } });
        console.log(removeAssignmentFromStudent);
      }
      const deletedAssign = await Assignment.findOneAndDelete({
        _id: assignId,
      });
      if (deletedAssign) {
        res.redirect(`/classroom/${classId}`);
      }
    } else {
      return res.status(500).json({
        message: "No Such Classroom Exist",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};
