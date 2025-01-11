const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  fatherName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  courseName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 1024,
  },
  gender: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  regestrationNo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  rollNo: {
    type: Number,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  session: {
    type: String,
    default: "2020-2024",
  },
  IDcard: {
    type: String,
    
  },

  type: { type: String, default: "Student" },
});

const Student = mongoose.model("Student", studentSchema);

exports.Student = Student;
