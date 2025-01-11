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

const Department = mongoose.model("Department", departmentSchema);

exports.Department = Department;
