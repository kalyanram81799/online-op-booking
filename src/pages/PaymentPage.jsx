import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { getDoctorsBySpecialty, getDiseases, processPayment, bookAppointment, generateAppointmentId } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const doctorId = searchParams.get('doctorId');
  const diseaseId = searchParams.get('diseaseId');
  
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [disease, setDisease] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get diseases
        const diseases = await getDiseases();
        const selectedDisease = diseases.find(d => d.id === diseaseId);
        setDisease(selectedDisease);

        if (selectedDisease) {
          // Get doctors for this specialty
          const doctors = await getDoctorsBySpecialty(selectedDisease.name);
          const selectedDoctor = doctors.find(d => d.id === doctorId);
          setDoctor(selectedDoctor);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [doctorId, diseaseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user || !doctor || !disease) return;

    setLoading(true);
    try {
      // Process payment
      const paymentResult = await processPayment(200, paymentData);
      
      if (paymentResult.success) {
        // Generate appointment ID
        const appointmentId = generateAppointmentId(user.phone);
        
        // Book appointment
        const bookingResult = await bookAppointment({
          appointment_id: appointmentId,
          patient_id: user.id,
          doctor_id: doctor.id,
          disease_id: disease.id,
          amount: 200,
          transaction_id: paymentResult.transactionId,
          status: 'pending',
          appointment_date: new Date().toISOString(),
        });

        if (bookingResult.success) {
          // Store appointment data in localStorage for confirmation page
          localStorage.setItem('lastAppointment', JSON.stringify({
            appointmentId,
            doctor: doctor.name,
            disease: disease.name,
            amount: 200,
            date: new Date().toLocaleDateString(),
          }));

          navigate('/appointment-confirmation');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!doctor || !disease) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Invalid appointment details
          </p>
          <button
            onClick={() => navigate('/select-disease')}
            className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Payment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Secure your appointment with a quick payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointment Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Appointment Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Specialty:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {disease.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Patient:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {user?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 dark:text-gray-300">
                    Consultation Fee:
                  </span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ₹200
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-blue-800 dark:text-blue-300 text-sm">
                    Your appointment will be confirmed after payment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Lock className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Secure Payment
              </h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter cardholder name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="MM/YY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total Amount:</span>
                  <span className="text-green-600 dark:text-green-400">₹200</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg font-semibold"
              >
                {loading ? 'Processing Payment...' : 'Pay ₹200'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <Lock className="h-4 w-4 inline mr-1" />
              Your payment information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;