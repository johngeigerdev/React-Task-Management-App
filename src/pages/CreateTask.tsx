import React, { useState } from 'react';
import type { Task } from '../types/task';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const CreateTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate]= useState('');
    const { addTask } = useTaskContext();
    const navigate = useNavigate();
    


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        const newTask: Task = {
          id: Date.now(),
          title,
          description,
          date: new Date(date),
          completed: false
        };
      
        console.log(newTask);
        addTask(newTask);
        navigate('/'); //redirect back to dashboard
      };

    return (
        <Container className="py-4">
            <Row>
                <Col>
                    <h2>Create a New Task</h2>
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
                            Create Task
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateTask;