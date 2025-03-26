import { useState } from 'react';
import { FaEdit, FaTrash, FaCheckSquare, FaSquare } from 'react-icons/fa';
import styles from '../styles/TaskItem.module.css';

export default function TaskItem({ task, onDelete, onUpdate, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, {
        title: editedTitle,
        description: editedDescription
      });
      setIsEditing(false);
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.editInput}
            placeholder="Task title"
          />
          <textarea 
            value={editedDescription} 
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.editTextarea}
            placeholder="Task description (optional)"
          />
          <div className={styles.editActions}>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.taskContent}>
            <div className={styles.taskHeader}>
              <div className={styles.titleContainer}>
                <button 
                  onClick={handleToggleComplete} 
                  className={styles.completeToggle}
                  aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {task.completed ? <FaCheckSquare /> : <FaSquare />}
                </button>
                <h3 className={styles.taskTitle}>{task.title}</h3>
              </div>
              <div className={styles.taskActions}>
                <button 
                  onClick={handleEdit} 
                  className={styles.editButton}
                  aria-label="Edit task"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDelete(task.id)} 
                  className={styles.deleteButton}
                  aria-label="Delete task"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {task.description && (
              <p className={styles.taskDescription}>{task.description}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}