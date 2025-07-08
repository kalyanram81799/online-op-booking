import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, Pill, MessageCircle, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentsByDoctor, addMedicineSchedule, sendSMSReminder, updateAppointmentStatus } from '../utils/api';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    timing: '',
    duration: ''
  });

  // Redirect to login if user is not authenticated or not a doctor
  useEffect(() => {
    if (!user || user.type !== 'doctor') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchAppointments = async () => {
      if (user && user.id) {
        try {
          const appointmentsData = await getAppointmentsByDoctor(user.id);
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

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.timing && newMedicine.duration) {
      setMedicines([...medicines, newMedicine]);
      setNewMedicine({ name: '', timing: '', duration: '' });
    }
  };

  const handlePrescribeMedicines = async (appointmentId, patientPhone) => {
    try {
      // Add each medicine to the database
      for (const medicine of medicines) {
        await addMedicineSchedule({
          appointment_id: appointmentId,
          medicine_name: medicine.name,
          timing: medicine.timing,
          duration: medicine.duration,
          patient_phone: patientPhone
        });

        // Send SMS reminder
        const message = `Reminder: Take your medicine ${medicine.name} at ${medicine.timing} for ${medicine.duration}. Prescribed by ${user.name}`;
        await sendSMSReminder(patientPhone, message);
      }
      
      alert('Prescription sent successfully! SMS reminders have been scheduled for the patient.');
      setMedicines([]);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error prescribing medicines:', error);
      alert('Error sending prescription. Please try again.');
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status } 
            : apt
        )
      );
      
      alert(`Appointment status updated to ${status} successfully!`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status. Please try again.');
    }
  };

  // Show loading or redirect if user is not authenticated
  if (!user || user.type !== 'doctor') {
    return null;
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your appointments and prescriptions
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
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
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
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
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
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Pill className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointments List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Appointments
            </h2>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {appointment.patients?.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : appointment.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>ID: {appointment.appointment_id}</p>
                    <p>Phone: {appointment.patients?.phone}</p>
                    <p>Specialty: {appointment.diseases?.name}</p>
                    <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => setSelectedPatient(appointment.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      Prescribe Medicine
                    </button>
                    <button 
                      onClick={() => handleUpdateAppointmentStatus(appointment.id, 'completed')}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
              
              {appointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No appointments yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Medicine Prescription */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Prescribe Medicine
            </h2>
            
            {selectedPatient ? (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    Prescribing for: {appointments.find(a => a.id === selectedPatient)?.patients?.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter medicine name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timing
                    </label>
                    <select
                      value={newMedicine.timing}
                      onChange={(e) => setNewMedicine({...newMedicine, timing: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select timing</option>
                      <option value="Morning 8:00 AM">Morning 8:00 AM</option>
                      <option value="Afternoon 1:00 PM">Afternoon 1:00 PM</option>
                      <option value="Evening 6:00 PM">Evening 6:00 PM</option>
                      <option value="Night 9:00 PM">Night 9:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration
                    </label>
                    <select
                      value={newMedicine.duration}
                      onChange={(e) => setNewMedicine({...newMedicine, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select duration</option>
                      <option value="3 days">3 days</option>
                      <option value="5 days">5 days</option>
                      <option value="7 days">7 days</option>
                      <option value="10 days">10 days</option>
                      <option value="15 days">15 days</option>
                    </select>
                  </div>

                  <button
                    onClick={handleAddMedicine}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </button>
                </div>

                {medicines.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Prescribed Medicines:
                    </h3>
                    {medicines.map((medicine, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {medicine.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {medicine.timing} for {medicine.duration}
                        </p>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => {
                        const appointment = appointments.find(a => a.id === selectedPatient);
                        handlePrescribeMedicines(appointment.id, appointment.patients?.phone);
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center mt-4"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Prescription & Schedule SMS
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a patient to prescribe medicine
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;