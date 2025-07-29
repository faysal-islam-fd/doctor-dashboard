import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Calendar,
  Pill,
  CheckCircle,
  Copy,
  Send,
  Save,
  X
} from 'lucide-react';
import { mockPatients } from '../data/mockData';
import { format } from 'date-fns';
import { useModal } from '../components/Layout/DashboardLayout';

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  diagnosis: string;
  nextVisit?: string;
  status: 'active' | 'completed' | 'cancelled';
  doctorNotes: string;
}

const Prescriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'templates'>('list');
  
  // Get modal control functions
  const { setModalOpen } = useModal();

  // Mock prescription data
  const mockPrescriptions: Prescription[] = [
    {
      id: 'rx-001',
      patientId: 'pat-001',
      patientName: 'John Doe',
      date: '2024-01-20',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take with food in the morning'
        },
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take with meals'
        }
      ],
      diagnosis: 'Hypertension, Type 2 Diabetes',
      nextVisit: '2024-02-20',
      status: 'active',
      doctorNotes: 'Monitor blood pressure and glucose levels. Follow up in 4 weeks.'
    },
    {
      id: 'rx-002',
      patientId: 'pat-002',
      patientName: 'Maria Garcia',
      date: '2024-01-19',
      medications: [
        {
          name: 'Sumatriptan',
          dosage: '50mg',
          frequency: 'As needed',
          duration: '10 tablets',
          instructions: 'Take at onset of migraine symptoms'
        }
      ],
      diagnosis: 'Migraine Headache',
      status: 'active',
      doctorNotes: 'Patient reports good response to current medication.'
    },
    {
      id: 'rx-003',
      patientId: 'pat-003',
      patientName: 'Ahmed Rahman',
      date: '2024-01-18',
      medications: [
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in the evening'
        },
        {
          name: 'Aspirin',
          dosage: '81mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take with food'
        }
      ],
      diagnosis: 'High Cholesterol, Coronary Artery Disease',
      nextVisit: '2024-03-18',
      status: 'active',
      doctorNotes: 'Continue current regimen. Lipid panel in 6 weeks.'
    }
  ];

  // Common prescription templates
  const prescriptionTemplates = [
    {
      id: 'template-1',
      name: 'Hypertension Management',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take in the morning' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take with or without food' }
      ],
      category: 'Cardiovascular',
      usageCount: 15
    },
    {
      id: 'template-2',
      name: 'Diabetes Type 2',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with meals' },
        { name: 'Glipizide', dosage: '5mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take before breakfast' }
      ],
      category: 'Endocrine',
      usageCount: 12
    },
    {
      id: 'template-3',
      name: 'Upper Respiratory Infection',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Take with food' },
        { name: 'Acetaminophen', dosage: '500mg', frequency: 'Every 6 hours as needed', duration: '5 days', instructions: 'For fever and pain' }
      ],
      category: 'General',
      usageCount: 8
    }
  ];

  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    doctorNotes: '',
    nextVisit: ''
  });

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = searchQuery === '' || 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openPrescriptionModal = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
    setModalOpen(true); // Hide sidebar when modal opens
  };

  const closePrescriptionModal = () => {
    setSelectedPrescription(null);
    setShowPrescriptionModal(false);
    setModalOpen(false); // Show sidebar when modal closes
  };

  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    }));
  };

  const removeMedication = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Total Prescriptions', value: mockPrescriptions.length, icon: FileText, color: 'text-blue-600' },
    { label: 'Active', value: mockPrescriptions.filter(p => p.status === 'active').length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'This Month', value: mockPrescriptions.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).length, icon: Calendar, color: 'text-purple-600' },
    { label: 'Templates', value: prescriptionTemplates.length, icon: Copy, color: 'text-orange-600' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Prescription Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create, manage, and track patient prescriptions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-cyan-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              Prescriptions
            </button>
            <button
              onClick={() => setViewMode('templates')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'templates'
                  ? 'bg-white text-cyan-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Copy className="w-4 h-4 mr-2 inline" />
              Templates
            </button>
          </div>
          <button
            onClick={() => {
              setShowCreateModal(true);
              setModalOpen(true);
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Prescription
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'list' ? (
        <>
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
                  placeholder="Search prescriptions by patient, diagnosis, or medication..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Prescriptions</h3>
              <span className="text-sm text-gray-600">
                {filteredPrescriptions.length} prescription{filteredPrescriptions.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => openPrescriptionModal(prescription)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-cyan-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900">{prescription.patientName}</h4>
                      <p className="text-sm text-gray-600 truncate">{prescription.diagnosis}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(prescription.date), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Pill className="w-4 h-4" />
                          <span>{prescription.medications.length} medication{prescription.medications.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(prescription.status)}`}>
                      {prescription.status === 'active' ? 'Active' : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-400 hover:text-cyan-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No prescriptions found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start by creating your first prescription'}
                </p>
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Prescription
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Templates View
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Prescription Templates</h3>
            <button className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prescriptionTemplates.map((template) => (
              <div
                key={template.id}
                className="p-6 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {template.medications.slice(0, 2).map((medication, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <span className="font-medium">{medication.name}</span> - {medication.dosage}
                    </div>
                  ))}
                  {template.medications.length > 2 && (
                    <div className="text-sm text-gray-500">
                      +{template.medications.length - 2} more medications
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Used {template.usageCount} times
                  </div>
                  <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescription Detail Modal */}
      {showPrescriptionModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/30 shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Prescription Details</h2>
                  <p className="text-gray-600">Patient: {selectedPrescription.patientName}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                  <button
                    onClick={closePrescriptionModal}
                    className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Prescription Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Prescription Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date Prescribed</label>
                      <p className="text-gray-900">{format(new Date(selectedPrescription.date), 'MMMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Diagnosis</label>
                      <p className="text-gray-900">{selectedPrescription.diagnosis}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedPrescription.status)}`}>
                        {selectedPrescription.status === 'active' ? 'Active' : selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                      </span>
                    </div>
                    {selectedPrescription.nextVisit && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Next Visit</label>
                        <p className="text-gray-900">{format(new Date(selectedPrescription.nextVisit), 'MMMM dd, yyyy')}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Doctor Notes</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{selectedPrescription.doctorNotes}</p>
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescribed Medications</h3>
                <div className="space-y-4">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Medication</label>
                          <p className="text-gray-900 font-semibold">{medication.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Dosage</label>
                          <p className="text-gray-900">{medication.dosage}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Frequency</label>
                          <p className="text-gray-900">{medication.frequency}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Duration</label>
                          <p className="text-gray-900">{medication.duration}</p>
                        </div>
                      </div>
                      {medication.instructions && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-gray-500">Instructions</label>
                          <p className="text-gray-900">{medication.instructions}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/30 shadow-2xl">
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Create New Prescription</h2>
                                 <button
                   onClick={() => {
                     setShowCreateModal(false);
                     setModalOpen(false);
                   }}
                   className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                  <select
                    value={newPrescription.patientId}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, patientId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  >
                    <option value="">Choose a patient...</option>
                    {mockPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                  <input
                    type="text"
                    value={newPrescription.diagnosis}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                    placeholder="Enter diagnosis..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Medications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                  <button
                    onClick={addMedication}
                    className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </button>
                </div>

                <div className="space-y-4">
                  {newPrescription.medications.map((medication, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Medication name"
                          value={medication.name}
                          onChange={(e) => updateMedication(index, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        />
                        <input
                          type="text"
                          placeholder="Dosage (e.g., 10mg)"
                          value={medication.dosage}
                          onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        />
                        <input
                          type="text"
                          placeholder="Frequency (e.g., Twice daily)"
                          value={medication.frequency}
                          onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 30 days)"
                          value={medication.duration}
                          onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Special instructions..."
                          value={medication.instructions}
                          onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        />
                        {newPrescription.medications.length > 1 && (
                          <button
                            onClick={() => removeMedication(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Notes and Next Visit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Notes</label>
                  <textarea
                    value={newPrescription.doctorNotes}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, doctorNotes: e.target.value }))}
                    placeholder="Additional notes or instructions..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Next Visit (Optional)</label>
                  <input
                    type="date"
                    value={newPrescription.nextVisit}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, nextVisit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200/50">
                                 <button
                   onClick={() => {
                     setShowCreateModal(false);
                     setModalOpen(false);
                   }}
                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                 >
                   Cancel
                 </button>
                <button
                                     onClick={() => {
                     console.log('Creating prescription:', newPrescription);
                     setShowCreateModal(false);
                     setModalOpen(false);
                     // Reset form
                     setNewPrescription({
                       patientId: '',
                       diagnosis: '',
                       medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
                       doctorNotes: '',
                       nextVisit: ''
                     });
                   }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Create Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions; 