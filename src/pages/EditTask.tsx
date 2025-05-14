import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { Container, Form, Button } from 'react-bootstrap';
import type { Task } from '../types/task';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskContext();
  const taskToEdit = tasks.find((t) => t.id === Number(id));


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDate(taskToEdit.date?.toISOString().split('T')[0] || '');
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ❌ Right now this is still using addTask
    const updatedTask: Task = {
      id: Number(id),
      title,
      description,
      date: new Date(date),
      completed: taskToEdit?.completed || false
    };

    // 🧠 We'll replace this with updateTask()
    updateTask(updatedTask);
    navigate('/');
  };

  if (!taskToEdit) return <p>Task not found</p>;

  return (
    <Container className="py-4">
      <h2>Edit Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter task title'
            />
            </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder = 'Enter task description'
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Update Task
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditTask;