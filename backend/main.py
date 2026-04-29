from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models
import database

# This line creates the tables in MySQL automatically based on models.py
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Enable CORS so React (port 5173) can talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for data validation
class TaskCreate(BaseModel):
    title: str
    priority: str
    category: str
    completed: bool = False
class TaskUpdate(BaseModel):
    title: str
    priority: str
    category: str
    completed: bool
# GET route to see all tasks
@app.get("/tasks")
def get_tasks(db: Session = Depends(database.get_db)):
    return db.query(models.Task).all()

# POST route to create a new task
@app.post("/tasks")
def create_task(task_data: TaskCreate, db: Session = Depends(database.get_db)):
    new_db_task = models.Task(
        title=task_data.title,
        priority=task_data.priority,
        category=task_data.category,
        completed=task_data.completed
    )
    db.add(new_db_task)
    db.commit()
    db.refresh(new_db_task)
    return new_db_task
# updating task status
@app.patch("/tasks/{task_id}")
def update_task_status(task_id: int, db: Session = Depends(database.get_db)):
    # 1. Find the task in the database
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # 2. Toggle the completed status (True to False, or False to True)
    db_task.completed = not db_task.completed
    
    # 3. Save the change
    db.commit()
    db.refresh(db_task)
    
    return db_task

#updating the task title
@app.put("/tasks/{task_id}")
def update_task_title(task_id: int, task_data: TaskUpdate, db: Session = Depends(database.get_db)):    # 1. Find the task
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update the fields
    db_task.title = task_data.title
    db_task.priority = task_data.priority
    db_task.category = task_data.category
    db_task.completed = task_data.completed
    
    db.commit()
    db.refresh(db_task)
    return db_task

# DELETE route needed for deleteTask function in React)
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}