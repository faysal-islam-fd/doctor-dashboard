import type { Doctor } from '../types/index';
import type { Patient } from '../types/index';
import type { Appointment } from '../types/index';
import type { DashboardStats } from '../types/index';
import type { RevenueData } from '../types/index';
import type { AppointmentTrend } from '../types/index';
import type { Notification } from '../types/index';

export const currentDoctor: Doctor = {
  id: 'dr-001',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@hospital.com',
  phone: '+880 1234567890',
  specialty: 'Cardiology',
  experience: '15 years',
  qualification: 'MBBS, MD (Cardiology)',
  hospital: 'Dhaka Medical College Hospital',
  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  rating: 4.8,
  consultationFee: 1200,
  totalPatients: 2840,
  completedAppointments: 5670,
  joinedDate: '2020-01-15',
  status: 'active'
};

export const mockPatients: Patient[] = [
  {
    id: 'pat-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+880 1987654321',
    age: 35,
    gender: 'male',
    bloodType: 'A+',
    address: 'Dhanmondi, Dhaka',
    emergencyContact: '+880 1876543210',
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    lastVisit: '2024-01-10',
    totalVisits: 8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pat-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+880 1234567891',
    age: 28,
    gender: 'female',
    bloodType: 'B+',
    address: 'Gulshan, Dhaka',
    emergencyContact: '+880 1765432109',
    medicalHistory: ['Migraine'],
    allergies: ['Latex'],
    currentMedications: ['Sumatriptan 50mg'],
    lastVisit: '2024-01-15',
    totalVisits: 4,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pat-003',
    name: 'Ahmed Rahman',
    email: 'ahmed.rahman@email.com',
    phone: '+880 1345678912',
    age: 45,
    gender: 'male',
    bloodType: 'O-',
    address: 'Uttara, Dhaka',
    emergencyContact: '+880 1654321098',
    medicalHistory: ['Heart Disease', 'High Cholesterol'],
    allergies: [],
    currentMedications: ['Atorvastatin 20mg', 'Aspirin 81mg'],
    lastVisit: '2024-01-08',
    totalVisits: 12,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pat-004',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    phone: '+880 1456789123',
    age: 32,
    gender: 'female',
    bloodType: 'AB+',
    address: 'Banani, Dhaka',
    emergencyContact: '+880 1543210987',
    medicalHistory: ['Asthma'],
    allergies: ['Dust mites', 'Pollen'],
    currentMedications: ['Albuterol inhaler'],
    lastVisit: '2024-01-12',
    totalVisits: 6,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pat-005',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+880 1567891234',
    age: 29,
    gender: 'male',
    bloodType: 'A-',
    address: 'Mirpur, Dhaka',
    emergencyContact: '+880 1432109876',
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    lastVisit: '2024-01-14',
    totalVisits: 2,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'app-001',
    patientId: 'pat-001',
    patient: mockPatients[0],
    doctorId: 'dr-001',
    date: '2024-01-20',
    time: '09:00 AM',
    duration: 30,
    status: 'scheduled',
    type: 'consultation',
    reason: 'Chest pain and shortness of breath',
    fee: 1200,
    paymentStatus: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'app-002',
    patientId: 'pat-002',
    patient: mockPatients[1],
    doctorId: 'dr-001',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: 30,
    status: 'scheduled',
    type: 'follow-up',
    reason: 'Follow-up for migraine treatment',
    fee: 800,
    paymentStatus: 'paid',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 'app-003',
    patientId: 'pat-003',
    patient: mockPatients[2],
    doctorId: 'dr-001',
    date: '2024-01-20',
    time: '11:00 AM',
    duration: 45,
    status: 'in-progress',
    type: 'consultation',
    reason: 'Cardiac evaluation and ECG',
    fee: 1500,
    paymentStatus: 'paid',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'app-004',
    patientId: 'pat-004',
    patient: mockPatients[3],
    doctorId: 'dr-001',
    date: '2024-01-20',
    time: '02:00 PM',
    duration: 30,
    status: 'scheduled',
    type: 'routine-checkup',
    reason: 'Annual health checkup',
    fee: 1200,
    paymentStatus: 'pending',
    createdAt: '2024-01-16T14:00:00Z',
    updatedAt: '2024-01-16T14:00:00Z'
  },
  {
    id: 'app-005',
    patientId: 'pat-005',
    patient: mockPatients[4],
    doctorId: 'dr-001',
    date: '2024-01-19',
    time: '03:00 PM',
    duration: 30,
    status: 'completed',
    type: 'consultation',
    reason: 'General consultation',
    notes: 'Patient reported feeling better after treatment',
    diagnosis: 'Minor viral infection',
    fee: 1200,
    paymentStatus: 'paid',
    createdAt: '2024-01-17T15:00:00Z',
    updatedAt: '2024-01-19T15:30:00Z'
  },
  {
    id: 'app-006',
    patientId: 'pat-001',
    patient: mockPatients[0],
    doctorId: 'dr-001',
    date: '2024-01-21',
    time: '09:00 AM',
    duration: 30,
    status: 'scheduled',
    type: 'follow-up',
    reason: 'Follow-up cardiac consultation',
    fee: 800,
    paymentStatus: 'pending',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  totalPatients: 2840,
  todayAppointments: 8,
  completedToday: 3,
  revenue: {
    today: 3600,
    thisMonth: 125000,
    thisYear: 980000
  },
  upcomingAppointments: 5,
  patientSatisfaction: 4.8,
  averageWaitTime: 12
};

export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 85000, appointments: 120 },
  { month: 'Feb', revenue: 92000, appointments: 135 },
  { month: 'Mar', revenue: 78000, appointments: 110 },
  { month: 'Apr', revenue: 105000, appointments: 145 },
  { month: 'May', revenue: 98000, appointments: 140 },
  { month: 'Jun', revenue: 115000, appointments: 160 },
  { month: 'Jul', revenue: 125000, appointments: 175 },
  { month: 'Aug', revenue: 135000, appointments: 185 },
  { month: 'Sep', revenue: 118000, appointments: 165 },
  { month: 'Oct', revenue: 142000, appointments: 195 },
  { month: 'Nov', revenue: 155000, appointments: 210 },
  { month: 'Dec', revenue: 125000, appointments: 175 }
];

