import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't add empty tasks

    // We send 'title' instead of 'text' to match your FastAPI/MySQL setup
    const newTask={ 
      title: title, 
      priority: priority, 
      category: category, 
      completed: false 
    };
    addTask(newTask);
    // Reset State
    setTitle("");
    setPriority("Low");
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit} className="modern-form">
      <div className="form-main-row">
        <input 
          type="text"
          placeholder="Type your next big task here..."
          className="task-input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
        <button type="submit" className="add-task-btn">
          <span>+</span> Add Task
        </button>
      </div>

      <div className="form-options-row">
        <div className="form-option-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">🔴 High</option>
            <option value="Medium">🟠 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>

        <div className="form-option-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Internship">Internship</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>
    </form>
  );
}