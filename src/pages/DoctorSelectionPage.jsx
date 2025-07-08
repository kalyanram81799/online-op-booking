import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Calendar, Award } from 'lucide-react';
import { getDoctorsBySpecialty, getDiseases } from '../utils/api';

const DoctorSelectionPage = () => {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get disease details
        const diseases = await getDiseases();
        const disease = diseases.find(d => d.id === diseaseId);
        setSelectedDisease(disease);

        if (disease) {
          // Get doctors for this specialty
          const doctorsData = await getDoctorsBySpecialty(disease.name);
          setDoctors(doctorsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [diseaseId]);

  const handleDoctorSelect = (doctorId) => {
    navigate(`/payment?doctorId=${doctorId}&diseaseId=${diseaseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (!selectedDisease) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Disease not found</p>
          <button
            onClick={() => navigate('/select-disease')}
            className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Go back to disease selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Select a Doctor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose from our qualified {selectedDisease.name} specialists
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {doctor.experience} experience
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {doctor.rating} rating
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-600 dark:text-gray-300">
                    <span className="text-sm">Consultation Fee</span>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      ₹200
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDoctorSelect(doctor.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No doctors available for {selectedDisease.name} at the moment.
            </p>
            <button
              onClick={() => navigate('/select-disease')}
              className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Try another specialty
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSelectionPage;