// Hybrid Supabase + Local JSON fallback database helpers for Doctor Consultation Platform
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "./supabase";
import type {
  Database,
  Doctor,
  Booking,
  ClientQuery,
  BookingStatus,
  InsightStats,
  TrendDataPoint,
  WeeklySchedule,
} from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

// --- Local JSON File helpers ---

function readLocalDb(): Database {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        doctors: parsed.doctors || [],
        bookings: parsed.bookings || [],
        queries: parsed.queries || []
      };
    }
  } catch (e) {
    console.error("Failed to read local db.json", e);
  }
  return { doctors: [], bookings: [], queries: [] };
}

function writeLocalDb(db: Database): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local db.json", e);
  }
}

// --- Doctors ---

export async function getDoctors(activeOnly = false): Promise<Doctor[]> {
  try {
    let query = supabaseAdmin.from("doctors").select("*").order("created_at", { ascending: true });
    if (activeOnly) query = query.eq("is_active", true);
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      const localDb = readLocalDb();
      return activeOnly ? localDb.doctors.filter(d => d.isActive !== false) : localDb.doctors;
    }
    return (data || []).map(mapDoctor);
  } catch {
    const localDb = readLocalDb();
    return activeOnly ? localDb.doctors.filter(d => d.isActive !== false) : localDb.doctors;
  }
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) {
      const local = readLocalDb().doctors.find(d => d.id === id);
      return local || null;
    }
    return mapDoctor(data);
  } catch {
    const local = readLocalDb().doctors.find(d => d.id === id);
    return local || null;
  }
}

export async function addDoctor(
  doctor: Omit<Doctor, "id" | "createdAt" | "isActive">
): Promise<Doctor> {
  try {
    const { data, error } = await supabaseAdmin
      .from("doctors")
      .insert({
        name: doctor.name,
        qualification: doctor.qualification,
        specialization: doctor.specialization,
        role: doctor.role || "",
        credentials: doctor.credentials || "",
        image: doctor.image || "",
        schedule: doctor.schedule,
        is_active: true,
      })
      .select()
      .single();
    if (error || !data) {
      return addDoctorLocal(doctor);
    }
    // Also sync to local db for instant backup
    addDoctorLocal(doctor);
    return mapDoctor(data);
  } catch {
    return addDoctorLocal(doctor);
  }
}

function addDoctorLocal(doctor: Omit<Doctor, "id" | "createdAt" | "isActive">): Doctor {
  const db = readLocalDb();
  const newDoctor: Doctor = {
    ...doctor,
    id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  db.doctors.push(newDoctor);
  writeLocalDb(db);
  return newDoctor;
}

export async function updateDoctor(
  id: string,
  updates: Partial<Omit<Doctor, "id" | "createdAt">>
): Promise<Doctor | null> {
  try {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.qualification !== undefined) dbUpdates.qualification = updates.qualification;
    if (updates.specialization !== undefined) dbUpdates.specialization = updates.specialization;
    if (updates.role !== undefined) dbUpdates.role = updates.role;
    if (updates.credentials !== undefined) dbUpdates.credentials = updates.credentials;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.schedule !== undefined) dbUpdates.schedule = updates.schedule;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    const { data, error } = await supabaseAdmin
      .from("doctors")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single();

    updateDoctorLocal(id, updates);

    if (error || !data) {
      return updateDoctorLocal(id, updates);
    }
    return mapDoctor(data);
  } catch {
    return updateDoctorLocal(id, updates);
  }
}

function updateDoctorLocal(id: string, updates: Partial<Omit<Doctor, "id" | "createdAt">>): Doctor | null {
  const db = readLocalDb();
  const idx = db.doctors.findIndex(d => d.id === id);
  if (idx === -1) return null;
  db.doctors[idx] = { ...db.doctors[idx], ...updates };
  writeLocalDb(db);
  return db.doctors[idx];
}

export async function deleteDoctor(id: string): Promise<boolean> {
  return (await updateDoctor(id, { isActive: false })) !== null;
}

// --- Bookings ---

export async function getBookings(filters?: {
  status?: BookingStatus;
  doctorId?: string;
  date?: string;
}): Promise<Booking[]> {
  try {
    let query = supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.doctorId) query = query.eq("doctor_id", filters.doctorId);
    if (filters?.date) query = query.eq("date", filters.date);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getBookingsLocal(filters);
    }
    return (data || []).map(mapBooking);
  } catch {
    return getBookingsLocal(filters);
  }
}

