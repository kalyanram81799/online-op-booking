import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, User, CreditCard, Home, MessageCircle } from 'lucide-react';

const AppointmentConfirmationPage = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAppointment = localStorage.getItem('lastAppointment');
    if (savedAppointment) {
      setAppointmentData(JSON.parse(savedAppointment));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Loading appointment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your appointment has been successfully booked
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Appointment ID
            </h2>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {appointmentData.appointmentId}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Please save this ID for your records
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Doctor</span>
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {appointmentData.doctor}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Specialty</span>
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {appointmentData.disease}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Date</span>
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {appointmentData.date}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Amount Paid</span>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                ₹{appointmentData.amount}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-8">
          <div className="flex items-start">
            <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What's Next?
              </h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li>• The doctor will review your appointment request</li>
                <li>• You'll receive a confirmation call within 24 hours</li>
                <li>• Medicine reminders will be sent via SMS after consultation</li>
                <li>• Keep your appointment ID handy for reference</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmationPage;