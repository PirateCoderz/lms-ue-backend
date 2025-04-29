const mongoose = require("mongoose");

const studentAssignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students', // Assuming there is a student model to reference
    required: true,
  },
  assignment: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  submit_date: {
    type: Date,
    required: true,
  },
  marks: {
    type: Number, // Marks assigned to the student's submission
    default: null, // Set to null if not graded yet
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'graded'], // You can add more statuses if needed
    default: 'pending',
  },
  feedback: {
    type: String,
    maxLength: 500, // Optional feedback for the student
  }
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 500,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers', // Assuming there's a teacher model to reference
    required: true,
  },
  course: {
    type: String, // Reference to the course
    required: true,
  },
  st_assignments: {
    type: [studentAssignmentSchema], // Array of student assignment objects
    required: false, // Optional, can be added later
  }
});

const assignments = mongoose.model("assignments", assignmentSchema);

exports.assignments = assignments;
