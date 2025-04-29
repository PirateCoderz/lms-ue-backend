const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  qualifications: {
    type: String,
    // required: true,
    minLength: 3,
    maxLength: 200,
  },
  department: {
    type: String,
    // required: true,
    minLength: 3,
    maxLength: 200,
  },
  courses: {
    type: [String],
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 1024,
  },
  gender: {
    type: String,
    // required: true,
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
  
  type: { type: String, default: "Teacher" },
});

const teachers = mongoose.model("teachers", teacherSchema);

exports.teachers = teachers;
