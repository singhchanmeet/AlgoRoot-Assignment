const TaskModel = require('../models/taskModel');

// Get all tasks
async function getTasks(req, res) {
  try {
    const tasks = await TaskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
  }
}

// Get a single task by ID
async function getTask(req, res) {
  try {
    const task = await TaskModel.getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve task', error: error.message });
  }
}

// Create a new task
async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTask = await TaskModel.createTask({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
}

// Update an existing task
async function updateTask(req, res) {
  try {
    const updatedTask = await TaskModel.updateTask(req.params.id, req.body);
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
}

// Delete a task
async function deleteTask(req, res) {
  try {
    const result = await TaskModel.deleteTask(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};