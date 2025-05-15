import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types/task'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';




const Dashboard: React.FC = () => {
    const { tasks } = useTaskContext();
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()



    return (
        <Container className='bg-secondary'>
            <Row>
                <Col>
                    <h1>Task Dashboard</h1>
                    {isLoading ? (
                        <p className="text-light">Loading user...</p>
                    ) : isAuthenticated ? (
                        <>
                          <p className="text-light">Welcome, {user?.name}!</p>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              logout({ logoutParams: { returnTo: window.location.origin } })
                            }
                            className="mb-3"
                          >
                            Logout
                          </Button>
                        </>
                    ) : (
                        <Button
                          variant="primary"
                          onClick={() => loginWithRedirect()}
                          className="mb-3"
                        >
                          Login
                        </Button>
                    )}
                    {/* if user is not logged in, display this message */}
                    {!isAuthenticated && !isLoading && (
                        <p className="text-light mt-3">Please log in to view your tasks.</p>
                    )}

                    {/* if user is authenticated, show the create new task button  */}
                    {isAuthenticated && (
                        <Link to='/create'>
                            <Button variant='light' className='mb-3'>+ Create New Task</Button>
                        </Link>
                    )}

                    {/* only show tasks if user is logged in  */}
                    {isAuthenticated && tasks.map((task: Task) => (
                        <TaskCard key={task.id} task={task}/>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;