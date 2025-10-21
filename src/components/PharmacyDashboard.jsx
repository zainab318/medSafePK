import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Pill, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  User,
  Clock,
  Plus,
  X,
  ShieldAlert
} from 'lucide-react';
import { patients, drugIntelligence } from '../data/sampleData';

function PharmacyDashboard({ pharmacyName }) {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState('');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [manualPrescription, setManualPrescription] = useState({
    drug: '',
    dosage: '',
    frequency: '',
    duration: ''
  });
  const [safetyCheck, setSafetyCheck] = useState(null);

  const handlePatientSearch = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId.toUpperCase());
    
    if (patient) {
      setCurrentPatient(patient);
      setManualEntry(false);
      setSafetyCheck(null);
    } else {
      setCurrentPatient(null);
      alert(`No patient found with ID: ${patientId}. You can manually enter prescription details.`);
    }
  };

  const handleManualEntryChange = (field, value) => {
    setManualPrescription(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkPrescriptionSafety = () => {
    if (!manualPrescription.drug || !currentPatient) return;

    const drug = manualPrescription.drug;
    const allergies = currentPatient.allergies || [];
    const conditions = currentPatient.conditions || [];
    
    let warnings = [];
    let suggestions = [];

    // Check allergies
    allergies.forEach(allergy => {
      if (drug.toLowerCase().includes(allergy.toLowerCase()) || 
          allergy.toLowerCase().includes(drug.toLowerCase())) {
        warnings.push({
          type: 'critical',
          message: `ALLERGY ALERT: Patient is allergic to ${allergy}!`,
          icon: ShieldAlert
        });
      }
    });

    // Check banned drugs
    if (drugIntelligence.bannedDrugs[drug]) {
      const bannedInfo = drugIntelligence.bannedDrugs[drug];
      warnings.push({
        type: 'critical',
        message: `BANNED DRUG: ${bannedInfo.reason}`,
        suggestion: bannedInfo.alternative,
        icon: ShieldAlert
      });
    }

    // Check high-risk drugs
    if (drugIntelligence.highRiskDrugs[drug]) {
      const riskInfo = drugIntelligence.highRiskDrugs[drug];
      warnings.push({
        type: 'warning',
        message: riskInfo.warning,
        suggestion: riskInfo.monitoring,
        icon: AlertTriangle
      });
    }

    // Check conditions
    conditions.forEach(condition => {
      if (condition === 'Hypertension' && drug.toLowerCase().includes('ibuprofen')) {
        warnings.push({
          type: 'warning',
          message: 'NSAIDs may increase blood pressure in hypertensive patients',
          suggestion: 'Consider Paracetamol as alternative',
          icon: AlertTriangle
        });
      }
      if (condition === 'Type 2 Diabetes' && drug.toLowerCase().includes('prednisone')) {
        warnings.push({
          type: 'warning',
          message: 'Corticosteroids can increase blood glucose levels',
          suggestion: 'Monitor blood sugar closely',
          icon: AlertTriangle
        });
      }
    });

    // Check dosage if available
    if (drugIntelligence.dosageRecommendations[drug]) {
      const dosageInfo = drugIntelligence.dosageRecommendations[drug];
      suggestions.push({
        type: 'info',
        message: dosageInfo.warning || `Recommended dosage: ${dosageInfo.adult.frequency}`,
        icon: FileText
      });
    }

    setSafetyCheck({
      checked: true,
      warnings,
      suggestions,
      safe: warnings.filter(w => w.type === 'critical').length === 0
    });
  };

  const dispenseMedication = () => {
    if (safetyCheck && !safetyCheck.safe) {
      alert('Cannot dispense medication with critical safety warnings!');
      return;
    }
    
    alert('Medication dispensed successfully! Patient has been notified.');
    // Reset form
    setManualPrescription({ drug: '', dosage: '', frequency: '', duration: '' });
    setSafetyCheck(null);
  };

  const statsCards = [
    { title: 'Prescriptions Today', value: '45', icon: FileText, color: 'bg-blue-500' },
    { title: 'Safety Alerts', value: '3', icon: AlertTriangle, color: 'bg-amber-500' },
    { title: 'Dispensed', value: '42', icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Pending', value: '3', icon: Clock, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pharmacy Dashboard 💊
          </h1>
          <p className="text-gray-600">
            Welcome, {pharmacyName}! Verify prescriptions and ensure patient safety.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, idx) => (
            <div key={idx} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Prescription Lookup</h2>
          
          <form onSubmit={handlePatientSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter Patient ID (e.g., P001)"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary px-6">
              Search
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Try these demo IDs:</strong> P001, P002, P003, P004, P005, P006, P007, P008</p>
          </div>
        </div>

        {/* Patient Information & Prescription */}
        {currentPatient && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Patient Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary-600" />
                Patient Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium">{currentPatient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{currentPatient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{currentPatient.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hospital:</span>
                  <span className="font-medium text-sm">{currentPatient.hospital}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Allergies:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentPatient.allergies.map((allergy, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Medical Conditions:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentPatient.conditions.map((condition, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Recent Prescriptions
              </h3>
              
              {currentPatient.recentPrescriptions && currentPatient.recentPrescriptions.length > 0 ? (
                <div className="space-y-3">
                  {currentPatient.recentPrescriptions.map((rx, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{rx.drug}</h4>
                          <p className="text-sm text-gray-600">{rx.dosage}</p>
                          <p className="text-sm text-gray-500">{rx.frequency}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent prescriptions found.</p>
              )}

              <button
                onClick={() => setManualEntry(!manualEntry)}
                className="mt-4 w-full btn-secondary flex items-center justify-center space-x-2"
              >
                {manualEntry ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{manualEntry ? 'Cancel Manual Entry' : 'Add New Prescription'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Manual Entry Form */}
        {manualEntry && currentPatient && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Prescription Entry</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drug Name
                </label>
                <input
                  type="text"
                  value={manualPrescription.drug}
                  onChange={(e) => handleManualEntryChange('drug', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Paracetamol"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  value={manualPrescription.dosage}
                  onChange={(e) => handleManualEntryChange('dosage', e.target.value)}
                  className="input-field"
                  placeholder="e.g., 500mg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <input
                  type="text"
                  value={manualPrescription.frequency}
                  onChange={(e) => handleManualEntryChange('frequency', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Twice daily"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={manualPrescription.duration}
                  onChange={(e) => handleManualEntryChange('duration', e.target.value)}
                  className="input-field"
                  placeholder="e.g., 5 days"
                />
              </div>
            </div>

            <button
              onClick={checkPrescriptionSafety}
              className="btn-primary w-full mb-4"
              disabled={!manualPrescription.drug}
            >
              <ShieldAlert className="w-5 h-5 inline mr-2" />
              Check Safety with AI
            </button>

            {/* Safety Check Results */}
            {safetyCheck && (
              <div className="mt-4 space-y-3">
                {safetyCheck.warnings.map((warning, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-lg flex items-start space-x-3 ${
                      warning.type === 'critical' ? 'bg-red-50 border border-red-200' :
                      'bg-amber-50 border border-amber-200'
                    }`}
                  >
                    <warning.icon className={`w-5 h-5 flex-shrink-0 ${
                      warning.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                    <div>
                      <p className={`font-semibold ${
                        warning.type === 'critical' ? 'text-red-900' : 'text-amber-900'
                      }`}>
                        {warning.message}
                      </p>
                      {warning.suggestion && (
                        <p className="text-sm mt-1 text-gray-700">
                          <strong>Suggestion:</strong> {warning.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {safetyCheck.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3">
                    <suggestion.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">{suggestion.message}</p>
                  </div>
                ))}

                {safetyCheck.safe && safetyCheck.warnings.length === 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="font-semibold text-green-900">
                      ✓ No safety concerns detected. Safe to dispense.
                    </p>
                  </div>
                )}

                <button
                  onClick={dispenseMedication}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    safetyCheck.safe 
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!safetyCheck.safe}
                >
                  Dispense Medication
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!currentPatient && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Patient Selected</h3>
            <p className="text-gray-600">
              Enter a Patient ID above to view their prescriptions and medical history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PharmacyDashboard;

