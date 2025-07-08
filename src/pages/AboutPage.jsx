import React from 'react';
import { Heart, Users, Award, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About HealthCare+
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're dedicated to making healthcare accessible, convenient, and reliable for everyone. 
            Our platform connects patients with qualified doctors for seamless medical consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Patient-Centered Care
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We prioritize your health and well-being above all else.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Expert Doctors
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access to qualified and experienced healthcare professionals.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Quality Assurance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Maintaining the highest standards in healthcare delivery.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your medical information is always protected and confidential.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            At HealthCare+, we believe that quality healthcare should be accessible to everyone, 
            regardless of their location or circumstances. Our mission is to bridge the gap between 
            patients and healthcare providers through innovative technology and compassionate care.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We strive to create a platform where patients can easily book appointments, 
            receive expert medical advice, and manage their health journey with confidence and convenience.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Easy Appointment Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book appointments with just a few clicks and get confirmation instantly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Smart Reminders
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Never miss your medication with our intelligent SMS reminder system.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Verified Doctors
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our doctors are verified and certified healthcare professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is available round the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;