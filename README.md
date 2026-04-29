# taj-task-management-web-app
An Internship project - Task Management Application
## Key Features
**User Authentication** 
  Secure Sign-up and Login functionality using JWT.

**Complete CRUD Operations**
  Create, Read, Update, and Delete tasks seamlessly.

**Dynamic Progress Tracking**
  A "Project Completion" percentage that updates in real-time as tasks are completed.

**Task Categorization**
  Organize tasks into:  * General   * Work    * Internship    * Personal

**Priority Management**
  Assign priority levels:   * High    * Medium    * Low  

  **Responsive Design**
  Fully optimized for:    * Mobile (iPhone / Android)    * Tablet (iPad)    * Desktop

### Tech Stack & Dependencies

### Frontend

* **React.js + vate** – Component-based UI
* **CSS** – Modern responsive styling
* **Axios** – API requests

### Backend

Framework: FastAPI (A modern, fast web framework for building APIs with Python 3.8+ based on standard Python type hints).
Asynchronous Support: Uses uvicorn as the ASGI server to handle lightning-fast requests.
Database: MySQL (Managed via XAMPP for the local server and MySQL Workbench for visual data management).
ORM (Object Relational Mapper): SQLAlchemy (The most popular SQL toolkit for Python to translate Python classes into MySQL tables).

## 🚀 Local Setup Instructions

# 1. Prerequisites
Ensure you have the following installed:

- Python 3.8+
- Node.js & npm
- XAMPP (with MySQL and Apache)
- MySQL Workbench (optional, for visual management)

  # 2. Database Configuration (XAMPP & Workbench)
Before running the code, set up your local MySQL environment:

- Start XAMPP: Open the XAMPP Control Panel and start the Apache and MySQL modules.
- Create Schema: use the given databse for schema

# 3. Backend Setup (FastAPI)

- Navigate to your backend directory to set up the Python environment:
- Create a Virtual Environment: python -m venv venv
                               source venv/bin/activate  # On Windows: venv\Scripts\activate
- Install Dependencies: pip install fastapi uvicorn sqlalchemy pymysql cryptography passlib[bcrypt] python-jose[cryptography]
- Activate the environment: conda activate task_app
  - Run the Server: uvicorn main:app --reload
          The backend will be live at [http://127.0.0.1:8000](http://127.0.0.1:8000).

# 4. Frontend Setup (React + Vite)
 
- Navigate to your frontend directory to start the UI:
- Install Packages: cd frontend
                    npm install
  - Dependencies Included: 
                    axios: For handling API requests to FastAPI.
                     react-router-dom: For navigation.
- Run the Application: npm run dev
                  The frontend will be live at http://localhost:5173 (default for Vite).

 # 5. Troubleshooting
 
- CORS Issues: Ensure your FastAPI main.py has CORSMiddleware configured to allow requests from your React port.
- MySQL Connection: If you have a password on your XAMPP root user, update the DATABASE_URL string to:                                                            mysql+pymysql://root:YOUR_PASSWORD@localhost/task_manager_db.
  ## 📺 Video Demo
You can watch the full walkthrough of the application here:
[Click to watch the Video Demo] https://drive.google.com/file/d/1gVWzi-2xxNMQW679orcNUm97PI-kv6TP/view?usp=sharing


