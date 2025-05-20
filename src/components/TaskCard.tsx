import React from 'react';
import type { Task } from '../types/task';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleCompleted, deleteTask } = useTaskContext();

  return (
    <Card className="task-card mb-4 shadow-sm">
      <Card.Header className={`task-card-header p-0 ${task.completed ? 'completed' : 'incomplete'}`}>
        <Card.Title className="m-0 text-center bg-success">{task.title}</Card.Title>
      </Card.Header>
      <Card.Body className="task-card-body">
        <div className="task-field">
          <label>Description</label>
          <p>{task.description}</p>
        </div>
        <div className="task-field">
          <label>Date</label>
          <p>{task.date?.toLocaleDateString()}</p>
        </div>
        <div className="task-field status-field">
          <span>Status:</span>
          <span className="status-text">
            {task.completed ? '✅ Completed!' : '❌ Incomplete'}
          </span>
        </div>

        <Form.Check
          type="checkbox"
          label="Mark as Complete"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          className="mb-3"
        />

        <div className="d-flex gap-2">
          <Link to={`/edit/${task.id}`} className="flex-grow-1">
            <Button variant="primary" size="sm" className="w-100">
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            className="w-100"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete this task?'
                )
              ) {
                deleteTask(task.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
