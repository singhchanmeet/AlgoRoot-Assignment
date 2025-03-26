const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data', 'tasks.json');

// Get all tasks
async function getAllTasks() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
}

// Get a single task by id
async function getTaskById(id) {
  try {
    const tasks = await getAllTasks();
    return tasks.find(task => task.id === id);
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return null;
  }
}

// Create a new task
async function createTask(taskData) {
  try {
    const tasks = await getAllTasks();
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Update an existing task
async function updateTask(id, taskData) {
  try {
    const tasks = await getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    
    await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
    return tasks[taskIndex];
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    const tasks = await getAllTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      return false; // No task was removed
    }
    
    await fs.writeFile(dataPath, JSON.stringify(filteredTasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};