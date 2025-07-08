import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DiseaseSelectionPage from './pages/DiseaseSelectionPage';
import DoctorSelectionPage from './pages/DoctorSelectionPage';
import PaymentPage from './pages/PaymentPage';
import AppointmentConfirmationPage from './pages/AppointmentConfirmationPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/select-disease" element={<DiseaseSelectionPage />} />
                <Route path="/select-doctor/:diseaseId" element={<DoctorSelectionPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/appointment-confirmation" element={<AppointmentConfirmationPage />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;