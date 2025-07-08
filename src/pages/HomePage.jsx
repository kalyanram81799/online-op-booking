import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Award, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      if (user?.type === 'patient') {
        navigate('/select-disease');
      } else if (user?.type === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/select-disease');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200"
          >
            <source src="https://player.vimeo.com/external/342333493.sd.mp4?s=ac4e3c78b0f9f0c2a8c0a7a4d8d8d8d8&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-900/70 dark:bg-blue-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Health, Our Priority
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Book appointments with trusted doctors, get expert consultation, and take control of your health journey.
          </p>
          <button
            onClick={handleBookAppointment}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HealthCare+
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience seamless healthcare with our comprehensive platform designed for your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book appointments in just a few clicks with our intuitive interface.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Doctors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with qualified and experienced healthcare professionals.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality Care</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive top-notch medical care with personalized treatment plans.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Never miss medication with our intelligent SMS reminder system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Medical Specialties</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;