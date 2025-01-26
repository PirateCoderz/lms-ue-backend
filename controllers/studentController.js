const { students } = require("../models/students");
const bcrypt = require('bcrypt');


// Create a new student
let rollNo = 14901;

const createStudent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    // Generate unique registration number
    let isUnique = false;
    let registrationNo = null;

    while (!isUnique) {
      const number = Math.floor(1000 + Math.random() * 9000);
      registrationNo = `ggcsf-2020-2024-${number}`;
      const existingStudent = await students.findOne({ registrationNo });
      if (!existingStudent) {
        isUnique = true;
      }
    }

    // Hash the password
    const password = await bcrypt.hash(registrationNo, 8);

    // Build the student data
    const studentData = {
      student_id: req.body.student_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address: req.body.address,
      city: req.body.city,
      program: req.body.program,
      department: req.body.department,
      batch_year: req.body.batch_year || "2020-2024",
      registrationNo,
      password,
    };

    console.log("Student Data:", studentData);

    // Save the student record
    const student = new students(studentData);
    await student.save();

    res.status(201).send({
      data: student,
      message: "Student created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.code === 11000) {
      // Handle duplicate key errors
      return res.status(400).send({
        message: "Duplicate student_id, email, or registrationNo found.",
      });
    }
    res.status(500).send({
      message: "An error occurred while creating the student.",
    });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const studentsData = await students.find({});
    return res.send(studentsData);
  } catch (error) {
    res.status(500);
  }
};

const getStudentsByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const studentsData = await students.find({ courseName: department });
    res.send(studentsData);
  } catch (error) {
    res.status(500);
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const studentsData = await students.findById(req.params.id);
    if (!studentsData) {
      return res.status(404).send();
    }
    res.send(studentsData);
  } catch (error) {
    res.status(500);
  }
};
const deleteStudentById = async (req, res) => {
  try {
    const student = await students.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (error) {
    res.status(500);
  }
};

// Update a student by ID
const updateStudentById = async (req, res) => {
  try {
    const student = await students.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  getStudentsByDepartment,
};
