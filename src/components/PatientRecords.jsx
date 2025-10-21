import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Eye, 
  X, 
  AlertCircle,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';
import { patients } from '../data/sampleData';

function PatientRecords() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedPatient(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-primary-600" />
                Patient Records
              </h1>
              <p className="text-gray-600">View and manage patient health records</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Search by patient name or ID..."
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Visited Today</p>
            <p className="text-3xl font-bold text-primary-600">12</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">With Allergies</p>
            <p className="text-3xl font-bold text-amber-600">4</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Active Cases</p>
            <p className="text-3xl font-bold text-green-600">18</p>
          </div>
        </div>

        {/* Patient Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prescriptions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conditions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{patient.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-600">{patient.hospital}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{patient.age} years</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {patient.lastVisit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {patient.prescriptions}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.slice(0, 2).map((condition, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {condition}
                          </span>
                        ))}
                        {patient.conditions.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{patient.conditions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openPatientDetails(patient)}
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No patients found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Details Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-blue-100">Patient ID: {selectedPatient.id}</p>
                    <p className="text-blue-200 text-sm">{selectedPatient.hospital}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium mb-1">Age</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedPatient.age} years</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium mb-1">Last Visit</p>
                  <p className="text-lg font-bold text-green-900">{selectedPatient.lastVisit}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium mb-1">Total Prescriptions</p>
                  <p className="text-2xl font-bold text-purple-900">{selectedPatient.prescriptions}</p>
                </div>
              </div>

              {/* Allergies */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Allergies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary-600" />
                  Medical Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.conditions.map((condition, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Prescriptions */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary-600" />
                  Recent Prescriptions
                </h3>
                <div className="space-y-3">
                  {selectedPatient.recentPrescriptions.map((prescription, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Drug</p>
                          <p className="font-semibold text-gray-900">{prescription.drug}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Dosage</p>
                          <p className="font-semibold text-gray-900">{prescription.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Frequency</p>
                          <p className="font-semibold text-gray-900">{prescription.frequency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    closeModal();
                    navigate('/prescription-checker');
                  }}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <FileText className="w-5 h-5" />
                  <span>New Prescription</span>
                </button>
                <button
                  onClick={closeModal}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientRecords;

