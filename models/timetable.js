const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({

  courseName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  fileData: {
    type: Array,
    required: true,
    minLength: 3,
    maxLength: 1024,
  },
});

const TimeTable = mongoose.model("timeTable", timeTableSchema);

exports.TimeTable = TimeTable;
