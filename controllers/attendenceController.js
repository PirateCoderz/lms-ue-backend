const attendances = require("../models/attendences");

const uploadAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    console.log("date", date)
    

    // Validation checks
    if (!studentId || !date || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingAttendance = await attendances.findOne({ studentId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: "attendance already exists for this date" });
    }
    // Save attendance data to database
    const attendanceData = new attendances({ studentId, date, status });
    await attendanceData.save();

    return res
      .status(201)
      .json({ message: "attendance uploaded successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserAttendance = async (req, res) => {
  try {
    // Extract the student ID from the request parameters
    const studentId = req.params.id;

    // Find all attendance records for the student
    const attendanceData = await attendances.find({ studentId });

    // If the student has no attendance records, return a 404 status code
    if (attendanceData.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // If the student has attendance records, return them in the response
    return res.status(200).json({ attendanceData });
  } catch (err) {
    // If an error occurs, return a 500 status code with an error message
    return res.status(500).json({ message: err.message });
  }
};

const getUserStatus = async (req, res) => {
  try {
    // Extract the student ID and date from the request parameters
    const { studentId, date } = req.params;

    // Find the attendance record for the student on the specified date
    const attendanceData = await attendances.findOne({ studentId, date });

    // If no attendance record exists for the student on the specified date, return a 404 status code
    if (!attendanceData) {
      return res.status(404).json({ message: "No attendance record found for this student on this date" });
    }

    // If an attendance record exists, return the attendance status in the response
    return res.status(200).json({ status: attendanceData.status });
  } catch (err) {
    // If an error occurs, return a 500 status code with an error message
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadAttendance,
  getUserAttendance,
  getUserStatus
};
