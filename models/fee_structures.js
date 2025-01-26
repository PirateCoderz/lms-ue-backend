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

const fee_structures = mongoose.model("fee_structures", feeStructureSchema);

exports.fee_structures = fee_structures;
