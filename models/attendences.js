const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  date: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  
});

module.exports = mongoose.model("attendances", attendanceSchema);
