const { students } = require("../models/students");
const bcrypt = require('bcrypt');


const createStudent = async (req, res) => {
  try {
    console.log("req=====>", req.body);

    // Generate a random number for the rollNo
    const number = Math.floor(1000 + Math.random() * 9000);

    // Hash the password
    const password = await bcrypt.hash(`BSF210-${number}`, 8);

    const studentData = {
      ...req.body,
      student_id: number,
      regestrationNo: `BSF210-${number}`,
      password,
      rollNo: number, // Random rollNo
    };

    console.log(studentData);

    // Create a new student with the data
    const student = new students(studentData);

    // Save the student
    await student.save();

    res.send({
      data: student,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Error creating student." });
  }
};


// Get all studentsdata
const getStudents = async (req, res) => {
  try {
    const studentsdata = await students.find({});
    return res.send(studentsdata);
  } catch (error) {
    res.status(500);
  }
};

const getStudentsByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const studentsdata = await students.find({ courseName: department });
    res.send(studentsdata);
  } catch (error) {
    res.status(500);
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await students.findById(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
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
