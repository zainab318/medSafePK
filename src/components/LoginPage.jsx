import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, User, ArrowRight, Building2 } from 'lucide-react';
import { pakistaniHospitals } from '../data/sampleData';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospital, setHospital] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate login - extract name from email or use default
    const name = email.includes('@') ? 
      `Dr. ${email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)}` : 
      'Dr. Ayesha';
    
    const selectedHospital = hospital || pakistaniHospitals[0];
    
    onLogin(name, selectedHospital);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50">
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

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Doctor Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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
                  placeholder="doctor@medsafepk.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
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

            <div>
              <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                Hospital / Medical Facility
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-base"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Request Access
              </a>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>Demo:</strong> Use any email/password to login
          </p>
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

