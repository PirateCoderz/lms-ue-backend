const express = require('express');
const router = express.Router();
const meritListController = require("../controllers/meritListController") 



router.post('/createMeritList', meritListController.createMeritList);
router.get('/getMeritList', meritListController.getMeritList);
router.delete('/deleteMeritListById/:id', meritListController.deleteMeritListById);


module.exports = router;