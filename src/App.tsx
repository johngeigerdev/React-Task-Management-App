import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './context/TaskContext';

const App: React.FC = () => {

  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path = '/' element = {<Dashboard />} />
          <Route path = '/create' element={<CreateTask />} />
          <Route path = '/edit/:id' element={<EditTask />} />
        </Routes>
      </Router>
    </TaskProvider>
  )
};

export default App
