const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  courseName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
});

const departments = mongoose.model("departments", departmentSchema);

exports.departments = departments;
