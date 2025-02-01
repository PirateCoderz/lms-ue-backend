const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true, // Ensure unique department ID
    required: true,
  },
  title: {
    type: String,

  },
  hod: {
    type: String,
  },
  email: {
    type: String,
    // unique: true, // Ensure unique email
  },
  course: {
    type: [String], // Array of strings to handle multiple programs
    required: true,
  },

});

const departments = mongoose.model("departments", departmentSchema);

module.exports = { departments };
