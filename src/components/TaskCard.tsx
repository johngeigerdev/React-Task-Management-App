import React from 'react';
import type { Task } from '../types/task';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const {toggleCompleted, deleteTask } = useTaskContext();

    return (
        <Card>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>Description: <br />{task.description}</Card.Text>
                <Card.Text>Date: {task.date?.toLocaleDateString()}</Card.Text>
                <Card.Text>Status: {task.completed ? '✅ Completed!' : '❌ Incomplete' }</Card.Text>
                <Form.Check 
                    type="checkbox"
                    label="Mark as Complete"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id)}
                />
                <Link to={`/edit/${task.id}`}>
                    <button className="btn btn-sm btn-primary mt-2">Edit</button>
                </Link>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this task?')) {
                            deleteTask(task.id)
                        }
                    }}
                >
                Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default TaskCard;