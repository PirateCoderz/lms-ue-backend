const { Student } = require("../models/student");
const bcrypt = require('bcrypt');


// Create a new student
let rollNo = 14901;

const createStudent = async (req, res) => {
  try {
    console.log("req=====>", req.body);
    const number = Math.floor(1000 + Math.random() * 9000);
    const password = await bcrypt.hash(`ggcsf-2020-2024-${number}`,8)
    const studentData = {
      ...req.body,
      regestrationNo: `ggcsf-2020-2024-${number}`,
      password,
      rollNo: rollNo++

    };
    console.log(studentData)
    const student = new Student(studentData);
    await student.save();
    res.send({
      data: student,
      message: "User Create Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500);
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.send(students);
  } catch (error) {
    res.status(500);
  }
};

const getStudentsByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const students = await Student.find({ courseName: department });
    res.send(students);
  } catch (error) {
    res.status(500);
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
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
    const student = await Student.findByIdAndDelete(req.params.id);
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
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
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
