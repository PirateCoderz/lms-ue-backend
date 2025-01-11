const { FeeStructure } = require("../models/feeStructure");

// Create a new student
const createFeeStructure = async (req, res) => {
  try {
    console.log("req=====>", req.body);
  
    const feeStructure = new FeeStructure(req.body);
    await feeStructure.save();
    res.send({
      data: feeStructure,
      message: "feeStructure Create Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500)
  }
};

// Get all students
const getFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.find({});
    res.send(feeStructure);
  } catch (error) {
    res.status(500)
  }
};

// Get a single student by ID

const deleteFeeStructureById = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findByIdAndDelete(req.params.id);
    if (!feeStructure) {
      return res.status(404).send();
    }
    res.send(feeStructure);
  } catch (error) {
    res.status(500)
  }
};

module.exports = {
    createFeeStructure,
    getFeeStructure,
    deleteFeeStructureById,
};
