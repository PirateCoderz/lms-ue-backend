const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/createDepartment", departmentController.createDepartment);
router.get("/getDepartments", departmentController.getDepartments);
router.get("/getDepartmentById/:id", departmentController.getDepartmentById);
router.delete(
  "/deleteDepartmentById/:id",
  departmentController.deleteDepartmentById
);
router.patch(
  "/updateDepartmentById/:id",
  departmentController.updateDepartmentById
);

module.exports = router;
