const express = require("express");
const router = express.Router();
const {
  uploadAttendance,
  getUserAttendance,
  getUserStatus
} = require("../controllers/attendenceController");

// Create a route for uploading attendance
router.post("/attendance", uploadAttendance);
router.get("/attendance/:id", getUserAttendance);
router.get("/getUserStatus/:studentId/:date", getUserStatus);


// Create a route for retrieving attendance data
// router.get("/attendance/:date/:studentId", getAttendance);

// Export the router
module.exports = router;
