import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="glass-effect shadow-xl sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">CareerConnect</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-gray-600 hover:text-primary-600 transition-colors">
              Jobs
            </Link>
            <Link to="/companies" className="text-gray-600 hover:text-primary-600 transition-colors">
              Companies
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'company' ? (
                  <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Profile
                    </Link>
                    <Link to="/applications" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Applications
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/jobs" className="text-gray-600 hover:text-primary-600">Jobs</Link>
              <Link to="/companies" className="text-gray-600 hover:text-primary-600">Companies</Link>
              {user ? (
                <>
                  {user.role === 'company' ? (
                    <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">Dashboard</Link>
                  ) : (
                    <>
                      <Link to="/profile" className="text-gray-600 hover:text-primary-600">Profile</Link>
                      <Link to="/applications" className="text-gray-600 hover:text-primary-600">Applications</Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="text-left text-red-600 hover:text-red-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link>
                  <Link to="/register" className="text-primary-600 font-medium">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;