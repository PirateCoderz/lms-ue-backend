const { Teacher } = require("../models/teacher");
const bcrypt = require('bcrypt');


// Create a new student
const createTeacher = async (req, res) => {
  try {
    console.log("req=====>", req.body);
    const number = Math.floor(1000 + Math.random() * 9000);
    const password = await bcrypt.hash(`ggcsf-2020-2024-${number}`,8)
    const teacherData = {
      ...req.body,
      regestrationNo: `ggcsf-2020-2024-${number}`,
      password,
    };
    const teacher = new Teacher(teacherData);
    await teacher.save();
    res.send({
      data: teacher,
      message: "User Create Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500)
  }
};

// Get all teachers
const getTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.send(teachers);
  } catch (error) {
    res.status(500)
  }
};

const getTeacherByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const teachers = await Teacher.find({ deparment: department });
    res.send(teachers);
  } catch (error) {
    res.status(500)
  }
};

// Get a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500)
  }
};
const deleteTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500)
  }
};

// Update a teacher by ID
const updateTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500)
  }
};

module.exports = {
  createTeacher,
  getTeacher,
  getTeacherById,
  deleteTeacherById,
  updateTeacherById,
  getTeacherByDepartment
};
