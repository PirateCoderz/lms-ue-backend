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

const time_tables = mongoose.model("time_tables", timeTableSchema);

exports.time_tables = time_tables;
