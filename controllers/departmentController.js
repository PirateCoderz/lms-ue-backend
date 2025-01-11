const { Department } = require("../models/departments");

// Create a new student
const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.send({
      data:department,
      message:"User Create Successfully"
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500)
  }
};

// Get all students
const getDepartments = async (req, res) => {
  try {
    const department = await Department.find({});
    res.send(department);
  } catch (error) {
    res.status(500)
  }
};

// Get a single student by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).send();
    }
    res.send(department);
  } catch (error) {
    res.status(500)
  }
};
const deleteDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).send();
    }
    res.send(department);
  } catch (error) {
    res.status(500)
  }
};

// Update a student by ID
const updateDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!department) {
      return res.status(404).send();
    }
    res.send(department);
  } catch (error) {
    res.status(500)
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById
};
