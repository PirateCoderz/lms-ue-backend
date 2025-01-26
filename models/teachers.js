const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    unique: true, // Ensure unique teacher ID
    // minLength: 3, // Commented out validations
    // maxLength: 20,
  },
  first_name: {
    type: String,
    minLength: 3,
    // maxLength: 30,
  },
  last_name: {
    type: String,
    // minLength: 3,
    // maxLength: 30,
  },
  gender: {
    type: String,
    enum: ["male", "female"], // Gender options can be validated if needed
    // minLength: 3,
    // maxLength: 10,
  },
  email: {
    type: String,
    unique: true, // Ensure email is unique
    // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Commented email validation regex
  },
  phone_number: {
    type: String,
    // match: /^03\d{2}-\d{7}$/, // Commented phone number validation
  },
  designation: {
    type: String,
    // minLength: 3,
    // maxLength: 50,
  },
  department: {
    type: String,
    // minLength: 3,
    // maxLength: 50,
  },
  qualification: {
    type: String,
    // minLength: 3,
    // maxLength: 100,
  },
  office_phone: {
    type: String,
    // match: /^041-\d{7}$/, // Commented office phone validation
  },
  office_room: {
    type: String,
  },
  registrationNo: {
    type: String,
    unique: true, // Ensure unique registration number
  },
  password: {
    type: String,
    // minLength: 8,
    // maxLength: 1024,
  },
  session: {
    type: String,
    default: "2020-2024", // Default session value
  },
});

const teachers = mongoose.model("teachers", teacherSchema);

module.exports = { teachers };
