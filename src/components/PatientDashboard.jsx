import React, { useState } from 'react';
import { 
  Heart, 
  Pill, 
  Clock, 
  Upload, 
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Bell,
  Camera,
  Sparkles
} from 'lucide-react';
import { patients } from '../data/sampleData';

function PatientDashboard({ patientName, patientId }) {
  const [searchId, setSearchId] = useState(patientId || '');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePatientSearch = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === searchId.toUpperCase());
    
    if (patient) {
      setCurrentPatient(patient);
    } else {
      alert(`No patient found with ID: ${searchId}`);
      setCurrentPatient(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        // Simulate OCR processing
        simulateOCR();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCR = () => {
    setIsProcessing(true);
    
    // Simulate OCR/NLP processing delay
    setTimeout(() => {
      // Mock extracted prescription data
      const mockExtractedData = {
        medications: [
          {
            drug: 'Paracetamol',
            dosage: '500mg',
            frequency: 'Every 6 hours',
            duration: '5 days',
            timing: 'After meals',
            instructions: 'Take with plenty of water'
          },
          {
            drug: 'Amoxicillin',
            dosage: '250mg',
            frequency: 'Three times daily',
            duration: '7 days',
            timing: 'Before meals',
            instructions: 'Complete the full course'
          },
          {
            drug: 'Omeprazole',
            dosage: '20mg',
            frequency: 'Once daily',
            duration: '14 days',
            timing: 'Morning before breakfast',
            instructions: 'Take on empty stomach'
          }
        ],
        doctorName: 'Dr. Ahmad Khan',
        date: new Date().toLocaleDateString(),
        confidence: 95
      };
      
      setExtractedData(mockExtractedData);
      setIsProcessing(false);
    }, 2000);
  };

  const getMedicineSchedule = () => {
    if (!currentPatient || !currentPatient.recentPrescriptions) return [];
    
    return currentPatient.recentPrescriptions.map(rx => ({
      ...rx,
      times: generateMedicineTimes(rx.frequency)
    }));
  };

  const generateMedicineTimes = (frequency) => {
    if (frequency.toLowerCase().includes('once')) {
      return ['9:00 AM'];
    } else if (frequency.toLowerCase().includes('twice')) {
      return ['9:00 AM', '9:00 PM'];
    } else if (frequency.toLowerCase().includes('three')) {
      return ['8:00 AM', '2:00 PM', '8:00 PM'];
    } else if (frequency.toLowerCase().includes('as needed')) {
      return ['As needed'];
    }
    return ['See prescription'];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Dashboard ❤️
          </h1>
          <p className="text-gray-600">
            Welcome, {patientName}! Manage your medications and stay healthy.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Patient ID Search */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              View My Medications
            </h2>
            
            <form onSubmit={handlePatientSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="input-field"
                  placeholder="Enter your Patient ID (e.g., P001)"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                View My Medicines
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p><strong>Demo IDs:</strong> P001, P002, P003, P004, P005, P006, P007, P008</p>
            </div>
          </div>

          {/* Prescription Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary-600" />
              Upload Prescription
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <label htmlFor="prescription-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload prescription
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                  <input
                    id="prescription-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedImage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">
                    Prescription uploaded successfully!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OCR Processing */}
        {isProcessing && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
            <Sparkles className="w-12 h-12 text-primary-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI is reading your prescription...
            </h3>
            <p className="text-gray-600">
              Using OCR and NLP to extract medication details
            </p>
            <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        )}

        {/* Extracted Prescription Data */}
        {extractedData && !isProcessing && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-primary-600" />
                AI-Extracted Prescription
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {extractedData.confidence}% Confidence
              </span>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Prescribed by:</span>
                  <p className="font-medium">{extractedData.doctorName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-medium">{extractedData.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Your Medications:</h3>
              {extractedData.medications.map((med, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{med.drug}</h4>
                      <p className="text-primary-600 font-semibold">{med.dosage}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {med.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <p className="font-medium">{med.frequency}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Timing:</span>
                        <p className="font-medium">{med.timing}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-700 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800">
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patient Medicine Schedule */}
        {currentPatient && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Profile
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{currentPatient.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Patient ID:</span>
                  <p className="font-medium text-gray-900">{currentPatient.id}</p>
                </div>
                <div>
                  <span className="text-gray-600">Age:</span>
                  <p className="font-medium text-gray-900">{currentPatient.age} years</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Visit:</span>
                  <p className="font-medium text-gray-900">{currentPatient.lastVisit}</p>
                </div>
              </div>

              {currentPatient.allergies.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1 text-red-600" />
                    Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPatient.allergies.map((allergy, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentPatient.conditions.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Health Conditions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPatient.conditions.map((condition, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Medicine Schedule */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                My Medicine Schedule
              </h3>
              
              {getMedicineSchedule().length > 0 ? (
                <div className="space-y-4">
                  {getMedicineSchedule().map((med, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Pill className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{med.drug}</h4>
                            <p className="text-sm text-gray-600">{med.dosage}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{med.frequency}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {med.times.map((time, timeIdx) => (
                          <div key={timeIdx} className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                            <Bell className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No medications scheduled</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Reminder Enabled</p>
                    <p>You'll receive notifications for each medication time. Never miss a dose!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentPatient && !extractedData && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Your Health Dashboard</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter your Patient ID to view your medications and schedules, or upload a prescription image to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;

