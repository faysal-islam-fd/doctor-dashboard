import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Star,
  Download,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { mockPatients } from '../data/mockData';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'appointments' | 'revenue' | 'patients'>('appointments');

  // Generate performance data based on time range
  const generatePerformanceData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const startDate = subDays(new Date(), days);
    const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
    
    return dateRange.map(date => ({
      date: format(date, 'MMM dd'),
      appointments: Math.floor(Math.random() * 12) + 3,
      revenue: Math.floor(Math.random() * 5000) + 2000,
      patients: Math.floor(Math.random() * 8) + 2,
    }));
  };

  const performanceData = generatePerformanceData();

  // Patient demographics
  const patientDemographics = [
    { name: 'Male', value: mockPatients.filter(p => p.gender === 'male').length, color: '#3B82F6' },
    { name: 'Female', value: mockPatients.filter(p => p.gender === 'female').length, color: '#EC4899' },
    { name: 'Other', value: mockPatients.filter(p => p.gender === 'other').length, color: '#8B5CF6' },
  ];

  // Appointment status distribution
  const appointmentStatusData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'Scheduled', value: 25, color: '#3B82F6' },
    { name: 'Cancelled', value: 7, color: '#EF4444' },
    { name: 'No Show', value: 3, color: '#F59E0B' },
  ];

  // Age group distribution
  const ageGroupData = [
    { group: '0-18', count: 12, percentage: 15 },
    { group: '19-35', count: 28, percentage: 35 },
    { group: '36-50', count: 20, percentage: 25 },
    { group: '51-65', count: 16, percentage: 20 },
    { group: '65+', count: 4, percentage: 5 },
  ];

  // Key metrics
  const keyMetrics = [
    {
      title: 'Patient Satisfaction',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50',
    },
    {
      title: 'Avg. Consultation Time',
      value: '28min',
      change: '-3min',
      changeType: 'positive',
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Patient Retention',
      value: '89%',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Revenue Growth',
      value: '+18%',
      change: '+3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
    },
  ];

  // Weekly hour distribution
  const weeklyHoursData = [
    { day: 'Mon', hours: 8.5, patients: 12 },
    { day: 'Tue', hours: 9.0, patients: 14 },
    { day: 'Wed', hours: 7.5, patients: 10 },
    { day: 'Thu', hours: 8.0, patients: 11 },
    { day: 'Fri', hours: 8.5, patients: 13 },
    { day: 'Sat', hours: 4.0, patients: 6 },
    { day: 'Sun', hours: 0, patients: 0 },
  ];

  const getCurrentValue = () => {
    switch (selectedMetric) {
      case 'revenue':
        return performanceData[performanceData.length - 1]?.revenue || 0;
      case 'patients':
        return performanceData[performanceData.length - 1]?.patients || 0;
      default:
        return performanceData[performanceData.length - 1]?.appointments || 0;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your practice performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-white/60 hover:bg-white/80 border border-gray-200 rounded-xl transition-all duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-white/60 hover:bg-white/80 border border-gray-200 rounded-xl transition-all duration-200">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
          <div className="flex items-center space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(['appointments', 'revenue', 'patients'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                selectedMetric === metric
                  ? 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border border-cyan-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{selectedMetric} Trend</h3>
            <p className="text-2xl font-bold text-gray-900">
              {selectedMetric === 'revenue' ? `৳${getCurrentValue().toLocaleString()}` : getCurrentValue()}
              <span className="text-sm font-normal text-green-600 ml-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +12% vs previous period
              </span>
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#06b6d4" 
                strokeWidth={3}
                fill="url(#metricGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div
            key={metric.title}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.bgColor} mb-4`}>
                  <metric.icon className={`w-6 h-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Demographics */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Demographics</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={patientDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {patientDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {patientDemographics.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Appointment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {appointmentStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Hours */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Working Hours & Patients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Bar dataKey="hours" fill="#06b6d4" name="Hours" radius={[4, 4, 0, 0]} />
              <Bar dataKey="patients" fill="#3b82f6" name="Patients" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Distribution */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Age Groups</h3>
          <div className="space-y-4">
            {ageGroupData.map((group) => (
              <div key={group.group} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{group.group}</span>
                  <span className="text-sm font-semibold text-gray-900">{group.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${group.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{group.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 