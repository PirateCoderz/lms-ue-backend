const { teachers } = require("../models/teachers");
const bcrypt = require('bcrypt');


// Create a new student
const createTeacher = async (req, res) => {
  try {
    console.log("req=====>", req.body);
    const number = Math.floor(1000 + Math.random() * 9000);
    const password = await bcrypt.hash(`ue2025-${number}`, 8)
    const teacherData = {
      ...req.body,
      regestrationNo: `ue2025-${number}`,
      password,
    };
    const teacher = new teachers(teacherData);
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

// Get all teachersdata
const getTeacher = async (req, res) => {
  try {
    const teachersdata = await teachers.find({});
    res.send(teachersdata);
  } catch (error) {
    res.status(500)
  }
};

const getTeacherByDepartment = async (req, res) => {
  const department = req.params.department;

  console.log(department)
  return res.json({ id: department, message: "payload Successful." })
  try {
    const teachersdata = await teachers.find({ deparment: department });
    res.send(teachersdata);
  } catch (error) {
    console.log(error.message)
    res.status(500)
  }
};


// Get Teachers By Course Names
// Get teachers by course names
const getAllTeachersByCourseNames = async (req, res) => {
  try {
    // Get the array of course names from the request body
    const courseNames = req.body.courseNames; // Expecting an array of course names
    console.log(courseNames)  
    if (!Array.isArray(courseNames) || courseNames.length === 0) {
      return res.status(400).json({ message: "Invalid course names array." });
    }

    // Find teachers whose courses match any of the provided courses
    const teachersData = await teachers.find({
      courses: { $in: courseNames } // This will match teachers whose courses array contains any of the provided course names
    });

    // Check if no teachers found
    if (teachersData.length === 0) {
      return res.status(404).json({ message: "No teachers found for the given courses." });
    }

    // Return the found teachers
    res.status(200).json(teachersData);
  } catch (error) {
    console.error("Error fetching teachers by courses:", error);
    res.status(500).json({ message: "Server error" });
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
  getAllTeachersByCourseNames,
  deleteTeacherById,
  updateTeacherById,
  getTeacherByDepartment
};
