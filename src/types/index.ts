export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  qualification: string;
  hospital: string;
  image: string;
  rating: number;
  consultationFee: number;
  totalPatients: number;
  completedAppointments: number;
  joinedDate: string;
  status: 'active' | 'offline' | 'busy';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  lastVisit: string;
  totalVisits: number;
  image?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribed: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'in-progress';
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine-checkup';
  reason: string;
  notes?: string;
  diagnosis?: string;
  prescription?: Prescription[];
  fee: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  appointmentId?: string;
}

export interface Schedule {
  date: string;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  completedToday: number;
  revenue: {
    today: number;
    thisMonth: number;
    thisYear: number;
  };
  upcomingAppointments: number;
  patientSatisfaction: number;
  averageWaitTime: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  appointments: number;
}

export interface AppointmentTrend {
  date: string;
  completed: number;
  cancelled: number;
  scheduled: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface DoctorSettings {
  id: string;
  notifications: {
    email: boolean;
    sms: boolean;
    appointment: boolean;
    payment: boolean;
    marketing: boolean;
  };
  schedule: {
    workingDays: string[];
    startTime: string;
    endTime: string;
    slotDuration: number;
    breakTime: {
      start: string;
      end: string;
    };
  };
  consultation: {
    fee: number;
    duration: number;
    followUpDiscount: number;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showRating: boolean;
    showExperience: boolean;
  };
} 