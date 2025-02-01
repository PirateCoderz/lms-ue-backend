const scholarships = require("../models/scholarships");

// Create a new scholarship
const createScholarship = async (req, res) => {
  try {
    console.log("req=====>", req.body);
  
    const scholarship = new scholarships(req.body);
    await scholarship.save();
    res.send({
      data: scholarship,
      message: "Scholarship Created Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Server Error", error });
  }
};

// Get all scholarships
const getScholarships = async (req, res) => {
  try {


    const scholarshipList = await scholarships.find({});
    res.send(scholarshipList);
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Server Error", error });
  }
};

// Get a single scholarship by ID
const getScholarshipById = async (req, res) => {
  const { id } = req.params;
  try {
    const scholarship = await scholarships.find({id});
    if (!scholarship) {
      return res.status(404).send({ message: "Scholarship Not Found" });
    }
    res.send(scholarship);
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Server Error", error });
  }
};

// Delete a scholarship by ID
const deleteScholarshipById = async (req, res) => {
  const { id } = req.params;
  try {
    const scholarship = await scholarships.deleteOne({id});
    if (!scholarship) {
      return res.status(404).send({ message: "Scholarship Not Found" });
    }
    res.send({
      data: scholarship,
      message: "Scholarship Deleted Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500).send({ message: "Server Error", error });
  }
};

module.exports = {
  createScholarship,
  getScholarships,
  getScholarshipById,
  deleteScholarshipById,
};
