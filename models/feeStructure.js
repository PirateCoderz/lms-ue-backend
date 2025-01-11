const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema({
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
  file: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 1024,
  },
});

const FeeStructure = mongoose.model("feeStructure", feeStructureSchema);

exports.FeeStructure = FeeStructure;
