import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Applications from './pages/Applications';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;