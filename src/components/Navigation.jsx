import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Sun, Activity } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();

  const canGoBack = location.pathname !== '/';
  const canGoForward = window.history.length > 1;

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  const handleForward = () => {
    if (canGoForward) {
      navigate(1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">HealthCare+</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBack}
                disabled={!canGoBack}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleForward}
                disabled={!canGoForward}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user.name}
                </span>
                {user.type === 'patient' && (
                  <button
                    onClick={() => navigate('/patient-dashboard')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                )}
                {user.type === 'doctor' && (
                  <button
                    onClick={() => navigate('/doctor-dashboard')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;