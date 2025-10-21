import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity, Languages } from 'lucide-react';

function Header({ doctorName, onLogout, hospitalName }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'English' ? 'اردو' : 'English');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate('/dashboard')}
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
              <p className="text-sm font-medium text-gray-700">{doctorName}</p>
              <p className="text-xs text-gray-500">{hospitalName || 'Medical Practitioner'}</p>
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

