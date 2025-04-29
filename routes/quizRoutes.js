const router = require("express").Router();
const quizController = require("../controllers/quizController");

router.get("/", (req, res) => {
  res.send("Quiz route working.");
});
// Route to create a new quiz
router.post("/createQuiz/:teacherId", quizController.createQuiz);

// // Route to get all quizzes of a teacher
router.get("/getQuizzes/:teacherId", quizController.getQuizzes);

// // Route to get quizzes by course
router.post("/getQuizzesByCourse", quizController.getQuizzesByCourseName);

// // Route to get a specific quiz by its ID
router.get("/getQuizById/:id", quizController.getQuizById);

// Route to Mark a specific quiz by its ID
router.post("/mark/:studentId/:id", quizController.markQuiz);

// // Route to delete a quiz by its ID
// router.delete("/deleteQuizById/:id", quizController.deleteQuizById);

// // Route to update a quiz by its ID
router.patch("/updateQuizById/:id", quizController.updateQuizById);

module.exports = router;
