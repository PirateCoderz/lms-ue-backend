const express = require("express");
const router = express.Router();
const timeTableController = require("../controllers/timeTableController");

router.post("/createTimeTable", timeTableController.createTimeTable);
router.get("/getTimeTable", timeTableController.getTimeTable);
router.get("/getTimeTable/:department", timeTableController.getTimeTableByDepartment);
router.delete("/deleteTimeTable/:id", timeTableController.deleteTimeTable);

module.exports = router;
