const express = require("express");
const router = express.Router();
const courseMaterialController = require("../controllers/courseMaterialController");

// Route to create a new course material
router.post("/createMaterial", courseMaterialController.createMaterial);

// Route to get all course materials for a teacher
router.get("/getMaterials/:teacherId", courseMaterialController.getMaterialsByTeacher);

// Route to get materials by course name
router.post("/getMaterialsByCourse", courseMaterialController.getMaterialsByCourse);

// Route to get a specific material by its ID
router.get("/getMaterialById/:id", courseMaterialController.getMaterialById);

// Route to delete a material by its ID
router.delete("/deleteMaterialById/:id", courseMaterialController.deleteMaterialById);

// Route to update a material by its ID
router.patch("/updateMaterialById/:id", courseMaterialController.updateMaterialById);

module.exports = router;
