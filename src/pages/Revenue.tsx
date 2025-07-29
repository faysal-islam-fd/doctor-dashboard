import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Download,
  Eye,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { dashboardStats } from '../data/mockData';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfYear } from 'date-fns';

const Revenue: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showDetails, setShowDetails] = useState(false);

  // Generate revenue data based on time range
  const generateRevenueData = () => {
    const now = new Date();
    let dateRange: Date[] = [];
    
    switch (timeRange) {
      case 'week':
        dateRange = eachDayOfInterval({ start: subDays(now, 6), end: now });
        break;
      case 'month':
        dateRange = eachDayOfInterval({ start: startOfMonth(now), end: endOfMonth(now) });
        break;
      case 'quarter':
        dateRange = eachDayOfInterval({ start: subDays(now, 90), end: now });
        break;
      case 'year':
        dateRange = eachDayOfInterval({ start: startOfYear(now), end: now });
        break;
    }
    
    return dateRange.map(date => ({
      date: format(date, timeRange === 'week' ? 'EEE' : 'MMM dd'),
      revenue: Math.floor(Math.random() * 8000) + 2000,
      appointments: Math.floor(Math.random() * 15) + 5,
      consultations: Math.floor(Math.random() * 10) + 3,
      followups: Math.floor(Math.random() * 5) + 2,
    }));
  };

  const revenueTimeData = generateRevenueData();

  // Payment method distribution
  const paymentMethods = [
    { name: 'Cash', value: 45, amount: 125000, color: '#10B981' },
    { name: 'Card', value: 35, amount: 97000, color: '#3B82F6' },
    { name: 'Mobile Banking', value: 15, amount: 42000, color: '#8B5CF6' },
    { name: 'Bank Transfer', value: 5, amount: 14000, color: '#F59E0B' },
  ];

  // Service type revenue
  const serviceRevenue = [
    { service: 'Consultation', revenue: 180000, percentage: 65, sessions: 150 },
    { service: 'Follow-up', revenue: 56000, percentage: 20, sessions: 70 },
    { service: 'Emergency', revenue: 28000, percentage: 10, sessions: 14 },
    { service: 'Surgery', revenue: 14000, percentage: 5, sessions: 2 },
  ];

  // Monthly targets vs achievement
  const monthlyTargets = [
    { month: 'Jan', target: 200000, actual: 185000 },
    { month: 'Feb', target: 220000, actual: 210000 },
    { month: 'Mar', target: 200000, actual: 195000 },
    { month: 'Apr', target: 250000, actual: 240000 },
    { month: 'May', target: 230000, actual: 235000 },
    { month: 'Jun', target: 240000, actual: 245000 },
  ];

  // Key financial metrics
  const financialMetrics = [
    {
      title: 'Total Revenue',
      value: `৳${dashboardStats.revenue.thisMonth.toLocaleString()}`,
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      subtitle: 'This month'
    },
    {
      title: 'Average per Patient',
      value: '৳1,250',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      subtitle: 'Per consultation'
    },
    {
      title: 'Pending Payments',
      value: '৳45,000',
      change: '-12%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50',
      subtitle: '24 invoices'
    },
    {
      title: 'Monthly Target',
      value: '96%',
      change: '+8%',
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      subtitle: 'Goal achievement'
    },
  ];

  // Recent transactions
  const recentTransactions = [
    { id: 1, patient: 'John Doe', amount: 1200, method: 'Card', type: 'Consultation', date: '2024-01-20', status: 'completed' },
    { id: 2, patient: 'Maria Garcia', amount: 800, method: 'Cash', type: 'Follow-up', date: '2024-01-20', status: 'completed' },
    { id: 3, patient: 'Ahmed Rahman', amount: 1500, method: 'Mobile Banking', type: 'Emergency', date: '2024-01-19', status: 'pending' },
    { id: 4, patient: 'Lisa Wang', amount: 1200, method: 'Bank Transfer', type: 'Consultation', date: '2024-01-19', status: 'completed' },
    { id: 5, patient: 'Michael Chen', amount: 800, method: 'Card', type: 'Follow-up', date: '2024-01-18', status: 'completed' },
  ];

  const totalRevenue = revenueTimeData.reduce((sum, item) => sum + item.revenue, 0);
  const averageDaily = Math.round(totalRevenue / revenueTimeData.length);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Revenue Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track your financial performance and earnings
          </p>
        </div>
        <div className="flex items-center space-x-3">           <button 
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center px-4 py-2 bg-white/60 hover:bg-white/80 border border-gray-200 rounded-xl transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-white/60 hover:bg-white/80 border border-gray-200 rounded-xl transition-all duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-2xl font-bold text-gray-900">
                ৳{totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+15% vs last period</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Daily average: ৳{averageDaily.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueTimeData}>
            <defs>
              <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
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
              formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              fill="url(#revenueAreaGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
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
                <p className="text-xs text-gray-500 mb-2">{metric.subtitle}</p>
                <div className="flex items-center">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h3>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{method.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">৳{method.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{method.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Revenue Breakdown */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue by Service</h3>
          <div className="space-y-4">
            {serviceRevenue.map((service) => (
              <div key={service.service} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">{service.service}</span>
                    <div className="text-xs text-gray-500">{service.sessions} sessions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">৳{service.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{service.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target vs Achievement */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Targets vs Achievement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyTargets}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                border: 'none', 
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }} 
              formatter={(value: number) => `৳${value.toLocaleString()}`}
            />
            <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" fill="#06b6d4" name="Actual" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      {showDetails && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
            <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100/50 hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{transaction.patient}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">৳{transaction.amount.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">{transaction.method}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">{transaction.type}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">{format(new Date(transaction.date), 'MMM dd, yyyy')}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue; 