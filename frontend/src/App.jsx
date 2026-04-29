import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); //Filter by status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login/Signup

  // Fetch tasks only when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskObject) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskObject);
      setTasks([...tasks, response.data]);
    } catch (error) { console.error(error); }
  };

 const updateTask = async (updatedTask) => {
  try {
    // Explicitly mapping fields to ensure no 'id' or extra data is in the body
    const taskData = {
      title: String(updatedTask.title),
      priority: String(updatedTask.priority),
      category: String(updatedTask.category),
      completed: Boolean(updatedTask.completed)
    };

    console.log("Attempting Update with data:", taskData);

    const response = await axios.put(`${API_URL}/tasks/${updatedTask.id}`, taskData);

    setTasks(tasks.map((t) => (t.id === updatedTask.id ? response.data : t)));
    console.log("Update Success!");
  } catch (error) {
    // This log is the most important part for debugging
    console.error("422 Error Details:", error.response?.data?.detail);
  }
};
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) { console.error(error); }
  };

  // Improved Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = (task.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
    const matchesStatus = statusFilter === "All" || 
                         (statusFilter === "Completed" ? task.completed : !task.completed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // --- AUTH UI ---
  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="auth-subtitle">Tajinder's Task Management System</p>
          <div className="auth-form">
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Password" className="auth-input" />
            <button className="auth-btn" onClick={() => setIsLoggedIn(true)}>
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </div>
          <button className="text-toggle" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Login" : "New here? Create an account"}
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo sidebar-header-row">Taj's Task<span>Manager</span></div>
        <nav className="sidebar-nav">
          <button className={statusFilter === "All" ? "active" : ""} onClick={() => setStatusFilter("All")}>Overview</button>
          <button className={statusFilter === "Pending" ? "active" : ""} onClick={() => setStatusFilter("Pending")}>Ongoing</button>
          <button className={statusFilter === "Completed" ? "active" : ""} onClick={() => setStatusFilter("Completed")}>Completed</button>
        </nav>
        <button className="logout-btn sidebar-header-row" onClick={() => setIsLoggedIn(false)}>Log Out</button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p className="date-text">{new Date().toLocaleDateString()}</p>
          </div>
          <ProgressTracker tasks={tasks} />
        </header>
        {/* Section : Input Form (Now it will work) */}
          <TaskForm addTask={addTask} />
          {/* Section : Filters (Only Search and Category) */}
        <section className="controls-grid">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="dashboard-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="dashboard-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Internship">Internship</option>
            <option value="Personal">Personal</option>
          </select>
        </section>

        

        {/* Section : Task List Area */}
        <div className="task-scroll-area">
          <TaskList 
            tasks={filteredTasks}
            updateTask={updateTask}
            deleteTask={deleteTask} 
          />
        </div>
      </main>
    </div>
  );
}