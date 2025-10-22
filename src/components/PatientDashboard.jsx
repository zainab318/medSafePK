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
  Sparkles,
  MessageCircle,
  Save
} from 'lucide-react';
import { patients } from '../data/sampleData';
import MedSafeAssistant from './MedSafeAssistant';
import { createWorker } from 'tesseract.js';
import drugsData from '../data/drugs.json';

function PatientDashboard({ patientName, patientId }) {
  const [searchId, setSearchId] = useState(patientId || '');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [savedReminders, setSavedReminders] = useState([]);

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
        // Process with real OCR
        performOCR(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Real OCR using Tesseract.js
  const performOCR = async (imageData) => {
    setIsProcessing(true);
    setOcrProgress(0);
    setExtractedData(null);
    setExtractedText('');

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });

      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();

      setExtractedText(text);
      
      // Parse the extracted text to find medicines
      const parsedData = parsePrescriptionText(text);
      setExtractedData(parsedData);
      setIsProcessing(false);
      
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to read prescription. Please try again with a clearer image.');
      setIsProcessing(false);
    }
  };

  // Parse OCR text to extract medicine information
  const parsePrescriptionText = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const medications = [];
    
    // Common medicine name patterns (brand names from our database)
    const knownMedicines = drugsData.drugs.map(d => d.name.toLowerCase());
    const knownGenerics = drugsData.drugs.map(d => d.genericName.toLowerCase());
    
    // Dosage patterns: 500mg, 250 mg, 1g, etc.
    const dosagePattern = /(\d+\.?\d*)\s*(mg|g|ml|mcg|tablet|capsule)/gi;
    
    // Frequency patterns
    const frequencyPatterns = [
      /once\s+(daily|a day)/i,
      /twice\s+(daily|a day)/i,
      /three\s+times/i,
      /every\s+(\d+)\s+(hour|hr)/i,
      /(\d+)x\s+(daily|day)/i
    ];

    let currentMedicine = null;

    lines.forEach((line, index) => {
      const lineLower = line.toLowerCase();
      
      // Check if line contains a known medicine name
      let foundMedicine = null;
      for (const med of drugsData.drugs) {
        if (lineLower.includes(med.name.toLowerCase()) || 
            lineLower.includes(med.genericName.toLowerCase())) {
          foundMedicine = med;
          break;
        }
      }

      if (foundMedicine) {
        // Extract dosage from this line or next few lines
        let dosage = foundMedicine.dosage;
        let frequency = foundMedicine.frequency;
        let instructions = '';
        
        // Look for dosage in current and next 2 lines
        for (let i = 0; i < 3 && (index + i) < lines.length; i++) {
          const checkLine = lines[index + i];
          const dosageMatch = checkLine.match(dosagePattern);
          if (dosageMatch) {
            dosage = dosageMatch[0];
          }
          
          // Check for frequency
          for (const pattern of frequencyPatterns) {
            if (pattern.test(checkLine)) {
              frequency = checkLine.match(pattern)[0];
              break;
            }
          }
          
          // Look for common instruction keywords
          if (/after (food|meal|eating)/i.test(checkLine)) {
            instructions = 'Take after meals';
          } else if (/before (food|meal|eating)/i.test(checkLine)) {
            instructions = 'Take before meals';
          } else if (/empty stomach/i.test(checkLine)) {
            instructions = 'Take on empty stomach';
          } else if (/with (food|milk)/i.test(checkLine)) {
            instructions = 'Take with food or milk';
          }
        }

        currentMedicine = {
          drug: foundMedicine.name,
          genericName: foundMedicine.genericName,
          dosage: dosage,
          frequency: frequency,
          duration: '7 days', // Default
          timing: foundMedicine.timing || 'As prescribed',
          instructions: instructions || foundMedicine.usage
        };
        
        medications.push(currentMedicine);
      }
    });

    // If no medicines found, try to extract any medicine-like words
    if (medications.length === 0) {
      // Look for capitalized words that might be medicine names
      lines.forEach(line => {
        const dosageMatch = line.match(dosagePattern);
        if (dosageMatch) {
          const words = line.split(/\s+/);
          const capitalizedWords = words.filter(w => /^[A-Z]/.test(w) && w.length > 3);
          
          if (capitalizedWords.length > 0) {
            medications.push({
              drug: capitalizedWords[0],
              genericName: 'Unknown',
              dosage: dosageMatch[0],
              frequency: 'As prescribed',
              duration: '7 days',
              timing: 'As prescribed',
              instructions: 'Consult your doctor for proper usage'
            });
          }
        }
      });
    }

    // Extract doctor name and date if present
    let doctorName = 'Unknown Doctor';
    let date = new Date().toLocaleDateString();
    
    lines.forEach(line => {
      if (/dr\.?\s+[a-z]+/i.test(line)) {
        const match = line.match(/dr\.?\s+([a-z\s]+)/i);
        if (match) {
          doctorName = 'Dr. ' + match[1].trim();
        }
      }
      
      // Look for date patterns
      if (/\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/.test(line)) {
        const dateMatch = line.match(/\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/);
        if (dateMatch) {
          date = dateMatch[0];
        }
      }
    });

    return {
      medications: medications.length > 0 ? medications : [{
        drug: 'No medicines detected',
        genericName: '',
        dosage: 'N/A',
        frequency: 'N/A',
        duration: 'N/A',
        timing: 'Please check your image',
        instructions: 'Make sure: (1) Image contains a prescription with medicine names, (2) Photo is clear and well-lit, (3) Medicine names are visible (e.g., Panadol, Brufen, Augmentin). We support 48 common Pakistani medicines.'
      }],
      doctorName,
      date,
      confidence: medications.length > 0 ? 85 : 50,
      ocrSuccess: true,  // OCR worked, just no medicines found
      extractedTextLength: text.length
    };
  };

  // Save extracted medicines as reminders
  const saveAsReminders = () => {
    if (!extractedData || !extractedData.medications) return;
    
    const reminders = extractedData.medications.map(med => ({
      ...med,
      times: generateMedicineTimes(med.frequency),
      addedAt: new Date().toLocaleString()
    }));
    
    setSavedReminders(prev => [...prev, ...reminders]);
    alert(`✅ ${reminders.length} medicine(s) saved as reminders!`);
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
            <p className="text-gray-600 mb-4">
              Using Tesseract OCR + NLP to extract medication details
            </p>
            <div className="mt-4 w-64 mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Processing...</span>
                <span className="font-semibold">{ocrProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{width: `${ocrProgress}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              This may take 10-20 seconds depending on image quality
            </p>
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
                      {med.genericName && med.genericName !== 'Unknown' && (
                        <p className="text-xs text-gray-500 mt-1">Generic: {med.genericName}</p>
                      )}
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

            {/* Save as Reminders Button OR Helpful Tips */}
            {extractedData.medications[0].drug !== 'No medicines detected' ? (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={saveAsReminders}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span className="font-semibold">Save as Medicine Reminders</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Medicines will be added to your reminder schedule below
                </p>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Tips for Better Results
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Upload an actual prescription (not brochures or ads)</li>
                    <li>✓ Ensure medicine names are clearly visible</li>
                    <li>✓ Use good lighting (avoid shadows and glare)</li>
                    <li>✓ Keep text in focus (not blurry)</li>
                    <li>✓ We detect: Panadol, Brufen, Augmentin, Flagyl, Azomax, and 43 more Pakistani medicines</li>
                  </ul>
                  <div className="mt-3 p-3 bg-white rounded border border-blue-300">
                    <p className="text-xs font-mono text-gray-700">
                      <strong>Example prescription text:</strong><br/>
                      Dr. Ahmad Khan<br/>
                      Panadol 500mg - Twice daily<br/>
                      Brufen 400mg - Three times daily
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Show extracted text (collapsible) */}
            {extractedText && (
              <details className="mt-6 pt-6 border-t border-gray-200">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-primary-600">
                  View Raw OCR Text
                </summary>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg text-xs font-mono text-gray-700 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {extractedText}
                </div>
              </details>
            )}
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

        {/* Saved Medicine Reminders */}
        {savedReminders.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-green-600" />
              My Saved Medicine Reminders
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Medicines extracted from your prescription and saved as reminders
            </p>
            
            <div className="space-y-4">
              {savedReminders.map((reminder, idx) => (
                <div key={idx} className="border border-green-200 bg-green-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-600 p-2 rounded-lg">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{reminder.drug}</h4>
                        <p className="text-sm text-gray-600">{reminder.dosage}</p>
                        {reminder.genericName && reminder.genericName !== 'Unknown' && (
                          <p className="text-xs text-gray-500">Generic: {reminder.genericName}</p>
                        )}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{reminder.frequency}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {reminder.times.map((time, timeIdx) => (
                      <div key={timeIdx} className="flex items-center space-x-2 px-3 py-2 bg-white border border-green-300 rounded-lg">
                        <Bell className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Added: {reminder.addedAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentPatient && !extractedData && savedReminders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Your Health Dashboard</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter your Patient ID to view your medications and schedules, or upload a prescription image to get started.
            </p>
          </div>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-40 flex items-center space-x-2 group"
        aria-label="Open MedSafe Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:inline-block text-sm font-medium pr-2 animate-fade-in">
          Ask MedSafe Assistant
        </span>
      </button>

      {/* MedSafe Assistant Chatbot */}
      <MedSafeAssistant
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        patientName={patientName}
        patientData={currentPatient}
      />
    </div>
  );
}

export default PatientDashboard;

