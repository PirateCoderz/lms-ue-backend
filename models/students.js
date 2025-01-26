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
});

const students = mongoose.model("students", studentSchema);

module.exports = { students };