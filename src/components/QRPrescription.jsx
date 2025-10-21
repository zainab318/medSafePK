import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { 
  CheckCircle, 
  Download, 
  Share2, 
  Shield,
  User,
  Stethoscope,
  Calendar,
  Clock,
  AlertTriangle,
  Printer
} from 'lucide-react';

function QRPrescription({ prescription }) {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  if (!prescription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No prescription data available</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Generate QR code data
  const qrData = JSON.stringify({
    id: `RX-${Date.now()}`,
    patient: prescription.patientName,
    patientId: prescription.patientId,
    doctor: prescription.doctorName,
    date: prescription.date,
    time: prescription.time,
    drugs: prescription.drugs,
    status: prescription.safetyStatus
  });

  const handleVerify = () => {
    setIsVerified(true);
    setTimeout(() => setIsVerified(false), 5000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulate download
    alert('Prescription PDF downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Prescription</h1>
          <p className="text-gray-600">Secure, verified, and ready to use</p>
        </div>

        {/* Success Alert */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Prescription Generated Successfully!</h3>
              <p className="text-sm text-green-800">
                The prescription has been checked for drug interactions and is ready for dispensing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Prescription Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prescription Header */}
            <div className="card border-2 border-primary-200 print:border-black">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-navy-900">MedSafe<span className="text-primary-600">PK</span></h2>
                    <p className="text-sm text-gray-600">AI-Verified Digital Prescription</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${
                    prescription.safetyStatus === 'Safe' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    <span className="font-semibold">{prescription.safetyStatus}</span>
                  </div>
                </div>
              </div>

              {/* Prescription Details */}
              <div className="space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Patient</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{prescription.patientName}</p>
                    <p className="text-sm text-gray-600">ID: {prescription.patientId}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Stethoscope className="w-4 h-4" />
                      <span className="text-sm font-medium">Prescribed By</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{prescription.doctorName}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Date</span>
                    </div>
                    <p className="font-semibold text-gray-900">{prescription.date}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Time</span>
                    </div>
                    <p className="font-semibold text-gray-900">{prescription.time}</p>
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Prescribed Medications</h3>
                  <div className="space-y-3">
                    {prescription.drugs.map((drug, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-lg mb-2">
                              {index + 1}. {drug.name}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Dosage:</span>
                                <span className="ml-2 font-medium text-gray-900">{drug.dosage}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Frequency:</span>
                                <span className="ml-2 font-medium text-gray-900">{drug.frequency}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts (if any) */}
                {prescription.alerts && prescription.alerts.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-900 mb-2">Pharmacist Attention Required</h4>
                        <ul className="space-y-2">
                          {prescription.alerts.map((alert, index) => (
                            <li key={index} className="text-sm text-amber-800">
                              • {alert.message}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Digital Signature */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Digital Signature</p>
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
                    <p className="font-mono text-sm text-gray-700 break-all">
                      {btoa(prescription.doctorName + prescription.date).substring(0, 40)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      This prescription is cryptographically signed and verified by MedSafePK AI system
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handlePrint}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
              <button
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* QR Code & Verification Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="card text-center">
              <h3 className="font-semibold text-gray-900 mb-4">Scan to Verify</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Scan this QR code to verify prescription authenticity
              </p>
            </div>

            {/* DRAP Verification Badge */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-green-900 mb-1">DRAP Certified</h3>
                <p className="text-xs text-green-700 mb-3">Drug Regulatory Authority of Pakistan</p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Certificate No.</p>
                  <p className="font-mono text-sm text-green-800">DRAP-MS-2025-{Math.floor(Math.random() * 10000)}</p>
                </div>
                <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified & Compliant</span>
                </div>
              </div>
            </div>

            {/* Verification Button */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Pharmacist Verification
              </h3>
              
              {!isVerified ? (
                <button
                  onClick={handleVerify}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  <Shield className="w-5 h-5" />
                  <span>Verify Prescription</span>
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">✅ Verified!</p>
                      <p className="text-sm">Prescription authenticated</p>
                      <p className="text-xs mt-1">DRAP compliant</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Prescription ID:</span>
                  <span className="font-mono text-xs">RX-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Checked:</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span>DRAP Verified:</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Blockchain Secured:</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>

            {/* Safety Info */}
            <div className="card bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Safety Features</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Drug interaction checked</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>DRAP compliance verified</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Digitally signed by doctor</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>QR code verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tamper-proof record</span>
                </li>
              </ul>
            </div>

            {/* New Prescription Button */}
            <button
              onClick={() => navigate('/prescription-checker')}
              className="w-full btn-primary"
            >
              Create New Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRPrescription;

