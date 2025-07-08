import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, AlertCircle, XCircle, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentsByPatient } from '../utils/api';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Redirect to login if user is not authenticated or not a patient
  useEffect(() => {
    if (!user || user.type !== 'patient') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user && user.id) {
        try {
          const appointmentsData = await getAppointmentsByPatient(user.id);
          setAppointments(appointmentsData);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  const refreshAppointments = async () => {
    if (!user || !user.id) return;
    
    setRefreshing(true);
    try {
      const appointmentsData = await getAppointmentsByPatient(user.id);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error refreshing appointments:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'confirmed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Show loading or redirect if user is not authenticated
  if (!user || user.type !== 'patient') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your appointments and view your medical history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointments.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Total Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Confirmed</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointments.filter(a => a.status === 'completed').length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Appointments
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={refreshAppointments}
                  disabled={refreshing}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center disabled:opacity-50"
                >
                  <Clock className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                <button
                  onClick={() => navigate('/select-disease')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Book New
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getStatusIcon(appointment.status)}
                      <h3 className="font-semibold text-gray-900 dark:text-white ml-2">
                        {appointment.doctors?.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div>
                      <p><span className="font-medium">Appointment ID:</span> {appointment.appointment_id}</p>
                      <p><span className="font-medium">Specialty:</span> {appointment.diseases?.name}</p>
                      <p><span className="font-medium">Amount:</span> ₹{appointment.amount}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Date:</span> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                      <p><span className="font-medium">Time:</span> {new Date(appointment.appointment_date).toLocaleTimeString()}</p>
                      {appointment.transaction_id && (
                        <p><span className="font-medium">Transaction:</span> {appointment.transaction_id}</p>
                      )}
                    </div>
                  </div>

                  {appointment.status === 'completed' && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-green-800 dark:text-green-300 text-sm font-medium">
                          ✅ Consultation completed successfully by Dr. {appointment.doctors?.name}
                        </span>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-xs mt-1">
                        Your treatment is complete. Check for any prescribed medications via SMS.
                      </p>
                    </div>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="text-blue-800 dark:text-blue-300 text-sm font-medium">
                          Appointment confirmed - awaiting consultation
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {appointment.status === 'pending' && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                        <span className="text-yellow-800 dark:text-yellow-300 text-sm font-medium">
                          Waiting for doctor confirmation
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {appointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    No appointments yet
                  </p>
                  <button
                    onClick={() => navigate('/select-disease')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/select-disease')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Book New Appointment
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Help & Support
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center text-sm">
                    {getStatusIcon(appointment.status)}
                    <div className="ml-3">
                      <p className="text-gray-900 dark:text-white">
                        {appointment.diseases?.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {new Date(appointment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No recent activity
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;