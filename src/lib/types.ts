// Type definitions for Doctor Consultation Platform

export interface DaySchedule {
  enabled: boolean;
  from: string; // HH:mm format e.g. "09:00"
  to: string;   // HH:mm format e.g. "17:00"
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface Doctor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  qualification: string;
  specialization: string;
  role: string;
  credentials: string;
  image: string;
  gender?: string;
  experience?: string;
  consultationFee?: string;
  bio?: string;
  appointmentDuration?: string;
  schedule: WeeklySchedule;
  isActive: boolean;
  createdAt: string;
}

export type BookingStatus = "Unconfirmed" | "Confirmed" | "Cancelled";

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;       // YYYY-MM-DD
  timeSlot: string;   // HH:mm format
  status: BookingStatus;
  createdAt: string;
}

export interface ClientQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface InsightStats {
  totalDoctors: number;
  totalBookings: number;
  confirmed: number;
  cancelled: number;
  todays: number;
  unconfirmed: number;
  totalQueries: number;
}

export interface TrendDataPoint {
  label: string;
  count: number;
}

export interface InsightResponse {
  stats: InsightStats;
  trend: TrendDataPoint[];
}

export interface Database {
  doctors: Doctor[];
  bookings: Booking[];
  queries: ClientQuery[];
}

// Day names as used in WeeklySchedule keys
export const DAY_NAMES = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
] as const;

export type DayName = typeof DAY_NAMES[number];
