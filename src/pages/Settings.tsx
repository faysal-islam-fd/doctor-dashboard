import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Clock,
  Save,
  RefreshCw,
  Mail,
  MessageSquare,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  CreditCard,
  Database,
  Wifi,
  Languages,
  MapPin
} from 'lucide-react';
import { currentDoctor } from '../data/mockData';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'notifications' | 'security' | 'appearance' | 'data'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      language: 'en',
      timezone: 'Asia/Dhaka',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: '12',
      autoSave: true,
      confirmDeletes: true,
      showTips: true,
    },
    // Notification Settings
    notifications: {
      email: {
        appointments: true,
        cancellations: true,
        reminders: true,
        payments: true,
        marketing: false,
        systemUpdates: true,
      },
      push: {
        appointments: true,
        urgentMessages: true,
        systemAlerts: true,
        newPatients: true,
      },
      sms: {
        appointments: false,
        urgentOnly: true,
        paymentReminders: true,
      },
      sound: {
        enabled: true,
        volume: 70,
        newAppointment: true,
        messageAlert: true,
      }
    },
    // Security Settings
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginNotifications: true,
      passwordExpiry: 90,
      allowMultipleSessions: false,
      ipWhitelist: [],
    },
    // Appearance Settings
    appearance: {
      theme: 'light',
      compactMode: false,
      animationsEnabled: true,
      fontSize: 'medium',
      sidebarCollapsed: false,
      dashboardLayout: 'default',
    },
    // Data & Privacy
    data: {
      dataRetention: '7years',
      anonymizeData: false,
      shareAnalytics: true,
      backupFrequency: 'daily',
      exportFormat: 'pdf',
    }
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (section: string, subsection: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Here you would typically save to backend
  };

  const resetToDefaults = () => {
    // Reset logic here
    console.log('Resetting to defaults');
    setHasChanges(false);
  };

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Customize your dashboard preferences and system configuration
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Unsaved changes</span>
            </div>
          )}
          <button
            onClick={resetToDefaults}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button
            onClick={saveSettings}
            disabled={!hasChanges}
            className={`inline-flex items-center px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
              hasChanges
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl sticky top-6">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-xl">
            
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">General Settings</h2>
                </div>

                {/* Language & Region */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Language & Region
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => updateSetting('general', 'language', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select
                        value={settings.general.dateFormat}
                        onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                        <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                      <select
                        value={settings.general.timeFormat}
                        onChange={(e) => updateSetting('general', 'timeFormat', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="12">12-hour (AM/PM)</option>
                        <option value="24">24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* System Preferences */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    System Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'autoSave', label: 'Auto-save changes', description: 'Automatically save form changes as you type' },
                      { key: 'confirmDeletes', label: 'Confirm deletions', description: 'Show confirmation dialog before deleting items' },
                      { key: 'showTips', label: 'Show helpful tips', description: 'Display helpful tooltips and guidance' },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.general[setting.key as keyof typeof settings.general] as boolean}
                            onChange={(e) => updateSetting('general', setting.key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                </div>

                {/* Email Notifications */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <p className="text-sm text-gray-600">Receive email notifications for {key.toLowerCase()}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={value}
                            onChange={(e) => updateNestedSetting('notifications', 'email', key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Push Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <p className="text-sm text-gray-600">Browser notifications for {key.toLowerCase()}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={value}
                            onChange={(e) => updateNestedSetting('notifications', 'push', key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sound Settings */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2 flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Sound Settings
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Enable Sounds</h4>
                        <p className="text-sm text-gray-600">Play notification sounds</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.notifications.sound.enabled}
                          onChange={(e) => updateNestedSetting('notifications', 'sound', 'enabled', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-gray-50/50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Volume</h4>
                        <span className="text-sm text-gray-600">{settings.notifications.sound.volume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.notifications.sound.volume}
                        onChange={(e) => updateNestedSetting('notifications', 'sound', 'volume', parseInt(e.target.value))}
                        disabled={!settings.notifications.sound.enabled}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                </div>

                {/* Authentication */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Authentication
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                          <option value={480}>8 hours</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                        <select
                          value={settings.security.passwordExpiry}
                          onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                        >
                          <option value={30}>30 days</option>
                          <option value={60}>60 days</option>
                          <option value={90}>90 days</option>
                          <option value={180}>180 days</option>
                          <option value={365}>1 year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Privacy & Access
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'loginNotifications', label: 'Login notifications', description: 'Get notified when someone logs into your account' },
                      { key: 'allowMultipleSessions', label: 'Allow multiple sessions', description: 'Allow logging in from multiple devices simultaneously' },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.security[setting.key as keyof typeof settings.security] as boolean}
                            onChange={(e) => updateSetting('security', setting.key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
                </div>

                {/* Theme */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Theme & Layout
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'light', label: 'Light', icon: Sun },
                          { value: 'dark', label: 'Dark', icon: Moon },
                        ].map((theme) => (
                          <button
                            key={theme.value}
                            onClick={() => updateSetting('appearance', 'theme', theme.value)}
                            className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                              settings.appearance.theme === theme.value
                                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <theme.icon className="w-5 h-5" />
                            <span className="font-medium">{theme.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="extra-large">Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Interface Options */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Interface Options
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'compactMode', label: 'Compact mode', description: 'Use smaller spacing and elements for more content' },
                      { key: 'animationsEnabled', label: 'Enable animations', description: 'Show smooth transitions and animations' },
                      { key: 'sidebarCollapsed', label: 'Collapse sidebar by default', description: 'Start with the sidebar minimized' },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.appearance[setting.key as keyof typeof settings.appearance] as boolean}
                            onChange={(e) => updateSetting('appearance', setting.key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data & Privacy */}
            {activeSection === 'data' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Data & Privacy</h2>
                </div>

                {/* Data Management */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Data Management
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                      <select
                        value={settings.data.dataRetention}
                        onChange={(e) => updateSetting('data', 'dataRetention', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="1year">1 Year</option>
                        <option value="3years">3 Years</option>
                        <option value="5years">5 Years</option>
                        <option value="7years">7 Years</option>
                        <option value="forever">Forever</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                      <select
                        value={settings.data.backupFrequency}
                        onChange={(e) => updateSetting('data', 'backupFrequency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Export & Backup */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Export & Backup
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                      <Download className="w-5 h-5" />
                      <span>Export Data</span>
                    </button>
                    
                    <button className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                      <Upload className="w-5 h-5" />
                      <span>Import Data</span>
                    </button>

                    <button className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                      <Database className="w-5 h-5" />
                      <span>Backup Now</span>
                    </button>
                  </div>
                </div>

                {/* Privacy Options */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200/50 pb-2">
                    Privacy Options
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'anonymizeData', label: 'Anonymize exported data', description: 'Remove personal identifiers from exported data' },
                      { key: 'shareAnalytics', label: 'Share anonymous analytics', description: 'Help improve the platform by sharing usage data' },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.data[setting.key as keyof typeof settings.data] as boolean}
                            onChange={(e) => updateSetting('data', setting.key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-red-600 border-b border-red-200 pb-2">
                    Danger Zone
                  </h3>
                  
                  <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 mb-2">Delete All Data</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Permanently delete all your data including patients, appointments, and settings. This action cannot be undone.
                        </p>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete All Data</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 