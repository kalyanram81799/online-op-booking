import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">HealthCare+</span>
            </div>
            <p className="text-gray-400">
              Your trusted healthcare partner, providing quality medical services and convenient appointment booking.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/help')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Help & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Online Consultation</li>
              <li>Appointment Booking</li>
              <li>Medicine Reminders</li>
              <li>Health Records</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@healthcareplus.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Health Street, Medical City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HealthCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;