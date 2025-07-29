import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Phone,
  Mail,
  MapPin,
  User,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockAppointments } from '../data/mockData';
import type { Appointment } from '../types/index';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { useModal } from '../components/Layout/DashboardLayout';

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  
  // Get modal control functions
  const { setModalOpen } = useModal();

  const statusOptions = [
    { value: 'all', label: 'All Appointments', color: 'bg-gray-100 text-gray-800' },
    { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ];

  // Filter appointments based on date, status, and search
  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (viewMode === 'day') {
      return format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && matchesStatus && matchesSearch;
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(selectedDate);
      const weekEnd = endOfWeek(selectedDate);
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= weekStart && appointmentDate <= weekEnd && matchesStatus && matchesSearch;
    }
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = (appointmentId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updating appointment ${appointmentId} to status: ${newStatus}`);
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
    setModalOpen(true); // Hide sidebar when modal opens
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    if (viewMode === 'day') {
      setSelectedDate(prev => addDays(prev, direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      setSelectedDate(prev => addDays(prev, direction === 'next' ? 7 : -7));
    }
  };

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'no-show': 'bg-gray-100 text-gray-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Appointments
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your appointments and patient bookings
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/30">
            <span className="text-sm text-gray-600">Today</span>
            <span className="ml-2 font-bold text-cyan-600">
              {mockAppointments.filter(a => format(new Date(a.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length}
            </span>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/30">
            <span className="text-sm text-gray-600">This Week</span>
            <span className="ml-2 font-bold text-green-600">
              {mockAppointments.filter(a => a.status === 'scheduled').length}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients or appointment reasons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* View Mode */}
          <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1">
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as 'day' | 'week' | 'month')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50">
          <button
            onClick={() => navigateDate('prev')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 border border-gray-200/50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">
              {viewMode === 'day' && format(selectedDate, 'EEEE, MMMM d, yyyy')}
              {viewMode === 'week' && (
                `${format(startOfWeek(selectedDate), 'MMM d')} - ${format(endOfWeek(selectedDate), 'MMM d, yyyy')}`
              )}
              {viewMode === 'month' && format(selectedDate, 'MMMM yyyy')}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={() => navigateDate('next')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 border border-gray-200/50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 border border-white/30 shadow-xl text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No appointments scheduled for this period'
              }
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Patient Avatar */}
                  <div className="relative">
                    <img
                      src={appointment.patient.image}
                      alt={appointment.patient.name}
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      appointment.status === 'in-progress' ? 'bg-yellow-500' :
                      appointment.status === 'completed' ? 'bg-green-500' :
                      appointment.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {appointment.patient.name}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status === 'in-progress' ? 'In Progress' : 
                         appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-cyan-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        <span className="truncate">{appointment.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-cyan-600">৳{appointment.fee}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          appointment.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mt-2 truncate">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleViewAppointment(appointment)}
                    className="p-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-600 rounded-xl transition-all duration-200 hover:scale-105"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  
                  {appointment.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'in-progress')}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-all duration-200 hover:scale-105"
                        title="Start Appointment"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                        className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-all duration-200 hover:scale-105"
                        title="Mark Complete"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all duration-200 hover:scale-105"
                        title="Cancel Appointment"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {appointment.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                      className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-all duration-200 hover:scale-105"
                      title="Complete Appointment"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-3xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Appointment Details
              </h2>
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
                  setModalOpen(false);
                }}
                className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div className="bg-gradient-to-r from-gray-50/80 to-white/80 rounded-2xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-cyan-600" />
                  Patient Information
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedAppointment.patient.image}
                    alt={selectedAppointment.patient.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedAppointment.patient.name}</h4>
                    <p className="text-gray-600">{selectedAppointment.patient.age} years old, {selectedAppointment.patient.gender}</p>
                    <p className="text-sm text-gray-500">Blood Type: {selectedAppointment.patient.bloodType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>{selectedAppointment.patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>{selectedAppointment.patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{selectedAppointment.patient.address}</span>
                  </div>
                </div>

                {/* Medical History */}
                {selectedAppointment.patient.medicalHistory.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Medical History:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedAppointment.patient.medicalHistory.map((condition, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergies */}
                {selectedAppointment.patient.allergies.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Allergies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedAppointment.patient.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Appointment Information */}
              <div className="bg-gradient-to-r from-cyan-50/80 to-blue-50/80 rounded-2xl p-6 border border-cyan-200/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cyan-600" />
                  Appointment Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(selectedAppointment.date), 'EEEE, MMMM d, yyyy')} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{selectedAppointment.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status === 'in-progress' ? 'In Progress' : 
                       selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="font-semibold text-gray-900">৳{selectedAppointment.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedAppointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      selectedAppointment.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedAppointment.paymentStatus.charAt(0).toUpperCase() + selectedAppointment.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">Reason for Visit</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.reason}</p>
                </div>

                {selectedAppointment.notes && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="font-semibold text-gray-900">{selectedAppointment.notes}</p>
                  </div>
                )}

                {selectedAppointment.diagnosis && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <p className="font-semibold text-gray-900">{selectedAppointment.diagnosis}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setModalOpen(false);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
                {selectedAppointment.status === 'scheduled' && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedAppointment.id, 'in-progress');
                      setShowAppointmentModal(false);
                      setModalOpen(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Start Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments; 