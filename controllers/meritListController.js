const { MeritList } = require("../models/meritlist");

// Create a new student
const createMeritList = async (req, res) => {
  try {
    console.log("req=====>", req.body);
  
    const meritList = new MeritList(req.body);
    await meritList.save();
    res.send({
      data: meritList,
      message: "Merit List Create Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500);
  }
};

// Get all students
const getMeritList = async (req, res) => {
  try {
    const meritList = await MeritList.find({});
    res.send(meritList);
  } catch (error) {
    res.status(500);
  }
};

// Get a single student by ID

const deleteMeritListById = async (req, res) => {
  try {
    const meritList = await MeritList.findByIdAndDelete(req.params.id);
    if (!meritList) {
      return res.status(404).send();
    }
    res.send(meritList);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  createMeritList,
  getMeritList,
  deleteMeritListById,
};
