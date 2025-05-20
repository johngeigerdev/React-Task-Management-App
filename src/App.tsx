import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './context/TaskContext';
import RequireAuth from './components/RequireAuth';
import './index.css';


const App: React.FC = () => {

  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path = '/' element = {<Dashboard />} />
          <Route path = '/create' element={
            //requires auth to reach the createtask page
            <RequireAuth> 
              <CreateTask />
            </RequireAuth>
          } />
          <Route path = '/edit/:id' element={
            //requires auth to reach edit task page
            <RequireAuth>  
            <EditTask />
            </RequireAuth>
            } />
        </Routes>
      </Router>
    </TaskProvider>
  )
};

export default App
