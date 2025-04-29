const { quizzes } = require("../models/quizzes");
const { students } = require("../models/students");
// const { teachers } = require("../models/teachers");


// Set up multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/quizzes/'); // Files will be uploaded to 'public/quizzes' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename to avoid conflicts
//   }
// });

// const upload = multer({ storage: storage });

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const quizData = { ...req.body, teacherId };

    console.log("Received quiz data:", quizData);

    // Find students where courseName array includes the course
    const enrolledStudents = await students.find({ courseName: quizData.course });

    if (!enrolledStudents.length) {
      return res.status(404).send({ message: "No students found for this course" });
    }

    // Prepare the st_quizzes array
    const st_quizzes = enrolledStudents.map(student => ({
      studentId: student._id,
      status: 'pending',
      marks: 0,
      feedback: ''
    }));

    // Create the new quiz
    const quiz = new quizzes({
      ...quizData,
      st_quizzes,
    });

    await quiz.save();

    res.send({
      data: quiz,
      message: "Quiz Created Successfully",
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).send({ message: "Error creating quiz", error: error.message });
  }
};

// Get all quizzes of a teacher
const getQuizzes = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const allQuizzes = await quizzes.find({ teacherId });
    res.send(allQuizzes);
  } catch (error) {
    res.status(500).send({ message: "Error fetching quizzes" });
  }
};

// Get quizzes by course name
const getQuizzesByCourseName = async (req, res) => {
  const { course } = req.body;
  try {
    const allQuizzes = await quizzes.find({ course });
    res.send(allQuizzes);
  } catch (error) {
    res.status(500).send({ message: "Error fetching quizzes" });
  }
};

// Get a single quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await quizzes.findById(req.params.id).populate('st_quizzes.studentId', 'studentName');
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send({ message: "Error fetching quiz", error: error.message });
  }
};

// Delete a quiz by ID
const deleteQuizById = async (req, res) => {
  try {
    const quiz = await quizzes.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }
    res.send({ message: "Quiz deleted successfully", data: quiz });
  } catch (error) {
    res.status(500).send({ message: "Error deleting quiz" });
  }
};

// Update a quiz by ID
const updateQuizById = async (req, res) => {
  try {
    const quiz = await quizzes.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with provided data
      { new: true, runValidators: true }
    );
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    // Check if `studentData` is included in the body and update accordingly
    if (req.body.studentData) {
      quiz.studentData = req.body.studentData;
    }

    await quiz.save();
    res.send(quiz);
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error updating quiz" });
  }
};

// Submit a quiz (student submits a quiz)
const submitQuiz = async (req, res) => {
  try {
    const quiz = await quizzes.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    // Check if the student has already submitted the quiz
    const existingSubmission = quiz.studentData.find(
      (submission) => submission.studentId.toString() === req.params.studentId
    );

    if (existingSubmission) {
      return res.status(400).send({
        message: "You have already submitted this quiz",
      });
    }

    // Add the new submission to the `studentData` array
    quiz.studentData.push({
      studentId: req.params.studentId,
      marks: 0, // Marks can be updated later
      status: "submitted", // Initial status is 'submitted'
      feedback: null, // Feedback will be given later
    });

    await quiz.save();

    res.send({
      data: quiz,
      message: "Quiz submitted successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error submitting quiz" });
  }
};

// Mark a specific student's quiz
const markQuiz = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const { marks, feedback } = req.body;

    const quiz = await quizzes.findById(id);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    const submission = quiz.st_quizzes.find(
      (submission) => submission.studentId._id.toString() === studentId
    );

    if (!submission) {
      return res.status(404).send({ message: "Student submission not found" });
    }

    // Update the submission fields
    submission.marks = marks || submission.marks;
    submission.feedback = feedback || submission.feedback;
    submission.status = 'graded';

    await quiz.save();

    res.send({
      message: "Quiz marked successfully",
      data: submission
    });
  } catch (error) {
    console.error("Error marking quiz:", error);
    res.status(500).send({ message: "Error marking quiz" });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizzesByCourseName,
  getQuizById,
  deleteQuizById,
  updateQuizById,
  submitQuiz,
  markQuiz,
};
