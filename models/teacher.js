const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherName: {
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
  qualifications: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  deparment: {
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
  designation: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  teacherRoom: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    default: "2020-2024",
  },
  
  type: { type: String, default: "Teacher" },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

exports.Teacher = Teacher;
