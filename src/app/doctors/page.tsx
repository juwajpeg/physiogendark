'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Search,
  Sparkles,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Doctor, DAY_NAMES } from '@/lib/types';
import { PageBackground } from '@/components/PageBackground';
import Footer from '@/components/Footer';

export default function DoctorsListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors?active=true');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || []);
        }
      } catch (error) {
        console.error('Failed to fetch doctors', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter out doctors who have ALL days disabled
  const availableDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      return DAY_NAMES.some((day) => doctor.schedule[day]?.enabled);
    });
  }, [doctors]);

  // Extract unique specialty categories for filter pills
  const specialties = useMemo(() => {
    const set = new Set<string>();
    availableDoctors.forEach((doc) => {
      const firstPart = doc.specialization.split('|')[0].trim();
      if (firstPart) set.add(firstPart);
    });
    return ['All', ...Array.from(set)];
  }, [availableDoctors]);

  // Filtered by search and specialty
  const filteredDoctors = useMemo(() => {
    return availableDoctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All' ||
        doc.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase());

      return matchesSearch && matchesSpecialty;
    });
  }, [availableDoctors, searchQuery, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans relative overflow-x-hidden">
      <PageBackground />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Sticky Floating Navbar */}
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
              href="/"
              className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Home</span>
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

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-10">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Consultant Clinical Specialists</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Meet Our Medical & Rehabilitation Team
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select a verified specialist to explore their clinical qualifications, weekly consultation hours, and book your one-on-one session online.
          </p>
        </div>

        {/* Search & Specialty Filter Controls */}
        <div className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialists by doctor name, specialization, or qualification..."
              className="w-full bg-black/60 border border-white/15 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {specialties.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 font-medium shrink-0 mr-1">Specialties:</span>
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#0b0f19]/60 border border-white/10 rounded-3xl p-6 h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => {
              const activeDays = DAY_NAMES.filter((d) => doctor.schedule[d]?.enabled);

              return (
                <div
                  key={doctor.id}
                  className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header: Photo and Status */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-blue-600 to-purple-600 shrink-0 shadow-lg shadow-blue-500/10">
                        {doctor.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover rounded-[14px] bg-slate-900 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full rounded-[14px] bg-[#090d16] flex items-center justify-center text-xl font-bold text-blue-300">
                            {doctor.name.replace('Dr. ', '').charAt(0)}
                          </div>
                        )}
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0b0f19] rounded-full" />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md inline-block truncate max-w-full">
                          {doctor.role || 'Consultant Specialist'}
                        </span>
                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                          {doctor.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">{doctor.qualification}</p>
                      </div>
                    </div>

                    {/* Specialization */}
                    <div className="text-xs text-slate-300 line-clamp-2 min-h-[32px]">
                      {doctor.specialization}
                    </div>

                    {/* Key Metrics Strip (Dynamic from DB - only if entered) */}
                    {(doctor.experience?.trim() || doctor.consultationFee?.trim()) && (
                      <div className="flex gap-2 pt-2 border-t border-white/5 text-center text-xs">
                        {doctor.experience?.trim() && (
                          <div className="bg-white/5 rounded-xl py-2 px-1 flex-1">
                            <span className="text-[10px] text-slate-400 block font-medium">Experience</span>
                            <span className="text-xs font-bold text-white block mt-0.5">
                              {doctor.experience}
                            </span>
                          </div>
                        )}
                        {doctor.consultationFee?.trim() && (
                          <div className="bg-white/5 rounded-xl py-2 px-1 flex-1">
                            <span className="text-[10px] text-slate-400 block font-medium">Fee</span>
                            <span className="text-xs font-bold text-emerald-400 block mt-0.5 truncate">
                              {doctor.consultationFee}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Available Days Schedule Preview */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-400" />
                          <span>Weekly Schedule</span>
                        </span>
                        <span className="text-emerald-400 font-medium">
                          {activeDays.length} Days Active
                        </span>
                      </div>
                      <div className="flex gap-1 justify-between">
                        {DAY_NAMES.map((day) => {
                          const isEnabled = doctor.schedule[day]?.enabled;
                          return (
                            <span
                              key={day}
                              className={`text-[9px] font-semibold uppercase px-1.5 py-1 rounded text-center flex-1 transition-colors ${
                                isEnabled
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-black/40 text-slate-600 border border-white/5'
                              }`}
                            >
                              {day.substring(0, 3)}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-6">
                    <Link href={`/doctors/${doctor.id}`} className="block w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-2.5 text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                        <span>View Profile & Book Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0b0f19]/60 border border-white/10 rounded-3xl p-8 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-white">No Specialists Found</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              We couldn&apos;t find any doctors matching &ldquo;{searchQuery}&rdquo;. Try clearing your search filters.
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                }}
                className="mt-2 text-xs border-slate-700 text-slate-300 hover:text-white rounded-xl"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Bottom Booking Information Banner */}
        <section className="bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white flex items-center justify-center sm:justify-start gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Need Urgent Rehabilitation or Home Care?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Our clinical triage desk is available directly via call or WhatsApp for emergency consultations and home visits.
            </p>
          </div>
          <a
            href="tel:+923137818887"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call +92-313-7818887</span>
          </a>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
