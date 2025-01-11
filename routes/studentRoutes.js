const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { createStudent } = require('../controllers/studentController');


router.post('/createStudent', createStudent);
router.get('/getStudents', studentController.getStudents);
router.get('/getStudentById/:id', studentController.getStudentById);
router.delete('/deleteStudentById/:id', studentController.deleteStudentById);
router.patch('/updateStudentById/:id', studentController.updateStudentById);
router.get("/getStudentsByDepartment/:department", studentController.getStudentsByDepartment);



module.exports = router;