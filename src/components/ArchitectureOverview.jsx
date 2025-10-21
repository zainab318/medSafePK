import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Brain, 
  Database, 
  Building2, 
  Smartphone,
  BarChart3,
  ArrowRight,
  Cpu,
  Eye,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle
} from 'lucide-react';

function ArchitectureOverview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              MedSafePK System Architecture
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              End-to-end AI-powered prescription safety ecosystem for Pakistan's healthcare system
            </p>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-8">
            
            {/* Row 1: Doctor App */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-600 p-4 rounded-full mb-4">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Doctor App</h3>
                    <p className="text-sm text-blue-700 mb-3">Web & Mobile Interface</p>
                    <div className="w-full bg-blue-50 rounded-lg p-3 text-left">
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Write prescriptions</li>
                        <li>• Upload handwritten Rx</li>
                        <li>• Patient management</li>
                        <li>• Real-time safety alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Arrow down */}
              <div className="flex flex-col items-center my-4">
                <ArrowRight className="w-6 h-6 text-primary-600 transform rotate-90" />
                <div className="text-xs text-gray-500 font-medium mt-1">Sends Prescription Data</div>
              </div>
            </div>

            {/* Row 2: AI Engine */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl">
                <div className="card bg-gradient-to-br from-purple-50 to-primary-100 border-2 border-primary-400 hover:shadow-xl transition-all">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-4 rounded-full mb-4">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">AI Processing Engine</h3>
                    <p className="text-sm text-primary-700">Intelligent Prescription Analysis</p>
                  </div>
                  
                  {/* AI Components Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* OCR Module */}
                    <div className="bg-white rounded-lg p-4 border border-primary-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Eye className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">OCR Module</h4>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Handwriting recognition</li>
                        <li>• Text extraction</li>
                        <li>• 95%+ accuracy</li>
                      </ul>
                    </div>

                    {/* NLP Module */}
                    <div className="bg-white rounded-lg p-4 border border-primary-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">NLP Module</h4>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Drug name parsing</li>
                        <li>• Dosage extraction</li>
                        <li>• Context understanding</li>
                      </ul>
                    </div>

                    {/* Drug Interaction AI */}
                    <div className="bg-white rounded-lg p-4 border border-primary-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Interaction AI</h4>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Drug-drug interactions</li>
                        <li>• DRAP compliance check</li>
                        <li>• Dosage validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Arrow down */}
              <div className="flex flex-col items-center my-4">
                <ArrowRight className="w-6 h-6 text-primary-600 transform rotate-90" />
                <div className="text-xs text-gray-500 font-medium mt-1">Stores & Retrieves Data</div>
              </div>
            </div>

            {/* Row 3: Database */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 hover:shadow-lg transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-700 p-4 rounded-full mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Central Database</h3>
                    <p className="text-sm text-gray-700 mb-3">Secure Cloud Storage</p>
                    <div className="w-full bg-gray-50 rounded-lg p-3 text-left">
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Patient records (encrypted)</li>
                        <li>• Prescription history</li>
                        <li>• Drug database (DRAP)</li>
                        <li>• Analytics data</li>
                        <li>• Blockchain ledger</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Arrow down - splits into three */}
              <div className="flex items-center justify-center my-4 w-full max-w-4xl">
                <div className="flex justify-around w-full">
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 text-primary-600 transform rotate-90" />
                    <div className="text-xs text-gray-500 font-medium mt-1">Pharmacy Access</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 text-primary-600 transform rotate-90" />
                    <div className="text-xs text-gray-500 font-medium mt-1">Patient Access</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 text-primary-600 transform rotate-90" />
                    <div className="text-xs text-gray-500 font-medium mt-1">Analytics Feed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Three Apps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pharmacy App */}
              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-600 p-4 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Pharmacy App</h3>
                  <p className="text-sm text-green-700 mb-3">Verification System</p>
                  <div className="w-full bg-green-50 rounded-lg p-3 text-left">
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• QR code scanning</li>
                      <li>• Prescription verification</li>
                      <li>• DRAP compliance check</li>
                      <li>• Dispensing records</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Patient App */}
              <div className="card bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-600 p-4 rounded-full mb-4">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Patient App</h3>
                  <p className="text-sm text-amber-700 mb-3">Health Records</p>
                  <div className="w-full bg-amber-50 rounded-lg p-3 text-left">
                    <ul className="text-xs text-amber-800 space-y-1">
                      <li>• View prescriptions</li>
                      <li>• Medication reminders</li>
                      <li>• Health history</li>
                      <li>• Doctor appointments</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Analytics Dashboard */}
              <div className="card bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-600 p-4 rounded-full mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Analytics</h3>
                  <p className="text-sm text-purple-700 mb-3">Insights Dashboard</p>
                  <div className="w-full bg-purple-50 rounded-lg p-3 text-left">
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• Prescription trends</li>
                      <li>• Safety metrics</li>
                      <li>• Drug usage patterns</li>
                      <li>• DRAP reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Data Flow Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-primary-50 border border-primary-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary-600" />
              Data Flow Process
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">1</span>
                <span><strong>Doctor writes prescription</strong> via web/mobile app or uploads handwritten image</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">2</span>
                <span><strong>AI Engine processes</strong> with OCR, NLP, and interaction detection</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">3</span>
                <span><strong>Database stores</strong> encrypted records and generates QR code</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">4</span>
                <span><strong>Pharmacy verifies</strong> prescription via QR scan and DRAP check</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">5</span>
                <span><strong>Patient accesses</strong> digital records and medication info</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">6</span>
                <span><strong>Analytics aggregates</strong> data for insights and DRAP reporting</span>
              </li>
            </ol>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Key Features
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-green-900">End-to-End Encryption</strong>
                  <p className="text-xs text-gray-600 mt-1">Patient data protected at all stages</p>
                </div>
              </div>
              <div className="flex items-start">
                <Cpu className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-900">Real-Time Processing</strong>
                  <p className="text-xs text-gray-600 mt-1">AI analysis in milliseconds</p>
                </div>
              </div>
              <div className="flex items-start">
                <Database className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-900">Blockchain Integration</strong>
                  <p className="text-xs text-gray-600 mt-1">Tamper-proof prescription records</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary-900">DRAP Compliant</strong>
                  <p className="text-xs text-gray-600 mt-1">Meets Pakistani regulatory standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card bg-white">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="font-semibold text-gray-900">React</div>
              <div className="text-xs text-gray-600">Frontend</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-semibold text-gray-900">TensorFlow</div>
              <div className="text-xs text-gray-600">AI/ML</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🗄️</div>
              <div className="font-semibold text-gray-900">PostgreSQL</div>
              <div className="text-xs text-gray-600">Database</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl mb-2">🔗</div>
              <div className="font-semibold text-gray-900">Blockchain</div>
              <div className="text-xs text-gray-600">Security</div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary px-8 py-3"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureOverview;

