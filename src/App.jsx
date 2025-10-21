import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DoctorDashboard from './components/DoctorDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import PatientDashboard from './components/PatientDashboard';
import PrescriptionChecker from './components/PrescriptionChecker';
import PatientRecords from './components/PatientRecords';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import QRPrescription from './components/QRPrescription';
import ArchitectureOverview from './components/ArchitectureOverview';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState(''); // doctor, pharmacy, patient
  const [hospitalName, setHospitalName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [currentPrescription, setCurrentPrescription] = useState(null);

  const handleLogin = (name, hospital, type, userId) => {
    setIsAuthenticated(true);
    setUserName(name);
    setUserType(type);
    setHospitalName(hospital);
    if (userId) setPatientId(userId);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserType('');
    setHospitalName('');
    setPatientId('');
    setCurrentPrescription(null);
  };

  // Get appropriate dashboard path based on user type
  const getDashboardPath = () => {
    if (userType === 'doctor') return '/doctor-dashboard';
    if (userType === 'pharmacy') return '/pharmacy-dashboard';
    if (userType === 'patient') return '/patient-dashboard';
    return '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {isAuthenticated && (
          <Header 
            userName={userName}
            userType={userType}
            hospitalName={hospitalName} 
            onLogout={handleLogout} 
          />
        )}
        
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to={getDashboardPath()} /> : 
                  <LandingPage />
              } 
            />
            
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to={getDashboardPath()} /> : 
                  <LoginPage onLogin={handleLogin} />
              } 
            />
            
            {/* Doctor Dashboard & Routes */}
            <Route 
              path="/doctor-dashboard" 
              element={
                isAuthenticated && userType === 'doctor' ? 
                  <DoctorDashboard doctorName={userName} /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/prescription-checker" 
              element={
                isAuthenticated && userType === 'doctor' ? 
                  <PrescriptionChecker 
                    doctorName={userName}
                    onPrescriptionGenerated={setCurrentPrescription}
                  /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/patient-records" 
              element={
                isAuthenticated && userType === 'doctor' ? 
                  <PatientRecords /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                isAuthenticated && userType === 'doctor' ? 
                  <AnalyticsDashboard /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/qr-prescription" 
              element={
                isAuthenticated && currentPrescription && userType === 'doctor' ? 
                  <QRPrescription prescription={currentPrescription} /> : 
                  <Navigate to={getDashboardPath()} />
              } 
            />
            
            <Route 
              path="/architecture" 
              element={
                isAuthenticated ? 
                  <ArchitectureOverview /> : 
                  <Navigate to="/login" />
              } 
            />

            {/* Pharmacy Dashboard */}
            <Route 
              path="/pharmacy-dashboard" 
              element={
                isAuthenticated && userType === 'pharmacy' ? 
                  <PharmacyDashboard pharmacyName={userName} /> : 
                  <Navigate to="/login" />
              } 
            />

            {/* Patient Dashboard */}
            <Route 
              path="/patient-dashboard" 
              element={
                isAuthenticated && userType === 'patient' ? 
                  <PatientDashboard patientName={userName} patientId={patientId} /> : 
                  <Navigate to="/login" />
              } 
            />

            {/* Redirect old /dashboard to appropriate dashboard */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                  <Navigate to={getDashboardPath()} /> : 
                  <Navigate to="/login" />
              } 
            />
          </Routes>
        </div>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;

