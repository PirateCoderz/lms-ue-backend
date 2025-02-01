const { departments } = require("../models/departments");

// Create a new student
const createDepartment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    // Extract fields from request body
    const { id, title, hod, email, course } = req.body;

    // Check if the department already exists (by id or email)
    const existingDepartment = await departments.findOne({ id });
    if (existingDepartment) {
      return res.status(400).send({
        message: "Department with the same ID already exists.",
      });
    }

    // Build department data
    const departmentData = {
      id,
      title,
      hod,
      email,
      course,
    };

    console.log("Department Data:", departmentData);

    // Create the department
    const department = await departments.create(departmentData);

    res.status(201).send({
      data: department,
      message: "Department created successfully",
    });
  } catch (error) {
    console.error("Error creating department:", error);

    if (error.code === 11000) {
      // Handle duplicate key errors
      return res.status(400).send({
        message: "Duplicate id or email found.",
      });
    }

    res.status(500).send({
      message: "An error occurred while creating the department.",
      error: error.message,
    });
  }
};

// Get all students
const getDepartments = async (req, res) => {
  try {
    const department = await departments.find({});
    res.send(department);
  } catch (error) {
    res.status(500)
  }
};

// Get a single student by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await departments.findById(req.params.id);
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
    const department = await departments.findByIdAndDelete(req.params.id);
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
    const department = await departments.findByIdAndUpdate(req.params.id, req.body, {
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
