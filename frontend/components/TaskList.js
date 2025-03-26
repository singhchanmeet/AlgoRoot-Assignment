import TaskItem from './TaskItem';
import styles from '../styles/TaskList.module.css';

export default function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleComplete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      <h2 className={styles.listTitle}>Your Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}