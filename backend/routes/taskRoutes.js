const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authorize } = require('../middleWare/authMiddleware');
// Protect all task routes with the authorize middleware
router.use(authorize);

router.post('/api/auth/createTask', taskController.createTask);
// router.get('/api/auth/getAllTasks', taskController.getAllTasks);
// router.get('/api/auth/singleTask/:id', taskController.getSingleTask);
// router.put('/api/auth/updateTask/:id', taskController.updateTask);
// router.delete('/api/auth/deleteTask/:id', taskController.deleteTask);

module.exports = router;