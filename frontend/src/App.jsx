import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import SingUp from './pages/Auth/SingUp';
import Dashboard from './pages/Admin/Dashboard';
import ManagerTasks from './pages/Admin/ManagerTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManagerUsers from './pages/Admin/ManagerUsers';
import MyTask from './pages/User/MyTask';
import UserDashboard from './pages/User/UserDashboard';
import ViewTaskDetail from './pages/User/ViewTaskDetail';

import PrivateRoute from './router/PrivateRouter';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Router */}
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />

          {/* Admin Router */}
          <Route element={<PrivateRoute allowedRole={["admin"]}/>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/task" element={<ManagerTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManagerUsers />} />
          </Route>

          {/* User Router */}
          <Route element={<PrivateRoute allowedRole={["admin"]}/>}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/my-task" element={<MyTask />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetail />} />

          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App