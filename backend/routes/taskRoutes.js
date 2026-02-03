const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/api/auth/createTask', taskController.createTask);
router.get('/api/auth/getAllTasks', taskController.getAllTasks);
router.get('/api/auth/singleTask/:id', taskController.getSingleTask);
router.put('/api/auth/updateTask/:id', taskController.updateTask);
router.delete('/api/auth/deleteTask/:id', taskController.deleteTask);

module.exports = router;