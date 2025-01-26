const mongoose = require("mongoose");

const meritlistSchema = new mongoose.Schema({
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

const merit_lists = mongoose.model("merit_lists", meritlistSchema);

exports.merit_lists = merit_lists;
