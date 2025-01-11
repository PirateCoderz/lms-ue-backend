const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/createTeacher", teacherController.createTeacher);
router.get("/getTeachers", teacherController.getTeacher);
router.get("/getTeacherById/:id", teacherController.getTeacherById);
router.get("/getTeacherByDepartment/:department", teacherController.getTeacherByDepartment);
router.delete("/deleteTeacherById/:id", teacherController.deleteTeacherById);
router.patch("/updateTeacherById/:id", teacherController.updateTeacherById);


module.exports = router;
