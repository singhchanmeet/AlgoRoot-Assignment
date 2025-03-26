const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', taskController.getTasks);

// GET /tasks/:id - Get a specific task
router.get('/:id', taskController.getTask);

// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /tasks/:id - Update a task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;