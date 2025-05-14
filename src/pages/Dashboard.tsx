import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types/task'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Dashboard: React.FC = () => {
 const { tasks } = useTaskContext();

    return (
        <Container className='bg-secondary'>
            <Row>
                <Col>
                    <h1>Task Dashboard</h1>
                    <Link to='/create'>
                        <Button variant='light' className='mb-3'>+ Create New Task</Button>
                    </Link>
                        {tasks.map((task: Task) => (
                            <TaskCard key={task.id} task={task}/>
                        ))}
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;