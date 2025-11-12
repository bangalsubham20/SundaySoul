import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import Button from './Button';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Check if user is admin
  const isAdmin = user?.email === 'admin@wravelcommunity.com';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={handleNavClick}>
            <div className="text-2xl font-bold text-orange-500">✈️</div>
            <span className="text-xl font-bold text-gray-800">WravelCommunity</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/trips" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Explore Trips
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Community
            </Link>

            {user ? (
              <>
                {/* Admin Link */}
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-orange-500 transition font-semibold">
                    <FiSettings className="inline mr-1" size={18} />
                    Admin
                  </Link>
                )}

                {/* User Menu */}
                <div className="flex items-center space-x-4 border-l pl-8">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition"
                  >
                    <FiUser size={20} />
                    <span className="font-medium">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition"
                  >
                    <FiLogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-3">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    navigate('/login');
                    handleNavClick();
                  }}
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    navigate('/register');
                    handleNavClick();
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-700 hover:text-orange-500 transition"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t">
            <Link 
              to="/trips" 
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition"
              onClick={handleNavClick}
            >
              Explore Trips
            </Link>
            <Link 
              to="/community" 
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition"
              onClick={handleNavClick}
            >
              Community
            </Link>

            {user ? (
              <>
                {/* Admin Link Mobile */}
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition font-semibold"
                    onClick={handleNavClick}
                  >
                    <FiSettings className="inline mr-2" size={18} />
                    Admin Panel
                  </Link>
                )}

                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition"
                  onClick={handleNavClick}
                >
                  <FiUser className="inline mr-2" size={18} />
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded transition"
                >
                  <FiLogOut className="inline mr-2" size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Button 
                  variant="secondary" 
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    handleNavClick();
                  }}
                >
                  Login
                </Button>
                <Button 
                  fullWidth
                  onClick={() => {
                    navigate('/register');
                    handleNavClick();
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
