import React from 'react'

export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className='progress-tracker-card'>
      <div className='progress-info'>
        <span className='progress-label'>Project Completion</span>
        <span className='progress-percentage'>{percentage}%</span>
      </div>

      <div className='progress-bar-container'>
        <div 
          className='progress-fill'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className='progress-status-text'>
        {completedTasks} of {totalTasks} tasks finished
      </p>
    </div>
  )
}