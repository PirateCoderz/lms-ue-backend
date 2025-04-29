const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/createTeacher", teacherController.createTeacher);
router.get("/getTeachers", teacherController.getTeacher);

// Add the new route for fetching teachers by course names
router.post("/getAllTeachersByCourseNames", teacherController.getAllTeachersByCourseNames);

router.get("/getTeacherById/:id", teacherController.getTeacherById);
router.get("/getTeacherByDepartment/:department", teacherController.getTeacherByDepartment);

router.patch("/updateTeacherById/:id", teacherController.updateTeacherById);

router.delete("/deleteTeacherById/:id", teacherController.deleteTeacherById);


module.exports = router;