export const appointmentTrends: AppointmentTrend[] = [
  { date: '2024-01-14', completed: 8, cancelled: 1, scheduled: 10 },
  { date: '2024-01-15', completed: 6, cancelled: 2, scheduled: 8 },
  { date: '2024-01-16', completed: 9, cancelled: 0, scheduled: 12 },
  { date: '2024-01-17', completed: 7, cancelled: 1, scheduled: 9 },
  { date: '2024-01-18', completed: 10, cancelled: 1, scheduled: 11 },
  { date: '2024-01-19', completed: 8, cancelled: 2, scheduled: 10 },
  { date: '2024-01-20', completed: 3, cancelled: 0, scheduled: 8 }
];

export const notifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New Appointment Request',
    message: 'John Doe has requested an appointment for tomorrow at 2:00 PM',
    type: 'appointment',
    read: false,
    createdAt: '2024-01-20T08:30:00Z',
    actionUrl: '/appointments'
  },
  {
    id: 'notif-002',
    title: 'Payment Received',
    message: 'Payment of ৳1,200 received from Maria Garcia',
    type: 'payment',
    read: false,
    createdAt: '2024-01-20T07:45:00Z'
  },
  {
    id: 'notif-003',
    title: 'Appointment Reminder',
    message: 'You have 3 appointments scheduled for today',
    type: 'reminder',
    read: true,
    createdAt: '2024-01-20T07:00:00Z',
    actionUrl: '/schedule'
  },
  {
    id: 'notif-004',
    title: 'System Update',
    message: 'Dashboard has been updated with new features',
    type: 'system',
    read: true,
    createdAt: '2024-01-19T16:00:00Z'
  }
]; 