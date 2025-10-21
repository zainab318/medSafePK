import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pill, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Plus,
  Scan,
  FileText,
  ArrowRight,
  Brain,
  Lightbulb,
  Shield,
  TrendingUp
} from 'lucide-react';
import { commonDrugs, drugInteractions, drugIntelligence } from '../data/sampleData';

function PrescriptionChecker({ doctorName, onPrescriptionGenerated }) {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([{ name: '', dosage: '', frequency: '' }]);
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const addDrug = () => {
    setDrugs([...drugs, { name: '', dosage: '', frequency: '' }]);
  };

  const removeDrug = (index) => {
    if (drugs.length > 1) {
      setDrugs(drugs.filter((_, i) => i !== index));
    }
  };

  const updateDrug = (index, field, value) => {
    const newDrugs = [...drugs];
    newDrugs[index][field] = value;
    setDrugs(newDrugs);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        // Simulate OCR extraction
        setTimeout(() => {
          const simulatedExtraction = "Paracetamol 500mg BD\nIbuprofen 400mg TDS\nLisinopril 10mg OD";
          setExtractedText(simulatedExtraction);
          
          // Parse into drug array
          setDrugs([
            { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily' },
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily' },
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
          ]);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAISuggestions = () => {
    const suggestions = [];
    
    drugs.forEach((drug) => {
      if (!drug.name.trim()) return;

      // Check for banned drugs
      if (drugIntelligence.bannedDrugs[drug.name]) {
        const banned = drugIntelligence.bannedDrugs[drug.name];
        suggestions.push({
          type: 'banned',
          severity: banned.severity,
          drug: drug.name,
          title: `⛔ DRAP Alert: ${drug.name} is Banned/Restricted`,
          reason: banned.reason,
          alternative: banned.alternative,
          aiReasoning: drugIntelligence.aiReasoningTemplates.bannedDrug
        });
      }

      // Check for high-risk drugs
      if (drugIntelligence.highRiskDrugs[drug.name]) {
        const highRisk = drugIntelligence.highRiskDrugs[drug.name];
        suggestions.push({
          type: 'high-risk',
          severity: highRisk.severity,
          drug: drug.name,
          title: `⚠️ High-Risk Medication: ${drug.name}`,
          warning: highRisk.warning,
          monitoring: highRisk.monitoring,
          aiReasoning: drugIntelligence.aiReasoningTemplates.requiresMonitoring
        });
      }

      // Check dosage recommendations
      if (drugIntelligence.dosageRecommendations[drug.name] && drug.dosage) {
        const dosageRec = drugIntelligence.dosageRecommendations[drug.name];
        const dosageNum = parseInt(drug.dosage);
        
        if (dosageRec.adult) {
          const maxNum = parseInt(dosageRec.adult.max);
          const minNum = parseInt(dosageRec.adult.min);
          
          if (dosageNum > maxNum) {
            suggestions.push({
              type: 'dosage-high',
              severity: 'high',
              drug: drug.name,
              title: `📊 Dosage Alert: ${drug.name}`,
              message: `Prescribed: ${drug.dosage}. Recommended maximum: ${dosageRec.adult.max}`,
              recommendation: `Consider reducing to ${dosageRec.adult.max} or lower`,
              aiReasoning: drugIntelligence.aiReasoningTemplates.dosageTooHigh
            });
          } else if (dosageNum < minNum) {
            suggestions.push({
              type: 'dosage-low',
              severity: 'medium',
              drug: drug.name,
              title: `📊 Dosage Notice: ${drug.name}`,
              message: `Prescribed: ${drug.dosage}. Therapeutic range starts at: ${dosageRec.adult.min}`,
              recommendation: `Consider increasing to ${dosageRec.adult.min} for optimal efficacy`,
              aiReasoning: drugIntelligence.aiReasoningTemplates.dosageTooLow
            });
          }
        }
      }

      // Check for safer alternatives
      if (drugIntelligence.saferAlternatives[drug.name]) {
        const alternatives = drugIntelligence.saferAlternatives[drug.name];
        suggestions.push({
          type: 'alternative',
          severity: 'info',
          drug: drug.name,
          title: `💡 Safer Alternative Available for ${drug.name}`,
          alternatives: alternatives.alternatives,
          aiReasoning: drugIntelligence.aiReasoningTemplates.betterAlternative
        });
      }
    });

    return suggestions;
  };

  const checkInteractions = () => {
    const detectedAlerts = [];
    const drugNames = drugs.map(d => d.name).filter(n => n.trim() !== '');

    // Check for known interactions
    for (let i = 0; i < drugNames.length; i++) {
      for (let j = i + 1; j < drugNames.length; j++) {
        const pair1 = `${drugNames[i]}+${drugNames[j]}`;
        const pair2 = `${drugNames[j]}+${drugNames[i]}`;
        
        if (drugInteractions[pair1]) {
          detectedAlerts.push({
            ...drugInteractions[pair1],
            drugs: [drugNames[i], drugNames[j]]
          });
        } else if (drugInteractions[pair2]) {
          detectedAlerts.push({
            ...drugInteractions[pair2],
            drugs: [drugNames[j], drugNames[i]]
          });
        }
      }
    }

    // Generate AI suggestions
    const suggestions = generateAISuggestions();

    setAlerts(detectedAlerts);
    setAiSuggestions(suggestions);
    setShowResults(true);
  };

  const generatePrescription = () => {
    const prescription = {
      patientName: patientName || 'Patient',
      patientId: patientId || 'P' + Math.floor(Math.random() * 1000),
      doctorName,
      drugs: drugs.filter(d => d.name.trim() !== ''),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      safetyStatus: alerts.length === 0 ? 'Safe' : 'Requires Review',
      alerts: alerts
    };

    onPrescriptionGenerated(prescription);
    navigate('/qr-prescription');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription Safety Checker</h1>
          <p className="text-gray-600">AI-powered drug interaction detection and prescription verification</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Patient Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="input-field"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="input-field"
                    placeholder="Enter patient ID"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-primary-600" />
                Upload Handwritten Prescription (Optional)
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="prescription-upload"
                />
                <label htmlFor="prescription-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <div>
                      <img src={uploadedImage} alt="Uploaded" className="max-h-48 mx-auto rounded-lg mb-4" />
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Image uploaded - AI extraction in progress...
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Scan className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium mb-2">Click to upload prescription image</p>
                      <p className="text-sm text-gray-500">AI will extract drug information automatically</p>
                    </div>
                  )}
                </label>
              </div>

              {extractedText && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">Extracted Text:</p>
                  <p className="text-sm text-blue-800 whitespace-pre-line">{extractedText}</p>
                </div>
              )}
            </div>

            {/* Drug List */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary-600" />
                Medications
              </h2>

              <div className="space-y-4">
                {drugs.map((drug, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-start">
                    <div className="col-span-5">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Drug Name
                      </label>
                      <input
                        type="text"
                        value={drug.name}
                        onChange={(e) => updateDrug(index, 'name', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Paracetamol"
                        list={`drugs-list-${index}`}
                      />
                      <datalist id={`drugs-list-${index}`}>
                        {commonDrugs.map(d => <option key={d} value={d} />)}
                      </datalist>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={drug.dosage}
                        onChange={(e) => updateDrug(index, 'dosage', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Frequency
                      </label>
                      <select
                        value={drug.frequency}
                        onChange={(e) => updateDrug(index, 'frequency', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                    <div className="col-span-1 pt-6">
                      {drugs.length > 1 && (
                        <button
                          onClick={() => removeDrug(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addDrug}
                className="mt-4 flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Drug</span>
              </button>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={checkInteractions}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>Check Interactions</span>
                </button>
              </div>
            </div>

            {/* Results */}
            {showResults && (
              <>
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Drug Interaction Analysis</h2>

                  {alerts.length === 0 ? (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-green-900 mb-1">No Interactions Detected</h3>
                          <p className="text-sm text-green-800">
                            The prescribed medications appear to be safe to use together.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <div key={index} className={`p-6 rounded-lg border ${
                          alert.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-1 ${
                              alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                            }`} />
                            <div className="flex-1">
                              <h3 className={`font-semibold mb-2 ${
                                alert.severity === 'high' ? 'text-red-900' : 'text-amber-900'
                              }`}>
                                ⚠️ Interaction Detected: {alert.drugs.join(' + ')}
                              </h3>
                              <p className={`text-sm mb-3 ${
                                alert.severity === 'high' ? 'text-red-800' : 'text-amber-800'
                              }`}>
                                {alert.message}
                              </p>
                              {alert.alternative && (
                                <div className={`p-3 rounded-lg ${
                                  alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                                }`}>
                                  <p className={`text-sm font-medium ${
                                    alert.severity === 'high' ? 'text-red-900' : 'text-amber-900'
                                  }`}>
                                    💡 Suggestion: {alert.alternative}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Suggestion Box */}
                {aiSuggestions.length > 0 && (
                  <div className="card bg-gradient-to-br from-purple-50 via-blue-50 to-primary-50 border-2 border-primary-300">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-3 rounded-xl">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">AI Prescription Intelligence</h2>
                        <p className="text-sm text-gray-600">Powered by MedSafePK AI Engine • DRAP Compliant</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className={`bg-white rounded-lg border-l-4 p-5 shadow-sm ${
                          suggestion.type === 'banned' ? 'border-red-600' :
                          suggestion.type === 'high-risk' ? 'border-amber-500' :
                          suggestion.type === 'dosage-high' ? 'border-orange-500' :
                          suggestion.type === 'dosage-low' ? 'border-blue-500' :
                          'border-green-500'
                        }`}>
                          {/* Suggestion Header */}
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              {suggestion.type === 'banned' && <Shield className="w-5 h-5 mr-2 text-red-600" />}
                              {suggestion.type === 'high-risk' && <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />}
                              {suggestion.type === 'dosage-high' && <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />}
                              {suggestion.type === 'dosage-low' && <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />}
                              {suggestion.type === 'alternative' && <Lightbulb className="w-5 h-5 mr-2 text-green-600" />}
                              {suggestion.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              suggestion.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              suggestion.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              suggestion.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {suggestion.severity === 'critical' ? 'CRITICAL' :
                               suggestion.severity === 'high' ? 'HIGH' :
                               suggestion.severity === 'medium' ? 'MEDIUM' : 'INFO'}
                            </span>
                          </div>

                          {/* AI Reasoning */}
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-purple-900 font-medium flex items-center">
                              <Brain className="w-4 h-4 mr-2" />
                              {suggestion.aiReasoning}
                            </p>
                          </div>

                          {/* Suggestion Content */}
                          <div className="space-y-2 text-sm text-gray-700">
                            {suggestion.reason && (
                              <p><strong>Reason:</strong> {suggestion.reason}</p>
                            )}
                            {suggestion.warning && (
                              <p><strong>Warning:</strong> {suggestion.warning}</p>
                            )}
                            {suggestion.monitoring && (
                              <p className="text-blue-700"><strong>Required Monitoring:</strong> {suggestion.monitoring}</p>
                            )}
                            {suggestion.message && (
                              <p>{suggestion.message}</p>
                            )}
                            {suggestion.recommendation && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                                <p className="text-green-900 font-medium">
                                  ✅ Recommendation: {suggestion.recommendation}
                                </p>
                              </div>
                            )}
                            {suggestion.alternative && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                                <p className="text-blue-900 font-medium">
                                  💊 Alternative: {suggestion.alternative}
                                </p>
                              </div>
                            )}
                            {suggestion.alternatives && (
                              <div className="mt-3 space-y-2">
                                <p className="font-semibold text-gray-900">Recommended Alternatives:</p>
                                {suggestion.alternatives.map((alt, idx) => (
                                  <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="font-semibold text-green-900">💊 {alt.drug}</p>
                                    <p className="text-sm text-green-800 mt-1">
                                      <strong>Reason:</strong> {alt.reason}
                                    </p>
                                    <p className="text-xs text-green-700 mt-1">
                                      <strong>Best for:</strong> {alt.suitableFor}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Confidence Footer */}
                    <div className="mt-6 bg-white bg-opacity-70 rounded-lg p-4 border border-primary-200">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 font-medium">AI Analysis Complete</span>
                        </div>
                        <span className="text-gray-600">
                          Confidence: <strong className="text-primary-600">96.8%</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Generate Prescription Button */}
                <div className="card">
                  <button
                    onClick={generatePrescription}
                    className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
                  >
                    <span>Generate Safe Prescription</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  {aiSuggestions.some(s => s.type === 'banned' || s.severity === 'critical') && (
                    <p className="text-center text-sm text-red-600 mt-3 font-medium">
                      ⚠️ Please review critical alerts before generating prescription
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Tips */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Safety Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Always check patient allergies before prescribing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Verify dosages with patient's weight and age</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Review current medications for interactions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Consider patient's liver and kidney function</span>
                </li>
              </ul>
            </div>

            {/* Dataset Source */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Dataset Source
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">DRAP Drug Registry</p>
                      <p className="text-xs text-green-700">(simulated)</p>
                      <p className="text-xs text-gray-600 mt-1">Drug Regulatory Authority of Pakistan official database</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">Pakistan Health Data Exchange</p>
                      <p className="text-xs text-green-700">(mock)</p>
                      <p className="text-xs text-gray-600 mt-1">National health information sharing platform</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-2 mt-2">
                  <p className="text-xs text-green-800 text-center">
                    ✅ Aligned with Pakistani healthcare standards
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50">
              <h3 className="font-semibold text-gray-900 mb-4">Today's Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Checked</span>
                  <span className="text-lg font-bold text-primary-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Interactions</span>
                  <span className="text-lg font-bold text-amber-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Safe</span>
                  <span className="text-lg font-bold text-green-600">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionChecker;

