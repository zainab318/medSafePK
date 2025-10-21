import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DoctorDashboard from './components/DoctorDashboard';
import PrescriptionChecker from './components/PrescriptionChecker';
import PatientRecords from './components/PatientRecords';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import QRPrescription from './components/QRPrescription';
import ArchitectureOverview from './components/ArchitectureOverview';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [currentPrescription, setCurrentPrescription] = useState(null);

  const handleLogin = (name, hospital) => {
    setIsAuthenticated(true);
    setDoctorName(name);
    setHospitalName(hospital);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDoctorName('');
    setHospitalName('');
    setCurrentPrescription(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {isAuthenticated && <Header doctorName={doctorName} hospitalName={hospitalName} onLogout={handleLogout} />}
        
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" /> : 
                  <LandingPage />
              } 
            />
            
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" /> : 
                  <LoginPage onLogin={handleLogin} />
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                  <DoctorDashboard doctorName={doctorName} /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/prescription-checker" 
              element={
                isAuthenticated ? 
                  <PrescriptionChecker 
                    doctorName={doctorName}
                    onPrescriptionGenerated={setCurrentPrescription}
                  /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/patient-records" 
              element={
                isAuthenticated ? 
                  <PatientRecords /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                isAuthenticated ? 
                  <AnalyticsDashboard /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/qr-prescription" 
              element={
                isAuthenticated && currentPrescription ? 
                  <QRPrescription prescription={currentPrescription} /> : 
                  <Navigate to="/dashboard" />
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
          </Routes>
        </div>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;

