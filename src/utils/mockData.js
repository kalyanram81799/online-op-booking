export const diseases = [
  { id: '1', name: 'Cardiology', description: 'Heart and cardiovascular conditions' },
  { id: '2', name: 'Dermatology', description: 'Skin, hair, and nail disorders' },
  { id: '3', name: 'Orthopedics', description: 'Bone and joint conditions' },
  { id: '4', name: 'Pediatrics', description: 'Children\'s health and development' },
  { id: '5', name: 'Ophthalmology', description: 'Eye and vision care' },
  { id: '6', name: 'ENT', description: 'Ear, nose, and throat conditions' },
  { id: '7', name: 'Gastroenterology', description: 'Digestive system disorders' },
  { id: '8', name: 'Neurology', description: 'Brain and nervous system conditions' },
];

export const doctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: '15 years', rating: 4.8, image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiology', experience: '12 years', rating: 4.9, image: 'https://images.pexels.com/photos/6234516/pexels-photo-6234516.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', experience: '10 years', rating: 4.7, image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '4', name: 'Dr. James Wilson', specialty: 'Dermatology', experience: '8 years', rating: 4.6, image: 'https://images.pexels.com/photos/5340280/pexels-photo-5340280.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '5', name: 'Dr. Lisa Thompson', specialty: 'Orthopedics', experience: '18 years', rating: 4.9, image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '6', name: 'Dr. Robert Kim', specialty: 'Orthopedics', experience: '14 years', rating: 4.8, image: 'https://images.pexels.com/photos/5340281/pexels-photo-5340281.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const generateAppointmentId = (phoneNumber) => {
  const lastFourDigits = phoneNumber.slice(-4);
  const timestamp = Date.now().toString().slice(-6);
  return `${lastFourDigits}-APPT-${timestamp}`;
};

export const mockPatients = [
  { id: '1', name: 'John Doe', phone: '9876543210', password: 'password123' },
  { id: '2', name: 'Jane Smith', phone: '9876543211', password: 'password123' },
];

export const mockDoctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', email: 'sarah@hospital.com', password: 'doctor123' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiology', email: 'michael@hospital.com', password: 'doctor123' },
];