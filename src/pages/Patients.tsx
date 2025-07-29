import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  Activity,
  FileText,
  X,
  Edit,
  ChevronDown,
  AlertCircle,
  Clock
} from 'lucide-react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types/index';
import { format } from 'date-fns';
import { useModal } from '../components/Layout/DashboardLayout';

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'lastVisit'>('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get modal control functions
  const { setModalOpen } = useModal();

  // Filter and sort patients
  const filteredPatients = mockPatients
    .filter(patient => {
      const matchesSearch = searchQuery === '' || 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);
      
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;
      
      return matchesSearch && matchesGender;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'age':
          return b.age - a.age;
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const openPatientModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
    setModalOpen(true); // Hide sidebar when modal opens
  };

  const closePatientModal = () => {
    setSelectedPatient(null);
    setShowPatientModal(false);
    setModalOpen(false); // Show sidebar when modal closes
  };

  const getBloodTypeColor = (bloodType: string) => {
    const colors = {
      'A+': 'bg-red-100 text-red-800',
      'A-': 'bg-red-200 text-red-900',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-200 text-blue-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
      'O+': 'bg-green-100 text-green-800',
      'O-': 'bg-green-200 text-green-900',
    };
    return colors[bloodType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Patient Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your patients and their medical records
          </p>
        </div>
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-3 bg-white/60 hover:bg-white/80 border border-gray-200 rounded-xl transition-all duration-200"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'age' | 'lastVisit')}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="age">Age (High to Low)</option>
                  <option value="lastVisit">Last Visit (Recent First)</option>
                </select>
              </div>

              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{filteredPatients.length}</span> patients found
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => openPatientModal(patient)}
          >
            {/* Patient Avatar and Basic Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <img
                  src={patient.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=0ea5e9&color=fff`}
                  alt={patient.name}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{patient.name}</h3>
                <p className="text-sm text-gray-600">{patient.age} years old</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getBloodTypeColor(patient.bloodType)}`}>
                    {patient.bloodType}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{patient.gender}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{patient.address}</span>
              </div>
            </div>

            {/* Last Visit and Total Visits */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Last: {format(new Date(patient.lastVisit), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Activity className="w-4 h-4" />
                <span>{patient.totalVisits} visits</span>
              </div>
            </div>

            {/* Health Alerts */}
            {patient.medicalHistory.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {patient.medicalHistory.slice(0, 2).map((condition) => (
                  <span key={condition} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {condition}
                  </span>
                ))}
                {patient.medicalHistory.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{patient.medicalHistory.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || genderFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Start by adding your first patient'}
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Add New Patient
          </button>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/30 shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPatient.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPatient.name)}&background=0ea5e9&color=fff`}
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                    <p className="text-gray-600">Patient ID: {selectedPatient.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={closePatientModal}
                    className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Age</label>
                      <p className="text-gray-900 font-semibold">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-gray-900 font-semibold capitalize">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Blood Type</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold ${getBloodTypeColor(selectedPatient.bloodType)}`}>
                        {selectedPatient.bloodType}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Visits</label>
                      <p className="text-gray-900 font-semibold">{selectedPatient.totalVisits}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{selectedPatient.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{selectedPatient.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-gray-900">{selectedPatient.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                        <p className="text-gray-900">{selectedPatient.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 mb-4">
                    Medical History
                  </h3>
                  {selectedPatient.medicalHistory.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.medicalHistory.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
                          <Heart className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-gray-900">{condition}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No medical history recorded</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 mb-4">
                    Allergies
                  </h3>
                  {selectedPatient.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-900">{allergy}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No known allergies</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 mb-4">
                    Current Medications
                  </h3>
                  {selectedPatient.currentMedications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.currentMedications.map((medication, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-900">{medication}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No current medications</p>
                  )}
                </div>
              </div>

              {/* Visit History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Visit History</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Last visit: {format(new Date(selectedPatient.lastVisit), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center text-gray-500 py-8">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Visit history coming soon</p>
                    <p className="text-sm">Detailed visit records will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients; 