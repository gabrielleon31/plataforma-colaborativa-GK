import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Chat from './Chat';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Tasks from './Tasks';
import Files from './Files';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AdminPanel from './AdminPanel';
import './admin-panel.css';

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/login">Login</Link> |{" "}
      <Link to="/chat">Chat</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/projects">Proyectos</Link> |{" "}
      <Link to="/tasks">Tareas</Link> |{" "}
      <Link to="/files">Archivos</Link> |{" "}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/files" element={<PrivateRoute><Files /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
