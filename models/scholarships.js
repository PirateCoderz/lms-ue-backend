const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: String,
    required: true
  },
  eligibility: {
    type: String
  },
  details: {
    type: String
  },
  link: {
    type: String
  }
}, { timestamps: true });

const scholarships = mongoose.model('scholarships', ScholarshipSchema);

module.exports = scholarships;
