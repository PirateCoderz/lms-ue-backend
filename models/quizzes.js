const mongoose = require("mongoose");

const studentQuizSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true,
  },
  quiz: {
    type: String,
  },
  submit_date: {
    type: Date,
  },
  marks: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'graded'],
    default: 'submitted',
  },
  feedback: {
    type: String,
    maxLength: 500,
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  googleFormLink: {
    type: String,
  },
  startTime: {
    type: Date,  // <-- New field
    required: false,
  },
  endTime: {
    type: Date,  // <-- New field
    required: false,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers',
    required: true,
  },
  course: {
    type: String,
  },
  st_quizzes: {
    type: [studentQuizSchema],
    required: false,
  }
});

const quizzes = mongoose.model("quizzes", quizSchema);

exports.quizzes = quizzes;
