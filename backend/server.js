const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check if data file exists, create if not
const dataPath = path.join(__dirname, 'data', 'tasks.json');

async function initializeDataFile() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    try {
      await fs.access(dataPath);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await fs.writeFile(dataPath, JSON.stringify([]));
      console.log('Created tasks.json data file');
    }
  } catch (error) {
    console.error('Error initializing data file:', error);
  }
}

// Routes
app.use('/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

// Start server
app.listen(PORT, async () => {
  await initializeDataFile();
  console.log(`Server running on port ${PORT}`);
});