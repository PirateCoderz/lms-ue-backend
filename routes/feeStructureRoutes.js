const express = require('express');
const router = express.Router();
const feeStructureController = require("../controllers/feeStructureController") 



router.post('/createFeeStructure', feeStructureController.createFeeStructure);
router.get('/getFeeStructure', feeStructureController.getFeeStructure);
router.delete('/deleteFeeStructureById/:id', feeStructureController.deleteFeeStructureById);


module.exports = router;