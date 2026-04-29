import React from 'react'

export default function TaskList({ tasks, updateTask, deleteTask }) {
  
  // Toggles the completion status in MySQL
  const toggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  // Handles updating the title text via a simple prompt
  const handleEditTitle = (task) => {
    const newTitle = prompt("Update task title:", task.title);
    if (newTitle && newTitle !== task.title) {
      updateTask({ ...task, title: newTitle });
    }
  };

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks to show.</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={`task-row ${task.completed ? 'is-completed' : ''}`}>
            <div className="task-left">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleComplete(task)} 
                className="task-checkbox"
              />
              <div className="task-info">
                <h3 className="task-title-text">{task.title}</h3>
                <span className="task-meta">{task.category} • {task.priority}</span>
              </div>
            </div>

            <div className="task-actions">
              <button className="list-edit-btn" onClick={() => handleEditTitle(task)}>Edit</button>
              <button className="list-delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              <div className={`priority-line ${task.priority?.toLowerCase()}`}></div>
            </div>
          </div>
        ))
      )}
    </div>
  )
  
}