function getBookingsLocal(filters?: { status?: BookingStatus; doctorId?: string; date?: string }): Booking[] {
  let list = readLocalDb().bookings || [];
  if (filters?.status && (filters.status as string) !== "All") {
    list = list.filter(b => b.status === filters.status);
  }
  if (filters?.doctorId) list = list.filter(b => b.doctorId === filters.doctorId);
  if (filters?.date) list = list.filter(b => b.date === filters.date);
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const { data, error } = await supabaseAdmin.from("bookings").select("*").eq("id", id).single();
    if (error || !data) {
      return readLocalDb().bookings.find(b => b.id === id) || null;
    }
    return mapBooking(data);
  } catch {
    return readLocalDb().bookings.find(b => b.id === id) || null;
  }
}

export async function addBooking(
  booking: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        doctor_id: booking.doctorId,
        doctor_name: booking.doctorName,
        client_name: booking.clientName,
        client_email: booking.clientEmail,
        client_phone: booking.clientPhone,
        date: booking.date,
        time_slot: booking.timeSlot,
        status: "Unconfirmed",
      })
      .select()
      .single();

    // Always keep local db in sync!
    const local = addBookingLocal(booking);

    if (error || !data) {
      return local;
    }
    return mapBooking(data);
  } catch {
    return addBookingLocal(booking);
  }
}

function addBookingLocal(booking: Omit<Booking, "id" | "createdAt" | "status">): Booking {
  const db = readLocalDb();
  const newBooking: Booking = {
    ...booking,
    id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "Unconfirmed",
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(newBooking);
  writeLocalDb(db);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    updateBookingStatusLocal(id, status);

    if (error || !data) {
      return updateBookingStatusLocal(id, status);
    }
    return mapBooking(data);
  } catch {
    return updateBookingStatusLocal(id, status);
  }
}

function updateBookingStatusLocal(id: string, status: BookingStatus): Booking | null {
  const db = readLocalDb();
  const idx = db.bookings.findIndex(b => b.id === id);
  if (idx === -1) return null;
  db.bookings[idx].status = status;
  writeLocalDb(db);
  return db.bookings[idx];
}

export async function getConfirmedSlots(
  doctorId: string,
  date: string
): Promise<string[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("time_slot")
      .eq("doctor_id", doctorId)
      .eq("date", date)
      .eq("status", "Confirmed");

    if (error || !data || data.length === 0) {
      return readLocalDb().bookings
        .filter(b => b.doctorId === doctorId && b.date === date && b.status === "Confirmed")
        .map(b => b.timeSlot);
    }
    return (data || []).map((b) => b.time_slot);
  } catch {
    return readLocalDb().bookings
      .filter(b => b.doctorId === doctorId && b.date === date && b.status === "Confirmed")
      .map(b => b.timeSlot);
  }
}

// --- Client Queries ---

