"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  X,
  AlertCircle,
  Activity,
  Image as ImageIcon,
  Check,
  Lock,
  LogOut,
  ShieldCheck,
  Mail,
  Phone,
  Search,
  RefreshCw,
  Loader2,
  Menu,
  Stethoscope,
  CalendarDays,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Doctor,
  WeeklySchedule,
  DaySchedule,
  Booking,
  ClientQuery,
  InsightStats,
  TrendDataPoint,
  DAY_NAMES,
  DayName,
  BookingStatus
} from "@/lib/types";

type TabType = "dashboard" | "doctors" | "bookings" | "queries";

// Toast Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl z-50 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ${
        type === "success"
          ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
          : "bg-rose-950/90 border-rose-500/30 text-rose-300"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
      ) : (
        <XCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
      )}
      <p className="font-medium text-sm">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Stats across the app for sidebar badges
  const [globalStats, setGlobalStats] = useState<InsightStats | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("physiogen_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsAuthChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("physiogen_admin_auth", "true");
        setIsAuthenticated(true);
        showToast("Welcome back, Administrator!", "success");
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Failed to login. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("physiogen_admin_auth");
    setIsAuthenticated(false);
    showToast("Logged out successfully", "success");
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-sm text-gray-400">Loading Clinical Operating System...</p>
      </div>
    );
  }

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070e] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/25 ring-1 ring-white/20">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-light text-white tracking-tight">Physiogen OS</h1>
            <p className="text-gray-400 text-sm mt-2">Clinical Portal & Practice Management</p>
          </div>

          <Card className="bg-[#0b0f19]/80 border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl ring-1 ring-white/5">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@physiogen.fit"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 text-sm transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-3 font-medium transition-all duration-300 shadow-lg shadow-blue-600/25 hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Access Clinical Dashboard</span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Return to Public Website
              </Link>
            </div>
          </Card>
        </div>

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    );
  }

  // --- Authenticated Layout ---
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR NAVIGATION (Desktop & Mobile Drawer) --- */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-white tracking-tight leading-tight">Physiogen</h2>
                <span className="text-[11px] text-blue-400 font-medium tracking-wider uppercase">
                  Clinical OS
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {[
              {
                id: "dashboard" as TabType,
                label: "Dashboard",
                icon: LayoutDashboard,
                badge: null,
              },
              {
                id: "doctors" as TabType,
                label: "Doctors",
                icon: Stethoscope,
                badge: globalStats?.totalDoctors ?? null,
              },
              {
                id: "bookings" as TabType,
                label: "Appointments",
                icon: Calendar,
                badge: globalStats?.unconfirmed ? `${globalStats.unconfirmed} pending` : null,
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
              },
              {
                id: "queries" as TabType,
                label: "Client Queries",
                icon: MessageSquare,
                badge: globalStats?.totalQueries ?? null,
              },
            ].map((item) => {
              const active = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-blue-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${
                        item.badgeColor || "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800/80 bg-black/20">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Administrator</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  admin@physiogen.fit
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-colors border border-slate-800"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Website
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Physiogen OS</span>
                <span>/</span>
                <span className="capitalize text-slate-200 font-medium">{activeTab}</span>
              </div>
              <h1 className="text-xl font-semibold text-white capitalize tracking-tight mt-0.5">
                {activeTab === "dashboard" && "Practice Overview & Insights"}
                {activeTab === "doctors" && "Doctor Management"}
                {activeTab === "bookings" && "Appointments Management"}
                {activeTab === "queries" && "Patient Queries & Leads"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Database Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardTab showToast={showToast} setGlobalStats={setGlobalStats} onNavigateTab={setActiveTab} />
          )}
          {activeTab === "doctors" && (
            <DoctorsTab showToast={showToast} onStatsRefresh={() => {}} />
          )}
          {activeTab === "bookings" && (
            <BookingsTab showToast={showToast} />
          )}
          {activeTab === "queries" && (
            <QueriesTab showToast={showToast} />
          )}
        </main>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

// ======================================================================
// 1. DASHBOARD TAB (ACCURATE REAL STATS + TREND CHART + RECENT ACTIVITIES)
// ======================================================================
function DashboardTab({
  showToast,
  setGlobalStats,
  onNavigateTab
}: {
  showToast: (msg: string, type: "success" | "error") => void;
  setGlobalStats: (s: InsightStats) => void;
  onNavigateTab: (tab: TabType) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<InsightStats | null>(null);
  const [trend, setTrend] = useState<TrendDataPoint[]>([]);
  const [filter, setFilter] = useState<"day" | "month">("day");
  const [specificDate, setSpecificDate] = useState<string>("");
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const trendUrl = specificDate
        ? `/api/insights?filter=day&date=${specificDate}`
        : `/api/insights?filter=${filter}`;

      const [insightRes, bookingsRes] = await Promise.all([
        fetch(trendUrl),
        fetch("/api/bookings"),
      ]);

      if (insightRes.ok) {
        const data = await insightRes.json();
        setStats(data.stats);
        setTrend(data.trend || []);
        if (data.stats) setGlobalStats(data.stats);
      }

      if (bookingsRes.ok) {
        const bData = await bookingsRes.json();
        setRecentBookings((bData.bookings || []).slice(0, 5));
      }
    } catch {
      showToast("Failed to fetch fresh dashboard data.", "error");
    } finally {
      setLoading(false);
    }
  }, [filter, specificDate, showToast, setGlobalStats]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const updateBookingStatus = async (id: string, newStatus: "Confirmed" | "Cancelled") => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      showToast(`Appointment marked as ${newStatus}`, "success");
      fetchInsights();
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading && !stats) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-800/40 rounded-2xl border border-slate-800" />
          ))}
        </div>
        <div className="h-96 bg-slate-800/40 rounded-2xl border border-slate-800" />
      </div>
    );
  }

  const maxTrendCount = Math.max(...trend.map((t) => t.count), 1);
  const totalTrendSum = trend.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-transparent p-6 rounded-3xl border border-blue-500/20 backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Clinic Practice Performance
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time appointment metrics calculated directly from clinical records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchInsights()}
            variant="outline"
            className="rounded-xl border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 text-xs px-3.5 py-2 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-blue-400" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => onNavigateTab("doctors")}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs px-4 py-2 font-medium shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Specialist
          </Button>
        </div>
      </div>

      {/* --- 6 ACCURATE STATS CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Total Doctors",
            value: stats?.totalDoctors ?? 0,
            icon: Stethoscope,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
          },
          {
            label: "Total Bookings",
            value: stats?.totalBookings ?? 0,
            icon: CalendarDays,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10 border-indigo-500/20",
          },
          {
            label: "Today's Bookings",
            value: stats?.todays ?? 0,
            icon: Clock,
            color: "text-sky-400",
            bg: "bg-sky-500/10 border-sky-500/20",
          },
          {
            label: "Pending Review",
            value: stats?.unconfirmed ?? 0,
            icon: AlertCircle,
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/20",
          },
          {
            label: "Confirmed",
            value: stats?.confirmed ?? 0,
            icon: CheckCircle,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
          },
          {
            label: "Cancelled",
            value: stats?.cancelled ?? 0,
            icon: XCircle,
            color: "text-rose-400",
            bg: "bg-rose-500/10 border-rose-500/20",
          },
        ].map((kpi, idx) => (
          <Card
            key={idx}
            className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{kpi.label}</span>
              <div className={`p-2 rounded-xl border ${kpi.bg}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {kpi.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* --- TREND CHART SECTION --- */}
      <Card className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span>Appointment Volume Trends</span>
              {totalTrendSum > 0 && (
                <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {totalTrendSum} Total Recorded
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Visual breakdown of client booking requests over the selected timeframe
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setSpecificDate("");
                setFilter("day");
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === "day" && !specificDate
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              14-Day View
            </button>
            <button
              onClick={() => {
                setSpecificDate("");
                setFilter("month");
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === "month" && !specificDate
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              6-Month View
            </button>
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
              <span className="text-[11px] text-slate-400">Date:</span>
              <input
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                className="bg-black/60 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-blue-500"
              />
              {specificDate && (
                <button
                  onClick={() => setSpecificDate("")}
                  className="text-slate-500 hover:text-white text-xs px-1"
                  title="Clear date"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Real Data Chart or Clean Empty State */}
        {trend.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-2xl">
            <Calendar className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-300 font-medium">No booking trend records found</p>
            <p className="text-xs text-slate-500 mt-1">
              As patients book appointments, volume patterns will automatically chart here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-56 flex items-end gap-2 sm:gap-3 pt-6 pb-2 px-2 border-b border-slate-800/80">
              {trend.map((point, index) => {
                const heightPercent = Math.max((point.count / maxTrendCount) * 100, 6);
                const hasValue = point.count > 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-10 bg-slate-900 border border-slate-700 text-white text-[11px] px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap shadow-xl z-20">
                      <span className="font-semibold text-blue-400">{point.count}</span> appointments ({point.label})
                    </div>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[36px] rounded-t-lg transition-all duration-500 ${
                        hasValue
                          ? "bg-gradient-to-t from-blue-700 via-indigo-600 to-purple-500 group-hover:brightness-125 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                          : "bg-slate-800/40 group-hover:bg-slate-800"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 text-[11px] text-slate-500 font-medium">
              {trend.map((point, idx) => (
                <div key={idx} className="flex-1 text-center truncate px-0.5">
                  {point.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* --- RECENT APPOINTMENTS QUICK SECTION --- */}
      <Card className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              Recent Appointment Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest patient booking requests requiring clinic attention
            </p>
          </div>
          <Button
            onClick={() => onNavigateTab("bookings")}
            variant="ghost"
            className="text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 flex items-center gap-1"
          >
            <span>View All ({stats?.totalBookings ?? 0})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            No appointments booked yet. Patient bookings from the website will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Patient</th>
                  <th className="pb-3">Doctor</th>
                  <th className="pb-3">Date & Slot</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3.5 pl-2">
                      <p className="font-medium text-white">{b.clientName}</p>
                      <p className="text-xs text-slate-400">{b.clientPhone}</p>
                    </td>
                    <td className="py-3.5 text-slate-300 font-medium">{b.doctorName}</td>
                    <td className="py-3.5 text-slate-400 text-xs">
                      <p className="text-slate-200 font-medium">{b.date}</p>
                      <p>{b.timeSlot}</p>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          b.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : b.status === "Cancelled"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      {b.status === "Unconfirmed" && (
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            size="sm"
                            disabled={actionLoading[b.id]}
                            onClick={() => updateBookingStatus(b.id, "Confirmed")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs px-2.5 py-1 h-7"
                          >
                            {actionLoading[b.id] ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            disabled={actionLoading[b.id]}
                            onClick={() => updateBookingStatus(b.id, "Cancelled")}
                            variant="outline"
                            className="border-slate-800 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs px-2.5 py-1 h-7"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      {b.status === "Confirmed" && (
                        <Button
                          size="sm"
                          disabled={actionLoading[b.id]}
                          onClick={() => updateBookingStatus(b.id, "Cancelled")}
                          variant="ghost"
                          className="text-rose-400 hover:bg-rose-500/10 text-xs h-7"
                        >
                          Cancel Slot
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

// ======================================================================
// 2. DOCTORS TAB (CLEAN LIST + MODAL WITH STICKY FOOTER & SPINNERS)
// ======================================================================
function DoctorsTab({
  showToast,
  onStatsRefresh
}: {
  showToast: (msg: string, type: "success" | "error") => void;
  onStatsRefresh: () => void;
}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/doctors");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch {
      showToast("Failed to fetch doctors list", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctors.filter((doc) => {
    const q = search.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      doc.specialization.toLowerCase().includes(q) ||
      doc.qualification.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors by name or specialty..."
            className="w-full bg-[#0b1020] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
          />
        </div>

        <Button
          onClick={() => {
            setEditingDoctor(null);
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Specialist Doctor</span>
        </Button>
      </div>

      {/* Grid of Doctor Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-800/40 rounded-3xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-16 bg-[#0b1020]/50 border border-slate-800 rounded-3xl p-8">
          <Stethoscope className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No doctors matching your criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try another search or add a new specialist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => {
            const activeDaysCount = DAY_NAMES.filter((d) => doc.schedule[d]?.enabled).length;
            return (
              <Card
                key={doc.id}
                className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Doctor Avatar */}
                    {doc.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 bg-slate-900"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {doc.name.replace("Dr. ", "").charAt(0)}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingDoctor(doc);
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Doctor Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDoctorToDelete(doc)}
                        disabled={deletingId === doc.id}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                        title="Deactivate Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-white tracking-tight">{doc.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-0.5">{doc.specialization}</p>
                    <p className="text-xs text-slate-400 mt-1">{doc.qualification}</p>
                    {doc.credentials && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                        {doc.credentials}
                      </p>
                    )}
                  </div>

                  {/* Schedule Pills */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Weekly Availability</span>
                      <span className="text-[11px] font-semibold text-slate-300">
                        {activeDaysCount} Days Active
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {DAY_NAMES.map((d) => {
                        const isAvailable = doc.schedule[d]?.enabled;
                        return (
                          <span
                            key={d}
                            className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${
                              isAvailable
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                                : "bg-slate-900 border-slate-800 text-slate-600"
                            }`}
                          >
                            {d.slice(0, 3)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      doc.isActive !== false
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        doc.isActive !== false ? "bg-emerald-400" : "bg-slate-500"
                      }`}
                    />
                    {doc.isActive !== false ? "Active Doctor" : "Inactive"}
                  </span>

                  <Link
                    href={`/doctors/${doc.id}`}
                    target="_blank"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Booking Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* --- CUSTOM DEACTIVATE CONFIRMATION MODAL --- */}
      {doctorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => !deletingId && setDoctorToDelete(null)}
          />
          <div className="relative w-full max-w-md bg-[#0b1020] border border-rose-500/30 rounded-3xl p-6 shadow-2xl z-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400 shadow-lg shadow-rose-500/10">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-white">Deactivate Specialist</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to deactivate <span className="text-white font-medium">{doctorToDelete.name}</span>? This specialist will be hidden from public consultation listings and booking slots.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <Button
                type="button"
                variant="ghost"
                disabled={!!deletingId}
                onClick={() => setDoctorToDelete(null)}
                className="flex-1 text-slate-400 hover:text-white rounded-xl text-xs py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!!deletingId}
                onClick={async () => {
                  setDeletingId(doctorToDelete.id);
                  try {
                    const res = await fetch(`/api/doctors/${doctorToDelete.id}`, { method: "DELETE" });
                    if (!res.ok) throw new Error();
                    showToast("Doctor deactivated successfully", "success");
                    setDoctorToDelete(null);
                    fetchDoctors();
                    onStatsRefresh();
                  } catch {
                    showToast("Failed to deactivate doctor", "error");
                  } finally {
                    setDeletingId(null);
                  }
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold py-2.5 shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deactivating...</span>
                  </>
                ) : (
                  <span>Yes, Deactivate</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- DOCTOR ADD/EDIT MODAL WITH STICKY FOOTER & SPINNERS --- */}
      {isModalOpen && (
        <DoctorModal
          doctor={editingDoctor}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            setIsModalOpen(false);
            fetchDoctors();
            onStatsRefresh();
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
}

// Doctor Add/Edit Modal
function DoctorModal({
  doctor,
  onClose,
  onSave,
  showToast,
}: {
  doctor: Doctor | null;
  onClose: () => void;
  onSave: () => void;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: "",
    qualification: "",
    specialization: "",
    role: "",
    credentials: "",
    image: "",
    email: "",
    phone: "",
    gender: "Other",
    experience: "",
    consultationFee: "",
    bio: "",
    appointmentDuration: "30 min",
    isActive: true,
    schedule: DAY_NAMES.reduce((acc, day) => {
      acc[day] = { enabled: false, from: "09:00", to: "17:00" };
      return acc;
    }, {} as WeeklySchedule),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgError, setImgError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (doctor) {
      setFormData(JSON.parse(JSON.stringify(doctor)));
    }
  }, [doctor]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImgError("Only JPG, PNG, and WebP are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImgError("Image file size must be less than 2MB.");
      return;
    }
    setImgError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, image: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleScheduleChange = (
    day: DayName,
    field: keyof DaySchedule,
    value: boolean | string
  ) => {
    setFormData((prev) => {
      const newSchedule = { ...prev.schedule } as WeeklySchedule;
      newSchedule[day] = { ...newSchedule[day], [field]: value };
      return { ...prev, schedule: newSchedule };
    });
  };

  const validateForm = () => {
    if (!formData.name?.trim() || !formData.qualification?.trim() || !formData.specialization?.trim()) {
      return false;
    }
    // Verify times for enabled days
    for (const d of DAY_NAMES) {
      const s = formData.schedule?.[d];
      if (s?.enabled && s.to <= s.from) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fill all required fields correctly.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const method = doctor ? "PUT" : "POST";
      const url = doctor ? `/api/doctors/${doctor.id}` : "/api/doctors";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      showToast(`Doctor ${doctor ? "updated" : "added"} successfully!`, "success");
      onSave();
    } catch {
      showToast("Failed to save doctor. Check connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = validateForm();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <Card className="relative w-full max-w-3xl max-h-[88vh] bg-[#0b1020] border-slate-800 shadow-2xl rounded-3xl flex flex-col overflow-hidden z-10 ring-1 ring-white/10">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#0b1020]/95 backdrop-blur-xl px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {doctor ? "Edit Doctor Profile" : "Register New Specialist"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Profile details and working availability will appear on public booking pages.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              Profile Photo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                imgError
                  ? "border-rose-500/50 bg-rose-500/5"
                  : "border-slate-800 hover:border-blue-500/50 bg-slate-900/40 hover:bg-blue-500/5"
              }`}
            >
              {formData.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 rounded-2xl object-cover mb-3 shadow-lg ring-2 ring-blue-500/30"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-3 text-slate-500">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <p className="text-sm font-medium text-white">Click to upload doctor picture</p>
              <p className="text-xs text-slate-500 mt-1">JPG, PNG, or WebP up to 2MB (Auto-cropped to face)</p>
              {imgError && <p className="text-xs text-rose-400 mt-2 font-medium">{imgError}</p>}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Personal & Professional Details Grid */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-blue-400">
              Doctor Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Smith, DPT"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Specialization *</label>
                <input
                  type="text"
                  required
                  value={formData.specialization || ""}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g. Sports Injury Rehabilitation"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Qualification *</label>
                <input
                  type="text"
                  required
                  value={formData.qualification || ""}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. DPT, MSPT (Cardiorespiratory)"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Clinical Role / Designation</label>
                <input
                  type="text"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Consultant Physiotherapist"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Credentials & Certifications</label>
                <input
                  type="text"
                  value={formData.credentials || ""}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="e.g. Certified Manual Therapist, Dry Needling"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Consultation Fee</label>
                <input
                  type="text"
                  value={formData.consultationFee || ""}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  placeholder="e.g. PKR 3,000"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Clinical Experience</label>
                <input
                  type="text"
                  value={formData.experience || ""}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. 8+ Years"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Session Duration</label>
                <input
                  type="text"
                  value={formData.appointmentDuration || ""}
                  onChange={(e) => setFormData({ ...formData, appointmentDuration: e.target.value })}
                  placeholder="e.g. 30 Min Session"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +92 313 7818887"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Official Email</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. doctor@physiogen.fit"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1.5">Clinical Overview & Philosophy (Bio)</label>
              <textarea
                rows={3}
                value={formData.bio || ""}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Briefly describe the specialist's clinical background, treatment philosophy, or key accomplishments (leave blank if none)..."
                className="w-full bg-black/40 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 text-xs resize-none"
              />
            </div>
          </div>

          {/* Weekly Schedule Settings (Monday - Sunday) */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-blue-400">
                Weekly Consultation Schedule
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle days ON and set working hours. 30-minute booking slots are generated dynamically from these times.
              </p>
            </div>

            <div className="space-y-2.5 border border-slate-800/80 rounded-2xl p-4 bg-slate-900/30">
              {DAY_NAMES.map((day) => {
                const sched = formData.schedule?.[day] || { enabled: false, from: "09:00", to: "17:00" };
                const hasTimeError = sched.enabled && sched.to <= sched.from;

                return (
                  <div
                    key={day}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-colors gap-3 ${
                      sched.enabled
                        ? "bg-slate-900/80 border-slate-700/80"
                        : "bg-black/30 border-slate-800/40 opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`toggle-${day}`}
                        checked={sched.enabled}
                        onChange={(e) => handleScheduleChange(day, "enabled", e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-700 bg-slate-800"
                      />
                      <label
                        htmlFor={`toggle-${day}`}
                        className="capitalize font-medium text-sm text-white cursor-pointer select-none"
                      >
                        {day}
                      </label>
                    </div>

                    {sched.enabled ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400">From</span>
                          <input
                            type="time"
                            value={sched.from}
                            onChange={(e) => handleScheduleChange(day, "from", e.target.value)}
                            className="bg-black/60 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400">To</span>
                          <input
                            type="time"
                            value={sched.to}
                            onChange={(e) => handleScheduleChange(day, "to", e.target.value)}
                            className="bg-black/60 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        {hasTimeError && (
                          <span className="text-[11px] text-rose-400 font-medium">
                            End time must be after start time
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Day Off / Unavailable</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Sticky Footer with Loading Spinner Button */}
        <div className="sticky bottom-0 z-20 bg-[#0b1020]/95 backdrop-blur-xl px-6 py-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-white rounded-xl text-sm"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl px-6 py-2.5 text-sm font-medium shadow-lg shadow-blue-600/25 min-w-[140px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Doctor...</span>
              </>
            ) : (
              <span>{doctor ? "Update Doctor" : "Create Doctor"}</span>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ======================================================================
// 3. BOOKINGS TAB (FILTERABLE APPOINTMENTS WITH REAL SLOT ACTIONS)
// ======================================================================
function BookingsTab({
  showToast
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | BookingStatus>("All");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"table" | "calendar">("calendar");
  const [calMonthDate, setCalMonthDate] = useState(new Date());

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      showToast("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (
    id: string,
    status: BookingStatus,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      showToast(`Appointment status updated to ${status}`, "success");
      fetchBookings();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "All" || b.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      b.clientName.toLowerCase().includes(q) ||
      b.clientPhone.includes(q) ||
      b.doctorName.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const nextMonth = () => {
    setCalMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCalMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const todayMonth = () => {
    setCalMonthDate(new Date());
  };

  const calYear = calMonthDate.getFullYear();
  const calMonth = calMonthDate.getMonth();
  const monthName = calMonthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const daysInCurrentMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

  interface CalCell {
    day: number;
    isCurrentMonth: boolean;
    dateStr: string;
    isToday?: boolean;
    bookings?: Booking[];
  }

  const calendarCells: CalCell[] = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    calendarCells.push({ day: dayNum, isCurrentMonth: false, dateStr: "" });
  }

  const todayStr = new Date().toISOString().split("T")[0];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayBookings = filteredBookings.filter((b) => b.date === dateStr);
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateStr,
      isToday: dateStr === todayStr,
      bookings: dayBookings,
    });
  }
  const remaining = (7 - (calendarCells.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    calendarCells.push({ day: i, isCurrentMonth: false, dateStr: "" });
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, phone, or doctor..."
            className="w-full bg-[#0b1020] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#0b1020] p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {(["All", "Unconfirmed", "Confirmed", "Cancelled"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize whitespace-nowrap ${
                  filter === st
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#0b1020] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "calendar"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Calendar Schedule View"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "table"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- APPOINTMENTS VIEW (CALENDAR OR TABLE) --- */}
      {viewMode === "calendar" ? (
        <Card className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
          {/* Calendar Navigation Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {monthName}
              </h3>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={prevMonth}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={todayMonth}
                  className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Pending Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>Cancelled</span>
              </div>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, idx) => {
              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={idx}
                    className="min-h-[110px] sm:min-h-[125px] p-2 rounded-2xl bg-black/20 border border-slate-900/60 opacity-25 select-none"
                  >
                    <span className="text-xs text-slate-600 font-medium">{cell.day}</span>
                  </div>
                );
              }

              const hasBookings = (cell.bookings || []).length > 0;

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] sm:min-h-[125px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    cell.isToday
                      ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                      : hasBookings
                      ? "bg-slate-900/80 border-slate-700/80 hover:border-slate-600"
                      : "bg-[#070b14]/60 border-slate-800/60 hover:border-slate-700/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold ${
                        cell.isToday
                          ? "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center -ml-1 -mt-1 shadow-md shadow-blue-500/40"
                          : "text-slate-300"
                      }`}
                    >
                      {cell.day}
                    </span>
                    {hasBookings && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {cell.bookings!.length}
                      </span>
                    )}
                  </div>

                  {/* Appointments list in cell */}
                  <div className="space-y-1.5 overflow-y-auto max-h-[85px] pr-0.5 custom-scrollbar">
                    {(cell.bookings || []).map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBooking(b)}
                        className={`text-left text-[11px] p-1.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
                          b.status === "Confirmed"
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25"
                            : b.status === "Cancelled"
                            ? "bg-rose-500/15 border-rose-500/30 text-rose-300 line-through opacity-70 hover:bg-rose-500/25"
                            : "bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25"
                        }`}
                        title={`Click to view: ${b.clientName} (${b.timeSlot}) - ${b.doctorName}`}
                      >
                        <div className="font-semibold truncate flex items-center justify-between gap-1">
                          <span className="truncate">{b.clientName}</span>
                          <span className="text-[10px] opacity-80 font-mono flex-shrink-0">{b.timeSlot}</span>
                        </div>
                        <p className="text-[10px] opacity-75 truncate">{b.doctorName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 text-center pt-2">
            Click on any appointment tile in the calendar to view patient contact details, confirm, or cancel slots.
          </div>
        </Card>
      ) : (
        /* Appointments List / Table */
        <Card className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-8 space-y-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-800/40 rounded-2xl" />
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 p-8">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 font-medium">No appointments found</p>
              <p className="text-xs text-slate-500 mt-1">
                Appointments booked online or marked with this status filter will show here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 pl-6">Patient</th>
                    <th className="py-4 px-4">Doctor</th>
                    <th className="py-4 px-4">Date & Time</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="hover:bg-slate-800/30 cursor-pointer transition-colors"
                    >
                      <td className="py-4 pl-6">
                        <p className="font-semibold text-white">{b.clientName}</p>
                        <p className="text-xs text-slate-400">{b.clientPhone}</p>
                        <p className="text-[11px] text-slate-500">{b.clientEmail}</p>
                      </td>

                      <td className="py-4 px-4 font-medium text-slate-200">
                        {b.doctorName}
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium text-white">{b.date}</p>
                        <p className="text-xs text-blue-400 font-mono mt-0.5">{b.timeSlot}</p>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                            b.status === "Confirmed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : b.status === "Cancelled"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="py-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {b.status === "Unconfirmed" && (
                            <Button
                              size="sm"
                              disabled={actionLoading[b.id]}
                              onClick={(e) => updateStatus(b.id, "Confirmed", e)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs px-3 py-1.5 shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                            >
                              {actionLoading[b.id] ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                              Confirm Slot
                            </Button>
                          )}
                          {b.status !== "Cancelled" && (
                            <Button
                              size="sm"
                              disabled={actionLoading[b.id]}
                              onClick={(e) => updateStatus(b.id, "Cancelled", e)}
                              variant="outline"
                              className="border-slate-800 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs px-3 py-1.5"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedBooking(null)} />
          <Card className="relative w-full max-w-lg bg-[#0b1020] border-slate-800 rounded-3xl p-6 shadow-2xl z-10 ring-1 ring-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Appointment Details</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {selectedBooking.id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-black/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">
                  Patient Information
                </span>
                <p className="text-white font-semibold text-base">{selectedBooking.clientName}</p>
                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <a href={`tel:${selectedBooking.clientPhone}`} className="hover:text-blue-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {selectedBooking.clientPhone}
                  </a>
                  <a href={`mailto:${selectedBooking.clientEmail}`} className="hover:text-blue-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {selectedBooking.clientEmail}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Doctor</span>
                  <p className="font-medium text-white mt-1">{selectedBooking.doctorName}</p>
                </div>
                <div className="bg-black/40 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Time Slot</span>
                  <p className="font-medium text-white mt-1">
                    {selectedBooking.date} @ {selectedBooking.timeSlot}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Current Status</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    selectedBooking.status === "Confirmed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : selectedBooking.status === "Cancelled"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {selectedBooking.status === "Unconfirmed" && (
                <Button
                  onClick={() => updateStatus(selectedBooking.id, "Confirmed")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs px-4 py-2"
                >
                  Confirm Appointment
                </Button>
              )}
              {selectedBooking.status !== "Cancelled" && (
                <Button
                  onClick={() => updateStatus(selectedBooking.id, "Cancelled")}
                  variant="outline"
                  className="border-slate-800 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs px-4 py-2"
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ======================================================================
// 4. QUERIES TAB (WEBSITE CONTACT SUBMISSIONS & LEADS)
// ======================================================================
function QueriesTab({
  showToast
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [queries, setQueries] = useState<ClientQuery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/queries");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQueries(data.queries || []);
    } catch {
      showToast("Failed to fetch queries", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Patient Inquiries & Leads</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Messages received via the website Clinical Query form
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-800/40 rounded-3xl border border-slate-800" />
          ))}
        </div>
      ) : queries.length === 0 ? (
        <div className="text-center py-16 bg-[#0b1020]/50 border border-slate-800 rounded-3xl p-8">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No patient queries received yet</p>
          <p className="text-xs text-slate-500 mt-1">
            When patients submit the clinical inquiry form on the website, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {queries.map((q) => (
            <Card
              key={q.id}
              className="bg-[#0b1020]/70 border-slate-800/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="font-semibold text-white text-base">{q.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      {new Date(q.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {q.phone && (
                      <a
                        href={`tel:${q.phone}`}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Call Patient"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {q.email && (
                      <a
                        href={`mailto:${q.email}`}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Email Patient"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                  &ldquo;{q.message}&rdquo;
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>{q.email || "No email"}</span>
                <span>{q.phone || "No phone"}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
