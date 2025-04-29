const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// Route to create a new assignment
router.post("/createAssignment/:id", assignmentController.createAssignment);

// Route to get all assignments
router.get("/getAssignments/:teacherId", assignmentController.getAssignments);

// Route to get all assignments
router.post("/getAssignmentsByCourse/", assignmentController.getAssignmentsByCourseName);

// Route to get a specific assignment by its ID
router.get("/getAssignmentById/:id", assignmentController.getAssignmentById);

// Route to delete an assignment by its ID
router.delete("/deleteAssignmentById/:id", assignmentController.deleteAssignmentById);

// Route to update an assignment by its ID
router.patch("/updateAssignmentById/:id", assignmentController.updateAssignmentById);

// Route to submit an assignment (by assignment ID)
router.post("/submit/:studentId/:id", assignmentController.submitAssignment);

// Route to submit an assignment (by assignment ID)
router.put("/mark/:studentId/:id", assignmentController.markAssignment);

module.exports = router;
