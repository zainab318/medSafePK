import React from 'react';
import { X, Shield, Lock, Eye, CheckCircle } from 'lucide-react';

function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Privacy & Ethics</h2>
                <p className="text-blue-100 text-sm">Our Commitment to Patient Safety & Data Protection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Statement */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <p className="text-gray-800 leading-relaxed">
              <strong className="text-green-900">MedSafePK ensures patient consent, anonymized data storage, and bias-free AI recommendations.</strong> All data is encrypted and used responsibly under Pakistan's privacy laws.
            </p>
          </div>

          {/* Key Principles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary-600" />
              Our Core Principles
            </h3>

            {/* Patient Consent */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Patient Consent</h4>
                  <p className="text-sm text-gray-600">
                    All patients are informed about data collection and usage. Explicit consent is obtained before any data processing. Patients can withdraw consent at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Anonymized Data */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Anonymized Data Storage</h4>
                  <p className="text-sm text-gray-600">
                    Patient identities are protected through advanced anonymization techniques. Personal identifiers are separated from medical data. No personally identifiable information (PII) is stored with AI training data.
                  </p>
                </div>
              </div>
            </div>

            {/* Bias-Free AI */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bias-Free AI Recommendations</h4>
                  <p className="text-sm text-gray-600">
                    Our AI is trained on diverse datasets to eliminate gender, ethnic, or socioeconomic bias. Regular audits ensure fair treatment recommendations for all patients. Transparent AI reasoning shows how decisions are made.
                  </p>
                </div>
              </div>
            </div>

            {/* Encryption */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-gray-600">
                    All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Blockchain technology ensures tamper-proof prescription records. Access controls limit data viewing to authorized personnel only.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">Legal Compliance</h3>
            <div className="space-y-2 text-sm text-primary-800">
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Compliant with <strong>Pakistan Electronic Media Regulatory Authority (PEMRA)</strong> guidelines</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Adheres to <strong>Drug Regulatory Authority of Pakistan (DRAP)</strong> standards</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Follows <strong>Pakistan Medical Commission (PMC)</strong> ethical guidelines</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Aligned with international standards: <strong>GDPR</strong> and <strong>HIPAA</strong> principles</span>
              </p>
            </div>
          </div>

          {/* Patient Rights */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights as a Patient</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Right to access your medical data at any time</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Right to request data deletion (right to be forgotten)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Right to know how your data is being used</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Right to withdraw consent without consequences</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Right to report privacy concerns to authorities</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center text-sm text-gray-600">
            <p>For privacy concerns or questions, contact:</p>
            <p className="font-semibold text-primary-600 mt-1">privacy@medsafepk.com</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: October 2025</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-primary w-full py-3"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyModal;


