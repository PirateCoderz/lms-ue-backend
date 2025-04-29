const multer = require('multer');
const path = require('path');
const { assignments } = require("../models/assignments");


// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assignments/'); // Files will be uploaded to 'public/assignments' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename to avoid conflicts
  }
});


const upload = multer({ storage: storage });


// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const teacherId = req.params.id;
    // Create a new assignment with st_assignments included in the body
    const assignment = new assignments({ ...req.body, teacherId });
    await assignment.save();
    res.send({
      data: assignment,
      message: "Assignment Created Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error creating assignment" });
  }
};


// Submit assignment method with file upload to public/assignments folder
const submitAssignment = async (req, res) => {
  try {

    const assignment = await assignments.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }

    // Check if the student has already submitted the assignment
    const existingSubmission = assignment.st_assignments.find(
      (submission) => submission.studentId.toString() === req.params.studentId
    );

    if (existingSubmission) {
      return res.status(400).send({
        message: "You have already submitted this assignment",
      });
    }


    // Handle file upload
    console.log("Assignment File is uploading")
    upload.single('assignment')(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ message: "Error uploading file", error: err });
      }

      // Get the assignment by its ID
      console.log("Assignment File is uploaded")

      // File path after upload
      const filePath = req.file ? `/assignments/${req.file.filename}` : null;
      console.log(filePath)

      // Add the new submission to the `st_assignments` array
      assignment.st_assignments.push({
        studentId: req.params.studentId,
        assignment: filePath,
        submit_date: new Date(),
        marks: null, // Marks will be assigned later
        status: "submitted", // Initial status is 'submitted'
        feedback: null, // Feedback will be given later
      });

      // Save the updated assignment with the file URL
      await assignment.save();

      console.log("Assignment submitted successfully")

      res.send({
        data: assignment,
        message: "Assignment submitted successfully",
      });
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error submitting assignment" });
  }
};


/*
// const submitAssignment = async (req, res) => {
//   try {
//     // Get the assignment by its ID
//     const assignment = await assignments.findById(req.params.id);
//     if (!assignment) {
//       return res.status(404).send({ message: "Assignment not found" });
//     }

//     // Check if the student has already submitted the assignment
//     const existingSubmission = assignment.st_assignments.find(
//       (submission) => submission.studentId.toString() === req.params.studentId
//     );

//     if (existingSubmission) {
//       return res.status(400).send({
//         message: "You have already submitted this assignment",
//       });
//     }

//     assignment.st_assignments.push({
//       studentId: req.params.studentId,
//       assignment: req.body.assignment,
//       submit_date: new Date(),
//       marks: null, // Marks will be assigned later
//       status: "submitted", // Initial status is 'submitted'
//       feedback: null, // Feedback will be given later
//     });

//     // Save the updated assignment
//     await assignment.save();
//     res.send({
//       data: assignment,
//       message: "Assignment submitted successfully",
//     });
//   } catch (error) {
//     console.log("error===>", error);
//     res.status(500).send({ message: "Error submitting assignment" });
//   }
// };
*/




// Mark the assignment
// Mark a specific student’s assignment
const markAssignment = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const { marks, feedback } = req.body;

    const assignment = await assignments.findById(id);
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }

    const submission = assignment.st_assignments.find(
      (submission) => submission.studentId.toString() === studentId
    );

    if (!submission) {
      return res.status(404).send({ message: "Student submission not found" });
    }

    // Update the submission fields
    submission.marks = marks || submission.marks;
    submission.feedback = feedback || submission.feedback;
    submission.status = 'graded';

    await assignment.save();

    res.send({
      message: "Assignment marked successfully",
      data: submission
    });
  } catch (error) {
    console.error("Error marking assignment:", error);
    res.status(500).send({ message: "Error marking assignment" });
  }
};


// Get all assignments
const getAssignments = async (req, res) => {
  const { teacherId } = req.params
  try {

    const allAssignments = await assignments.find({ teacherId });
    res.send(allAssignments);

  } catch (error) {
    res.status(500).send({ message: "Error fetching assignments" });
  }
};

// Get all assignments
const getAssignmentsByCourseName = async (req, res) => {
  const { course } = req.body
  try {

    const allAssignments = await assignments.find({ course });
    res.send(allAssignments);

  } catch (error) {
    res.status(500).send({ message: "Error fetching assignments" });
  }
};


// Get a single assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignments.findById(req.params.id) .populate('st_assignments.studentId', 'studentName');
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    res.send(assignment);
  } catch (error) {
    res.status(500).send({ message: "Error fetching assignment" });
  }
};


// Delete an assignment by ID
const deleteAssignmentById = async (req, res) => {
  try {
    const assignment = await assignments.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    res.send({ message: "Assignment deleted successfully", data: assignment });
  } catch (error) {
    res.status(500).send({ message: "Error deleting assignment" });
  }
};


// Update an assignment by ID
const updateAssignmentById = async (req, res) => {
  try {
    const assignment = await assignments.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with provided data
      { new: true, runValidators: true }
    );
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }

    // Check if `st_assignments` is included in the body and update accordingly
    if (req.body.st_assignments) {
      assignment.st_assignments = req.body.st_assignments;
    }

    await assignment.save();
    res.send(assignment);
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error updating assignment" });
  }
};



module.exports = {
  createAssignment,

  submitAssignment,
  markAssignment,

  getAssignments,
  getAssignmentsByCourseName,

  getAssignmentById,
  deleteAssignmentById,
  updateAssignmentById,
};
