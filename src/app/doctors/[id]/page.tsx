'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Loader2,
  Stethoscope,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Doctor, Booking, DAY_NAMES } from '@/lib/types';
import { PageBackground } from '@/components/PageBackground';
import Footer from '@/components/Footer';

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isDayUnavailable, setIsDayUnavailable] = useState(false);
  const [dayScheduleInfo, setDayScheduleInfo] = useState<{ from: string; to: string } | null>(null);

  // Interactive Visual Calendar month state
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    const now = new Date();
    const canPrev =
      viewMonth.getFullYear() > now.getFullYear() ||
      (viewMonth.getFullYear() === now.getFullYear() && viewMonth.getMonth() > now.getMonth());
    if (canPrev) {
      setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));
  };

  const handleSelectNextAvailable = () => {
    if (!doctor) return;
    const now = new Date();
    for (let offset = 0; offset < 35; offset++) {
      const checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
      const jsDay = checkDate.getDay();
      const dayIdx = jsDay === 0 ? 6 : jsDay - 1;
      const dayName = DAY_NAMES[dayIdx];
      const sched = doctor.schedule?.[dayName];
      if (sched?.enabled && sched.from && sched.to) {
        const y = checkDate.getFullYear();
        const m = String(checkDate.getMonth() + 1).padStart(2, '0');
        const d = String(checkDate.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;
        setViewMonth(new Date(y, checkDate.getMonth(), 1));
        setSelectedDate(dateStr);
        return;
      }
    }
  };

  const formatHumanDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [submissionError, setSubmissionError] = useState<string>('');

  // Fetch doctor data dynamically from API
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setDoctor(data.doctor);
        }
      } catch (error) {
        console.error('Failed to fetch doctor profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // Pure mathematical slot generation with zero timezone offset
  const generateSlots = (fromStr: string, toStr: string, stepMinutes = 30): string[] => {
    if (!fromStr || !toStr) return [];
    try {
      const [startH, startM] = fromStr.split(':').map(Number);
      const [endH, endM] = toStr.split(':').map(Number);

      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      const slots: string[] = [];
      for (let m = startTotal; m + stepMinutes <= endTotal; m += stepMinutes) {
        const h = Math.floor(m / 60);
        const min = m % 60;
        slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
      }
      return slots;
    } catch {
      return [];
    }
  };

  // 12-hour AM/PM display formatter
  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  // Slot calculations when selectedDate or doctor changes
  useEffect(() => {
    if (!selectedDate || !doctor) return;

    // Timezone-safe local date decomposition
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const jsDay = dateObj.getDay(); // 0 is Sun, 1 is Mon...
    const dayIndex = jsDay === 0 ? 6 : jsDay - 1; // 0=Mon, 6=Sun

    const dayName = DAY_NAMES[dayIndex];
    const daySchedule = doctor.schedule?.[dayName];

    if (!daySchedule?.enabled || !daySchedule.from || !daySchedule.to) {
      setIsDayUnavailable(true);
      setDayScheduleInfo(null);
      setAvailableSlots([]);
      setSelectedSlot('');
      return;
    }

    setIsDayUnavailable(false);
    setDayScheduleInfo({ from: daySchedule.from, to: daySchedule.to });

    const slots = generateSlots(daySchedule.from, daySchedule.to, 30);
    setAvailableSlots(slots);
    setSelectedSlot('');

    // Fetch confirmed bookings to prevent double-booking
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?doctorId=${doctorId}&date=${selectedDate}`);
        if (response.ok) {
          const data = await response.json();
          const confirmedBookings = (data.bookings || []).filter(
            (b: Booking) => b.status === 'Confirmed'
          );
          setBookedSlots(confirmedBookings.map((b: Booking) => b.timeSlot));
        }
      } catch {
        console.error('Failed to load booked slots');
      }
    };

    fetchBookings();
  }, [selectedDate, doctor, doctorId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field Validation
    const newErrors: Record<string, string> = {};
    if (!clientName.trim()) newErrors.name = 'Patient name is required';
    if (!clientEmail.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!clientPhone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (clientPhone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid contact number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!doctor || !selectedDate || !selectedSlot) return;

    setErrors({});
    setSubmissionError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id,
          doctorName: doctor.name,
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          clientPhone: clientPhone.trim(),
          date: selectedDate,
          timeSlot: selectedSlot,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedBooking(data.booking);
        setIsSuccess(true);
      } else {
        setSubmissionError('Failed to submit appointment request. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmissionError('An unexpected error occurred while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimum date for booking is today
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="text-sm text-slate-400 font-light">Loading Specialist Profile & Availability...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Specialist Not Found</h2>
        <p className="text-slate-400 max-w-md text-sm">
          The requested doctor profile could not be located or is no longer listed on our consultation platform.
        </p>
        <Link href="/doctors">
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-6">
            View All Doctors
          </Button>
        </Link>
      </div>
    );
  }

  // Active days count
  const activeDays = DAY_NAMES.filter((day) => doctor.schedule?.[day]?.enabled);

  // Calendar calculations for viewMonth
  const currentYear = viewMonth.getFullYear();
  const currentMonthIdx = viewMonth.getMonth();
  const daysInCurrentMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const firstJsDay = new Date(currentYear, currentMonthIdx, 1).getDay();
  const startPadding = firstJsDay === 0 ? 6 : firstJsDay - 1; // Mon = 0, Sun = 6
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans relative overflow-x-hidden">
      <PageBackground />

      {/* Subtle ambient light glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* --- TOP FLOATING NAVIGATION BAR --- */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0b0f19]/80 border border-white/10 backdrop-blur-2xl rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl shadow-black/50">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg md:text-xl font-light text-white tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-medium">
                Physiogen
              </span>{' '}
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold ml-1">Clinic</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/doctors"
              className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>All Doctors</span>
            </Link>

            <a
              href="tel:+923137818887"
              className="hidden sm:inline-flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+92-313-7818887</span>
            </a>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTAINER --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-slate-200 transition-colors">Consultant Specialists</Link>
          <span>/</span>
          <span className="text-blue-400 font-medium truncate max-w-xs">{doctor.name}</span>
        </div>

        {/* --- 1. HERO PROFILE CARD (DYNAMIC) --- */}
        <section className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Doctor Portrait */}
            <div className="relative group shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/20 ring-1 ring-white/20">
                {doctor.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-[22px] bg-slate-900 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-[22px] bg-[#090d16] flex items-center justify-center">
                    <span className="text-5xl font-extralight text-blue-300">
                      {doctor.name.replace('Dr. ', '').charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#090e18] border border-emerald-500/30 px-3.5 py-1 rounded-full text-[11px] font-medium text-emerald-400 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Booking</span>
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>{doctor.role || 'Senior Consultant'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                  {doctor.name}
                </h1>

                <p className="text-base sm:text-lg text-blue-400 font-medium mt-1">
                  {doctor.specialization}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {doctor.qualification}
                </p>

                {doctor.credentials?.trim() && (
                  <p className="text-xs text-slate-400 mt-2 italic max-w-2xl">
                    &ldquo;{doctor.credentials.trim()}&rdquo;
                  </p>
                )}
              </div>

              {/* --- QUICK CLINICAL METRIC CARDS (DYNAMIC ONLY IF ENTERED) --- */}
              {(doctor.experience?.trim() || doctor.consultationFee?.trim() || doctor.appointmentDuration?.trim()) && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {doctor.experience?.trim() && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center min-w-[130px] flex-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Experience</span>
                      <p className="text-base font-bold text-white mt-0.5">
                        {doctor.experience}
                      </p>
                    </div>
                  )}

                  {doctor.consultationFee?.trim() && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center min-w-[130px] flex-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Consultation Fee</span>
                      <p className="text-base font-bold text-emerald-400 mt-0.5">
                        {doctor.consultationFee}
                      </p>
                    </div>
                  )}

                  {doctor.appointmentDuration?.trim() && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center min-w-[130px] flex-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Session Duration</span>
                      <p className="text-base font-bold text-indigo-300 mt-0.5">
                        {doctor.appointmentDuration}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick direct contact pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-400">
                {doctor.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{doctor.email}</span>
                  </div>
                )}
                {doctor.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>{doctor.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Bahria Town, Lahore</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. BIOGRAPHY & CLINICAL EXPERTISE SECTION (ONLY IF BIO ENTERED) --- */}
        {doctor.bio?.trim() && (
          <section className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Stethoscope className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white tracking-tight">Clinical Overview & Philosophy</h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {doctor.bio}
            </p>

            <div className="pt-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2.5">
                Core Specialization Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialization.split('|').map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 font-medium"
                  >
                    {spec.trim()}
                  </span>
                ))}
                {doctor.credentials?.split('|').map((cred, i) => (
                  <span
                    key={`c-${i}`}
                    className="text-xs px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 font-medium"
                  >
                    {cred.trim()}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- 3. WEEKLY AVAILABILITY SCHEDULE (MONDAY - SUNDAY) --- */}
        <section className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <span>Weekly Consultation Schedule</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official working hours configured for online clinic reservations
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {activeDays.length} Days Operating
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {DAY_NAMES.map((day) => {
              const sched = doctor.schedule?.[day];
              const isEnabled = sched?.enabled && sched.from && sched.to;

              return (
                <div
                  key={day}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                    isEnabled
                      ? 'bg-gradient-to-b from-blue-900/20 to-slate-900/60 border-blue-500/30 shadow-lg'
                      : 'bg-black/30 border-white/5 opacity-50'
                  }`}
                >
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
                    {day}
                  </span>

                  {isEnabled ? (
                    <div className="space-y-1 my-1">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Active</span>
                      </div>
                      <span className="text-xs text-slate-200 font-mono block">
                        {formatDisplayTime(sched.from)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">to</span>
                      <span className="text-xs text-slate-200 font-mono block">
                        {formatDisplayTime(sched.to)}
                      </span>
                    </div>
                  ) : (
                    <div className="my-3 space-y-1">
                      <span className="w-2 h-2 rounded-full bg-slate-600 mx-auto block" />
                      <span className="text-[11px] text-slate-500 italic block">Day Off</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 4. APPOINTMENT BOOKING STUDIO (INTERACTIVE) --- */}
        <section id="booking-studio" className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-purple-400" />
              <span>Book Your Clinical Appointment</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select an available date, choose your preferred 30-minute consultation slot, and submit patient details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Date & Slot Selection (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
              {/* Step 1: Visual Interactive Calendar Picker */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-blue-400">
                      Step 1: Pick Consultation Date *
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Select an open appointment date from the visual calendar below
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSelectNextAvailable}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Available Day</span>
                  </button>
                </div>

                {/* Custom Dark Visual Calendar Matrix */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-inner">
                  {/* Calendar Navigation Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-white">
                        {MONTH_NAMES[currentMonthIdx]} {currentYear}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={
                          viewMonth.getFullYear() === new Date().getFullYear() &&
                          viewMonth.getMonth() <= new Date().getMonth()
                        }
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Row (Mon - Sun) */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <span key={day} className="text-[11px] font-semibold text-slate-400 uppercase py-1">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {/* Padding before 1st of month */}
                    {Array.from({ length: startPadding }).map((_, i) => (
                      <div key={`pad-${i}`} className="h-10 sm:h-12 rounded-xl" />
                    ))}

                    {/* Day Tiles */}
                    {Array.from({ length: daysInCurrentMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const cellDate = new Date(currentYear, currentMonthIdx, dayNumber);
                      const isPast = cellDate < todayZero;
                      const jsDay = cellDate.getDay();
                      const dayIdx = jsDay === 0 ? 6 : jsDay - 1;
                      const dayName = DAY_NAMES[dayIdx];
                      const sched = doctor.schedule?.[dayName];
                      const isDoctorWorking = !!(sched?.enabled && sched.from && sched.to);

                      const dateStr = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      const isToday = cellDate.getTime() === todayZero.getTime();
                      const isDisabled = isPast || !isDoctorWorking;

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`h-11 sm:h-12 rounded-xl text-xs flex flex-col items-center justify-center relative transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold ring-2 ring-blue-400 shadow-lg shadow-blue-500/30 scale-105 z-10'
                              : isPast
                              ? 'bg-black/20 text-slate-700 cursor-not-allowed border border-transparent'
                              : !isDoctorWorking
                              ? 'bg-black/40 text-slate-600 border border-white/5 cursor-not-allowed'
                              : 'bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 text-slate-200 cursor-pointer'
                          }`}
                        >
                          <span className={`text-xs font-semibold ${isSelected ? 'text-white' : ''}`}>
                            {dayNumber}
                          </span>
                          {isDoctorWorking && !isPast ? (
                            <span
                              className={`w-1 h-1 rounded-full mt-0.5 ${
                                isSelected ? 'bg-white' : 'bg-emerald-400'
                              }`}
                            />
                          ) : !isPast && !isDoctorWorking ? (
                            <span className="text-[8px] text-slate-600 uppercase leading-none mt-0.5">Off</span>
                          ) : null}
                          {isToday && !isSelected && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Calendar Legend */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-3 border-t border-white/10 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available Day</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span>Doctor Off</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                {/* Selected Date Confirmation Ribbon */}
                {selectedDate && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/30 flex items-center justify-between text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium">
                        Selected: <span className="text-blue-300 font-semibold">{formatHumanDate(selectedDate)}</span>
                      </span>
                    </div>
                    {dayScheduleInfo && (
                      <span className="text-[11px] text-slate-300 font-mono">
                        {formatDisplayTime(dayScheduleInfo.from)} - {formatDisplayTime(dayScheduleInfo.to)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Time Slot Selector */}
              {selectedDate && (
                <div className="space-y-3 pt-4 border-t border-white/10 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-blue-400">
                      Step 2: Choose 30-Minute Time Slot *
                    </label>
                    {dayScheduleInfo && (
                      <span className="text-[11px] text-slate-400">
                        Hours: {formatDisplayTime(dayScheduleInfo.from)} - {formatDisplayTime(dayScheduleInfo.to)}
                      </span>
                    )}
                  </div>

                  {isDayUnavailable ? (
                    <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                      <span>
                        {doctor.name} does not practice on this day of the week. Please select another date from the schedule.
                      </span>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 text-center text-xs text-slate-400">
                      No bookable slots found for this date.
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
                        {availableSlots.map((slot) => {
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = selectedSlot === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                                isBooked
                                  ? 'bg-black/30 border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                                  : isSelected
                                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                                  : 'bg-black/50 border-white/10 hover:border-blue-500/50 hover:bg-white/5 text-slate-200'
                              }`}
                            >
                              <span>{formatDisplayTime(slot)}</span>
                              <span className="text-[9px] font-normal opacity-70">
                                {isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {bookedSlots.length > 0 && (
                        <p className="text-[11px] text-amber-400 mt-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Grayed-out slots are already reserved by other patients.</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Patient Details Form & Live Summary (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Patient Information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter your contact details to submit your clinical appointment.
                </p>
              </div>

              {/* Dynamic Live Appointment Summary Box */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Specialist:</span>
                  <span className="text-white font-semibold">{doctor.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Date:</span>
                  <span className={`font-semibold ${selectedDate ? 'text-white' : 'text-slate-500 italic'}`}>
                    {selectedDate ? formatHumanDate(selectedDate) : 'Select Date'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className={`font-semibold ${selectedSlot ? 'text-blue-400' : 'text-slate-500 italic'}`}>
                    {selectedSlot ? formatDisplayTime(selectedSlot) : 'Select Slot'}
                  </span>
                </div>
                {doctor.consultationFee?.trim() && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Consultation Fee:</span>
                    <span className="text-emerald-400 font-bold">
                      {doctor.consultationFee}
                    </span>
                  </div>
                )}
              </div>

              {/* Patient Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Muhammad Ali"
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Chief Complaint / Medical Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Briefly describe your condition (e.g. lower back stiffness, knee pain)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs resize-none"
                  />
                </div>

                {submissionError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{submissionError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedSlot || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-3.5 font-medium shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Appointment Request...</span>
                    </>
                  ) : !selectedDate ? (
                    <span>Please Select a Date</span>
                  ) : !selectedSlot ? (
                    <span>Please Choose a Time Slot</span>
                  ) : (
                    <span>Submit Appointment Request</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* --- SUCCESS MODAL --- */}
      {isSuccess && createdBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSuccess(false)} />
          <div className="relative w-full max-w-lg bg-[#0b0f19] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Appointment Requested!
              </h3>
              <p className="text-xs text-slate-400">
                Your consultation request has been received by Physiogen Clinic administration.
              </p>
            </div>

            <div className="bg-black/50 p-4 rounded-2xl border border-white/10 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Appointment ID:</span>
                <span className="text-slate-200 font-mono">{createdBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Specialist:</span>
                <span className="text-white font-semibold">{createdBooking.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="text-blue-400 font-semibold">
                  {createdBooking.date} at {formatDisplayTime(createdBooking.timeSlot)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Patient:</span>
                <span className="text-white">{createdBooking.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-semibold">Pending Clinic Confirmation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/doctors" className="flex-1">
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white rounded-xl">
                  Back to Directory
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
