import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import ChatRoom from './pages/ChatRoom';
import CreateRoom from './pages/CreateRoom';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
import PrivateRoute from './components/privateroute';
import './pages/Chat.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ✅ Protected routes */}
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <Rooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/rooms/:id"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
        <Route
          path="/rooms/create"
          element={
            <PrivateRoute>
              <CreateRoom />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
