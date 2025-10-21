import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity, Languages, Stethoscope, Pill, Heart } from 'lucide-react';

function Header({ userName, userType, onLogout, hospitalName }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'English' ? 'اردو' : 'English');
  };

  const getDashboardPath = () => {
    if (userType === 'doctor') return '/doctor-dashboard';
    if (userType === 'pharmacy') return '/pharmacy-dashboard';
    if (userType === 'patient') return '/patient-dashboard';
    return '/';
  };

  const getUserTypeDisplay = () => {
    if (userType === 'doctor') return { label: 'Doctor', icon: Stethoscope, color: 'primary' };
    if (userType === 'pharmacy') return { label: 'Pharmacy', icon: Pill, color: 'blue' };
    if (userType === 'patient') return { label: 'Patient', icon: Heart, color: 'green' };
    return { label: 'User', icon: Activity, color: 'gray' };
  };

  const userTypeInfo = getUserTypeDisplay();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate(getDashboardPath())}
          >
            <div className="bg-primary-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">MedSafe<span className="text-primary-600">PK</span></h1>
              <p className="text-xs text-gray-500">{language === 'English' ? 'AI for Safer Prescriptions' : 'محفوظ نسخوں کے لیے AI'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors"
              title="Switch Language"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'English' ? 'اردو' : 'English'}</span>
            </button>

            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <span className={`px-2 py-0.5 bg-${userTypeInfo.color}-100 text-${userTypeInfo.color}-700 rounded-full text-xs font-medium flex items-center space-x-1`}>
                  <userTypeInfo.icon className="w-3 h-3" />
                  <span>{userTypeInfo.label}</span>
                </span>
              </div>
              <p className="text-xs text-gray-500">{hospitalName || (userType === 'patient' ? 'Patient Account' : 'Medical Practitioner')}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'English' ? 'Logout' : 'لاگ آؤٹ'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

