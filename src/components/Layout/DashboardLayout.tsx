import React, { useState, createContext, useContext } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Clock, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  User,
  Activity,
  DollarSign,
  FileText
} from 'lucide-react';
import { currentDoctor, notifications } from '../../data/mockData';

// Simple context for modal state
const ModalContext = createContext<{
  setModalOpen: (open: boolean) => void;
} | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalContext');
  }
  return context;
};

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Schedule', href: '/schedule', icon: Clock },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Revenue', href: '/revenue', icon: DollarSign },
    { name: 'Prescriptions', href: '/prescriptions', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <ModalContext.Provider value={{ setModalOpen: setIsModalOpen }}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/5 to-blue-200/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

              {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-white/30 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isModalOpen ? '-translate-x-full' : 'lg:translate-x-0'} transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Dr</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Profile Section */}
        <div className="p-6 border-b border-gray-200/50 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentDoctor.image}
                alt={currentDoctor.name}
                className="w-12 h-12 rounded-full object-cover shadow-lg"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${currentDoctor.status === 'active' ? 'bg-green-500' : currentDoctor.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate">{currentDoctor.name}</h3>
              <p className="text-xs text-cyan-600 font-medium">{currentDoctor.specialty}</p>
              <p className="text-xs text-gray-500">{currentDoctor.hospital}</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6 px-3 pb-6">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                        : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-cyan-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout Button - Fixed at bottom */}
        <div className="p-3 border-t border-gray-200/50 flex-shrink-0">
          <button className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200 group">
            <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
            Logout
          </button>
        </div>
      </div>

              {/* Main Content */}
        <div className={`${isModalOpen ? '' : 'lg:pl-64'}`}>
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm relative z-40">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search patients, appointments..."
                  className="pl-10 pr-4 py-2 w-80 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 relative"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 z-[60]">
                    <div className="p-4 border-b border-gray-200/50">
                      <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-200/50 hover:bg-gray-50/80 transition-colors ${
                            !notification.read ? 'bg-cyan-50/50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-cyan-500 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="w-full text-center text-cyan-600 hover:text-cyan-700 font-semibold">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-gray-900">{currentDoctor.name}</p>
                  <p className="text-xs text-gray-500">{currentDoctor.specialty}</p>
                </div>
                <img
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  className="w-8 h-8 rounded-full object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Overlay */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
    </ModalContext.Provider>
  );
};

export default DashboardLayout; 