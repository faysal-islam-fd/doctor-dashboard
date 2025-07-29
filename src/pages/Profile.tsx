import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Phone, 
  Mail, 
  Award,
  BookOpen,
  Clock,
  Star,
  Users,
  Activity,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { currentDoctor, dashboardStats } from '../data/mockData';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'professional' | 'security'>('profile');

  const [formData, setFormData] = useState({
    name: currentDoctor.name,
    email: currentDoctor.email,
    phone: currentDoctor.phone,
    specialty: currentDoctor.specialty,
    experience: currentDoctor.experience,
    qualification: currentDoctor.qualification,
    hospital: currentDoctor.hospital,
    consultationFee: currentDoctor.consultationFee,
    bio: 'Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology and preventive heart care. Committed to providing comprehensive cardiac care with a patient-centered approach.',
    languages: ['English', 'Bengali', 'Hindi'],
    availability: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    setShowPasswordFields(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: currentDoctor.name,
      email: currentDoctor.email,
      phone: currentDoctor.phone,
      specialty: currentDoctor.specialty,
      experience: currentDoctor.experience,
      qualification: currentDoctor.qualification,
      hospital: currentDoctor.hospital,
      consultationFee: currentDoctor.consultationFee,
      bio: 'Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology and preventive heart care. Committed to providing comprehensive cardiac care with a patient-centered approach.',
      languages: ['English', 'Bengali', 'Hindi'],
      availability: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
    setShowPasswordFields(false);
  };

  const achievements = [
    { title: 'Board Certified Cardiologist', year: '2009', icon: Award },
    { title: 'Fellowship in Interventional Cardiology', year: '2011', icon: BookOpen },
    { title: 'Best Doctor Award', year: '2020', icon: Star },
    { title: 'Published 25+ Research Papers', year: '2023', icon: BookOpen },
  ];

  const stats = [
    { label: 'Total Patients', value: dashboardStats.totalPatients.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Years Experience', value: '15+', icon: Clock, color: 'text-green-600' },
    { label: 'Patient Rating', value: currentDoctor.rating.toString(), icon: Star, color: 'text-yellow-600' },
    { label: 'Appointments', value: dashboardStats.todayAppointments?.toLocaleString() || '5,670', icon: Activity, color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Doctor Profile
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your professional profile and settings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'professional', label: 'Professional Details', icon: Award },
            { id: 'security', label: 'Security Settings', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-cyan-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Information Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${currentDoctor.status === 'active' ? 'bg-green-500' : currentDoctor.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">{formData.name}</h3>
              <p className="text-cyan-600 font-medium">{formData.specialty}</p>
              <p className="text-gray-500 text-sm">{formData.hospital}</p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-gray-50/50 rounded-lg">
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{formData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{formData.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-900">{formData.bio}</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              ) : (
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{formData.availability}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Professional Details Tab */}
      {activeTab === 'professional' && (
        <div className="space-y-8">
          {/* Professional Information */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">{formData.specialty}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">{formData.experience}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">{formData.qualification}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Clinic</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">{formData.hospital}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (৳)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => handleInputChange('consultationFee', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">৳{formData.consultationFee.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">{format(new Date(currentDoctor.joinedDate), 'MMMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="space-y-8">
          {/* Password Change */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Password & Security</h3>
            
            {!showPasswordFields ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">Password</h4>
                      <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasswordFields(true)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowPasswordFields(false);
                      handleInputChange('currentPassword', '');
                      handleInputChange('newPassword', '');
                      handleInputChange('confirmPassword', '');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log('Updating password...');
                      setShowPasswordFields(false);
                      handleInputChange('currentPassword', '');
                      handleInputChange('newPassword', '');
                      handleInputChange('confirmPassword', '');
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', description: 'Receive appointment and system updates via email' },
                { label: 'SMS Notifications', description: 'Get important updates via text message' },
                { label: 'Push Notifications', description: 'Browser notifications for urgent matters' },
                { label: 'Marketing Communications', description: 'Receive promotional content and updates' },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{setting.label}</h4>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 