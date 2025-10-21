import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, User, ArrowRight, Building2, Stethoscope, Pill, Heart } from 'lucide-react';
import { pakistaniHospitals, popularPharmacies } from '../data/sampleData';

function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState('doctor'); // doctor, pharmacy, patient
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [customPharmacyName, setCustomPharmacyName] = useState('');
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Patient ID for patient signup
    if (userType === 'patient' && isSignup && !patientId.trim()) {
      alert('Patient ID is required for patient signup.');
      return;
    }
    
    // Validate custom pharmacy name if "Other - Add Manually" is selected
    if (userType === 'pharmacy' && pharmacy === 'Other - Add Manually' && !customPharmacyName.trim()) {
      alert('Please enter your pharmacy name.');
      return;
    }
    
    let displayName = '';
    if (isSignup) {
      displayName = name;
    } else {
      // For login, extract name from email
      const emailPrefix = email.split('@')[0];
      displayName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    
    // Add prefix based on user type
    if (userType === 'doctor') {
      displayName = displayName.startsWith('Dr.') ? displayName : `Dr. ${displayName}`;
    }
    
    // Determine the facility name based on user type
    let facilityName = '';
    if (userType === 'doctor') {
      facilityName = hospital || pakistaniHospitals[0];
    } else if (userType === 'pharmacy') {
      // Use custom name if "Other" is selected, otherwise use selected pharmacy
      facilityName = pharmacy === 'Other - Add Manually' ? customPharmacyName : (pharmacy || popularPharmacies[0]);
    } else {
      facilityName = '';
    }
    
    // For patients: use provided Patient ID (required for signup, optional for login)
    const userId = userType === 'patient' ? (patientId || `P${Math.floor(Math.random() * 1000)}`) : null;
    
    onLogin(displayName, facilityName, userType, userId);
    
    // Route to appropriate dashboard
    if (userType === 'doctor') {
      navigate('/doctor-dashboard');
    } else if (userType === 'pharmacy') {
      navigate('/pharmacy-dashboard');
    } else {
      navigate('/patient-dashboard');
    }
  };

  const userTypes = [
    { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'primary' },
    { value: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'blue' },
    { value: 'patient', label: 'Patient', icon: Heart, color: 'green' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50 py-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-md w-full mx-4 relative">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl shadow-lg mb-4">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-navy-900 mb-2">
            MedSafe<span className="text-primary-600">PK</span>
          </h1>
          <p className="text-lg text-gray-600">AI for Safer Prescriptions</p>
          <p className="text-sm text-gray-500 mt-2">Protecting patients through intelligent prescription verification</p>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h2>
          
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setUserType(type.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    userType === type.value
                      ? `border-${type.color}-600 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mb-1 ${
                    userType === type.value ? `text-${type.color}-600` : 'text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    userType === type.value ? `text-${type.color}-700` : 'text-gray-600'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Patient ID - Only for Patient Signup (Required) */}
            {userType === 'patient' && isSignup && (
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="patientId"
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="input-field pl-10"
                    placeholder="e.g., P001, P123"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your unique Patient ID provided by your healthcare facility
                </p>
              </div>
            )}

            {/* Full Name - Only for Signup */}
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            {/* Email - Always shown */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder={`${userType}@medsafepk.com`}
                  required
                />
              </div>
            </div>

            {/* Password - Always shown */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Hospital - Only for Doctors */}
            {userType === 'doctor' && (
              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital / Medical Facility <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="input-field pl-10"
                    required
                  >
                    <option value="">Select your hospital</option>
                    {pakistaniHospitals.map((hosp, index) => (
                      <option key={index} value={hosp}>{hosp}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Pharmacy - Only for Pharmacy Users */}
            {userType === 'pharmacy' && (
              <>
                <div>
                  <label htmlFor="pharmacy" className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Pill className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="pharmacy"
                      value={pharmacy}
                      onChange={(e) => {
                        setPharmacy(e.target.value);
                        // Clear custom name if switching away from "Other"
                        if (e.target.value !== 'Other - Add Manually') {
                          setCustomPharmacyName('');
                        }
                      }}
                      className="input-field pl-10"
                      required
                    >
                      <option value="">Select your pharmacy</option>
                      {popularPharmacies.map((pharm, index) => (
                        <option key={index} value={pharm}>{pharm}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Pharmacy Name Input - Only shown when "Other - Add Manually" is selected */}
                {pharmacy === 'Other - Add Manually' && (
                  <div>
                    <label htmlFor="customPharmacyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Pharmacy Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="customPharmacyName"
                        type="text"
                        value={customPharmacyName}
                        onChange={(e) => setCustomPharmacyName(e.target.value)}
                        className="input-field pl-10"
                        placeholder="Enter your pharmacy name"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Please enter the full name of your pharmacy
                    </p>
                  </div>
                )}
              </>
            )}

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-base"
            >
              <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center mb-2">
            <strong>Demo:</strong> Select your role and use any email/password to {isSignup ? 'signup' : 'login'}
          </p>
          {isSignup && userType === 'patient' && (
            <p className="text-xs text-blue-700 text-center">
              <strong>Patient Signup:</strong> Use Patient ID from P001-P008 or create your own
            </p>
          )}
          {isSignup && userType === 'pharmacy' && (
            <p className="text-xs text-blue-700 text-center">
              <strong>Pharmacy Signup:</strong> Select from popular pharmacies or add your own
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 MedSafePK. All rights reserved.</p>
          <p className="mt-1">Powered by AI • Trusted by Healthcare Professionals</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

