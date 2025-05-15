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
    const [validated, setValidated] = useState(false)
    


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

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
                    <Form noValidate validated={validated} onSubmit={handleSubmit}> {/* noValidate here is telling the browser not to use the built in browser validation b/c we will do manually here   */}
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter task title'
                                required  //must add 'required' here to make checkValidity() to work
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a title
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder = 'Enter task description'
                                required
                            />

                            <Form.Control.Feedback type="invalid">
                                Please enter a description
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
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