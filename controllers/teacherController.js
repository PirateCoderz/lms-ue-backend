const { teachers } = require("../models/teachers");
const bcrypt = require('bcrypt');


// Create a new student
const createTeacher = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    // Ensure unique registration number
    let isUnique = false;
    let registrationNo = null;

    while (!isUnique) {
      const number = Math.floor(1000 + Math.random() * 9000);
      registrationNo = `ggcsf-2020-2024-${number}`;
      const existingTeacher = await teachers.findOne({ registrationNo });

      if (!existingTeacher) {
        isUnique = true; // Break the loop if no collision
      }
    }

    // Hash the unique registration number to generate a password
    const password = await bcrypt.hash(registrationNo, 8);

    // Build the teacher object
    const teacherData = {
      teacher_id: req.body.teacher_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      email: req.body.email,
      phone_number: req.body.phone_number,
      designation: req.body.designation,
      department: req.body.department,
      qualification: req.body.qualification,
      office_phone: req.body.office_phone,
      office_room: req.body.office_room,
      registrationNo,
      password,
    };

    // Create and save the teacher record
    const teacher = new teachers(teacherData);
    await teacher.save();

    res.status(201).send({
      data: teacher,
      message: "Teacher created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "An error occurred while creating the teacher",
    });
  }
};


// Get all teachers
const getTeacher = async (req, res) => {
  try {
    const teachersData = await teachers.find({});
    res.send(teachersData);
  } catch (error) {
    res.status(500)
  }
};

const getTeacherByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const teachersData = await teachers.find({ deparment: department });
    res.send(teachersData);
  } catch (error) {
    res.status(500)
  }
};

// Get a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await teachers.findById(req.params.id);
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
    const teacher = await teachers.findByIdAndDelete(req.params.id);
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
    const teacher = await teachers.findByIdAndUpdate(req.params.id, req.body, {
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
