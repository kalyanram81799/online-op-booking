import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { getDiseases } from '../utils/api';

const DiseaseSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Medical specialty images mapping with specific relevant images
  const specialtyImages = {
    'Cardiology': 'https://images.pexels.com/photos/433267/pexels-photo-433267.jpeg?auto=compress&cs=tinysrgb&w=400', // Heart/cardiac image
    'Dermatology': 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=400', // Skin care image
    'Orthopedics': 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=400', // Bone/joint X-ray image
    'Pediatrics': 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400', // Children healthcare image
    'Ophthalmology': 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=400', // Eye examination image
    'ENT': 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400', // ENT examination image
    'Gastroenterology': 'https://images.pexels.com/photos/7659726/pexels-photo-7659726.jpeg?auto=compress&cs=tinysrgb&w=400', // Stomach/digestive system image
    'Neurology': 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400' // Brain/neuron image
  };

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const diseasesData = await getDiseases();
        setDiseases(diseasesData);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDiseaseSelect = (diseaseId) => {
    navigate(`/select-doctor/${diseaseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading specialties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Select Medical Specialty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the medical specialty that best matches your health concern
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for medical specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              onClick={() => handleDiseaseSelect(disease.id)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={specialtyImages[disease.name] || 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={`${disease.name} medical specialty`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                    {disease.name}
                  </h3>
                </div>
                {/* Specialty Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {disease.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    View Specialists
                  </span>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                    <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No specialties found
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              If you're unsure about which specialty to choose, our general practitioners can help guide you to the right specialist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseSelectionPage;