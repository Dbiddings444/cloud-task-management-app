const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/auth/signup', userController.signup);
router.post('/api/auth/login', userController.login);
router.post('/api/auth/getUsers', userController.getUsers);


module.exports = router;