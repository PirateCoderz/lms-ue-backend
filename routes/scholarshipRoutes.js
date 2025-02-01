const express = require('express');
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");

router.get('/get', (req, res) => {
  res.send("welcome");
});
router.post('/createScholarship', scholarshipController.createScholarship);
router.get('/getScholarships', scholarshipController.getScholarships);
router.get('/getScholarshipById/:id', scholarshipController.getScholarshipById);
router.delete('/deleteScholarshipById/:id', scholarshipController.deleteScholarshipById);

module.exports = router;
