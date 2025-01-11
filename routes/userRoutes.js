const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/loginClient', userController.loginClient);
router.get('/getUserById/:id', userController.getUserDataById);

router.put('/update', userController.updatePass);

module.exports = router;
