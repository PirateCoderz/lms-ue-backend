const { time_tables } = require("../models/time_tables");

// Create a new student
const createTimeTable = async (req, res) => {
  try {
    console.log("req=====>", req.body);

    const timeTable = new time_tables(req.body);
    await timeTable.save();
    res.send({
      data: timeTable,
      message: "timeTable  Create Successfully",
    });
  } catch (error) {
    console.log("error===>", error);
    res.status(500)
  }
};

// Get all students
const getTimeTable = async (req, res) => {
  try {
    const timeTable = await time_tables.find({});
    res.send(timeTable);
  } catch (error) {
    res.status(500)
  }
};

const getTimeTableByDepartment = async (req, res) => {
  const courseName = req.params.department;
  console.log("courseName", courseName)

  try {
    const timeTable = await time_tables.find({ courseName: courseName });
    console.log("timeTable", timeTable);
    res.send(timeTable);
  } catch (error) {
    res.status(500)
  }
};

// Get a single student by ID

const deleteTimeTable = async (req, res) => {
  try {
    const timeTable = await time_tables.findByIdAndDelete(req.params.id);
    if (!timeTable) {
      return res.status(404).send();
    }
    res.send(timeTable);
  } catch (error) {
    res.status(500)
  }
};

module.exports = {
  createTimeTable,
  getTimeTable,
  deleteTimeTable,
  getTimeTableByDepartment,
};