export async function getQueries(): Promise<ClientQuery[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("queries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return readLocalDb().queries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return (data || []).map(mapQuery);
  } catch {
    return readLocalDb().queries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export async function addQuery(
  query: Omit<ClientQuery, "id" | "createdAt">
): Promise<ClientQuery> {
  try {
    const { data, error } = await supabaseAdmin
      .from("queries")
      .insert({
        name: query.name,
        email: query.email || "",
        phone: query.phone || "",
        message: query.message,
      })
      .select()
      .single();

    addQueryLocal(query);

    if (error || !data) {
      return addQueryLocal(query);
    }
    return mapQuery(data);
  } catch {
    return addQueryLocal(query);
  }
}

function addQueryLocal(query: Omit<ClientQuery, "id" | "createdAt">): ClientQuery {
  const db = readLocalDb();
  const newQuery: ClientQuery = {
    ...query,
    id: `qry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  db.queries.push(newQuery);
  writeLocalDb(db);
  return newQuery;
}

// --- Insights ---

export async function getInsightStats(): Promise<InsightStats> {
  const today = new Date().toISOString().split("T")[0];

  try {
    const [confirmed, cancelled, todays, unconfirmed, doctors, allBookings, queries] = await Promise.all([
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "Confirmed"),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "Cancelled"),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("date", today),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "Unconfirmed"),
      supabaseAdmin.from("doctors").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("queries").select("id", { count: "exact", head: true }),
    ]);

    // If Supabase returned any error or counts are null, fallback to local DB!
    if (confirmed.error || confirmed.count === null) {
      return getInsightStatsLocal();
    }

    return {
      totalDoctors: doctors.count || 0,
      totalBookings: allBookings.count || 0,
      confirmed: confirmed.count || 0,
      cancelled: cancelled.count || 0,
      todays: todays.count || 0,
      unconfirmed: unconfirmed.count || 0,
      totalQueries: queries.count || 0,
    };
  } catch {
    return getInsightStatsLocal();
  }
}

function getInsightStatsLocal(): InsightStats {
  const db = readLocalDb();
  const today = new Date().toISOString().split("T")[0];
  const activeDocs = db.doctors.filter(d => d.isActive !== false);
  const bookings = db.bookings || [];
  return {
    totalDoctors: activeDocs.length,
    totalBookings: bookings.length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    cancelled: bookings.filter(b => b.status === "Cancelled").length,
    todays: bookings.filter(b => b.date === today).length,
    unconfirmed: bookings.filter(b => b.status === "Unconfirmed").length,
    totalQueries: (db.queries || []).length,
  };
}

export async function getBookingTrend(
  filter: "day" | "month",
  specificDate?: string
): Promise<TrendDataPoint[]> {
  try {
    const { data: allBookings, error } = await supabaseAdmin
      .from("bookings")
      .select("date, time_slot");

    if (error || !allBookings || allBookings.length === 0) {
      return getBookingTrendLocal(filter, specificDate);
    }

    return calculateTrend(allBookings, filter, specificDate);
  } catch {
    return getBookingTrendLocal(filter, specificDate);
  }
}

function getBookingTrendLocal(filter: "day" | "month", specificDate?: string): TrendDataPoint[] {
  const bookings = (readLocalDb().bookings || []).map(b => ({ date: b.date, time_slot: b.timeSlot }));
  return calculateTrend(bookings, filter, specificDate);
}

function calculateTrend(
  bookings: { date: string; time_slot: string }[],
  filter: "day" | "month",
  specificDate?: string
): TrendDataPoint[] {
  if (specificDate) {
    const dayBookings = bookings.filter((b) => b.date === specificDate);
    const hourCounts: Record<string, number> = {};
    for (let h = 0; h < 24; h++) {
      const hour = h.toString().padStart(2, "0") + ":00";
      hourCounts[hour] = 0;
    }
    dayBookings.forEach((b) => {
      const hour = (b.time_slot || "").split(":")[0] + ":00";
      if (hourCounts[hour] !== undefined) hourCounts[hour]++;
    });
    return Object.entries(hourCounts).map(([label, count]) => ({ label, count }));
  }

  if (filter === "day") {
    const points: TrendDataPoint[] = [];
    // 14-day window: past 3 days to upcoming 10 days so scheduled upcoming appointments are clearly visible
    for (let i = -3; i <= 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const count = bookings.filter((b) => b.date === dateStr).length;
      points.push({ label, count });
    }
    return points;
  }

  if (filter === "month") {
    const points: TrendDataPoint[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const label = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      const count = bookings.filter((b) => (b.date || "").startsWith(monthStr)).length;
      points.push({ label, count });
    }
    return points;
  }

  return [];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Row Mappers ---

function mapDoctor(row: any): Doctor {
  return {
    id: String(row.id),
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    qualification: row.qualification || "",
    specialization: row.specialization || "",
    role: row.role || "",
    credentials: row.credentials || "",
    image: row.image || "",
    gender: row.gender || "",
    experience: row.experience || "",
    consultationFee: row.consultation_fee || row.consultationFee || "",
    bio: row.bio || "",
    appointmentDuration: row.appointment_duration || row.appointmentDuration || "30 min",
    schedule: (row.schedule as WeeklySchedule) || {
      monday: { enabled: false, from: "09:00", to: "17:00" },
      tuesday: { enabled: false, from: "09:00", to: "17:00" },
      wednesday: { enabled: false, from: "09:00", to: "17:00" },
      thursday: { enabled: false, from: "09:00", to: "17:00" },
      friday: { enabled: false, from: "09:00", to: "17:00" },
      saturday: { enabled: false, from: "09:00", to: "17:00" },
      sunday: { enabled: false, from: "09:00", to: "17:00" },
    },
    isActive: row.is_active !== undefined ? row.is_active : row.isActive !== false,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

function mapBooking(row: any): Booking {
  return {
    id: String(row.id),
    doctorId: String(row.doctor_id || row.doctorId || ""),
    doctorName: row.doctor_name || row.doctorName || "",
    clientName: row.client_name || row.clientName || "",
    clientEmail: row.client_email || row.clientEmail || "",
    clientPhone: row.client_phone || row.clientPhone || "",
    date: row.date || "",
    timeSlot: row.time_slot || row.timeSlot || "",
    status: row.status || "Unconfirmed",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

function mapQuery(row: any): ClientQuery {
  return {
    id: String(row.id),
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    message: row.message || "",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}
