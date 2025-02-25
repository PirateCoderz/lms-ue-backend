const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    unique: true, // Ensure unique student ID
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"], // Gender options can be validated if needed
  },
  email: {
    type: String,
    unique: true, // Ensure unique email
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  program: {
    type: String,
  },
  department: {
    type: String,
  },
  batch_year: {
    type: String,
    default: "2020-2024", // Default batch year
  },
  registrationNo: {
    type: String,
    unique: true, // Ensure unique registration number
  },
  password: {
    type: String,
  },



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
  // password: {
  //   type: String,
  //   required: true,
  //   minLength: 3,
  //   maxLength: 1024,
  // },
  // gender: {
  //   type: String,
  //   required: true,
  //   minLength: 3,
  //   maxLength: 200,
  // },
  // regestrationNo: {
  //   type: String,
  //   required: true,
  //   minLength: 3,
  //   maxLength: 200,
  // },
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
});

const students = mongoose.model("students", studentSchema);

module.exports = { students };