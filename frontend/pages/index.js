import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskService } from '../utils/apiService';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await TaskService.createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const updatedTask = await TaskService.updateTask(id, updatedData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    await handleUpdateTask(id, { completed });
  };

  return (
    <Layout>
      <div className={styles.container}>
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <div className={styles.grid}>
          <div className={styles.formSection}>
            <TaskForm onAddTask={handleAddTask} />
          </div>
          
          <div className={styles.listSection}>
            {loading ? (
              <div className={styles.loading}>Loading tasks...</div>
            ) : (
              <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}