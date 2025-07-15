"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Star,
  Phone,
  MessageCircle,
  FileText,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Eye,
  Award,
  Layers,
  Database,
  X,
} from "lucide-react"

// Mock data generator for demonstration
const generateMockCaseStudies = (count: number) => {
  const conditions = [
    "ACL Reconstruction",
    "Cerebral Palsy",
    "Stroke Recovery",
    "Low Back Pain",
    "Shoulder Impingement",
    "Hip Replacement",
    "Spinal Cord Injury",
    "Parkinson's Disease",
    "Multiple Sclerosis",
    "Traumatic Brain Injury",
    "Chronic Pain",
    "Sports Injury",
    "Arthritis",
    "Fibromyalgia",
    "Carpal Tunnel",
    "Tennis Elbow",
    "Plantar Fasciitis",
    "Rotator Cuff Tear",
    "Meniscus Tear",
    "Fracture Recovery",
  ]

  const specialties = [
    "Orthopedic",
    "Neurological",
    "Sports Medicine",
    "Pediatric",
    "Geriatric",
    "Cardiopulmonary",
    "Women's Health",
    "Hand Therapy",
    "Vestibular",
    "Oncology",
  ]

  const outcomes = ["Excellent", "Good", "Fair", "Poor"]
  const treatmentTypes = ["Manual Therapy", "Exercise Therapy", "Electrotherapy", "Hydrotherapy", "Dry Needling"]

  return Array.from({ length: count }, (_, i) => ({
    id: `CS${String(i + 1).padStart(6, "0")}`,
    title: `${conditions[Math.floor(Math.random() * conditions.length)]} Treatment Protocol`,
    patient: {
      age: Math.floor(Math.random() * 80) + 10,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      duration: `${Math.floor(Math.random() * 24) + 4} weeks`,
    },
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    treatmentType: treatmentTypes[Math.floor(Math.random() * treatmentTypes.length)],
    outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
    successRate: Math.floor(Math.random() * 40) + 60, // 60-100%
    dateCompleted: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3), // Last 3 years
    therapist: `Dr. ${["Smith", "Johnson", "Williams", "Brown", "Jones"][Math.floor(Math.random() * 5)]}`,
    tags: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => ["acute", "chronic", "post-surgical", "conservative", "intensive"][Math.floor(Math.random() * 5)],
    ),
    metrics: {
      painReduction: Math.floor(Math.random() * 8) + 2, // 2-10 point reduction
      functionalImprovement: Math.floor(Math.random() * 40) + 40, // 40-80% improvement
      satisfactionScore: (Math.random() * 2 + 8).toFixed(1), // 8.0-10.0
    },
  }))
}

export default function CaseStudiesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Data management
  const [allCaseStudies] = useState(() => generateMockCaseStudies(150000)) // 150k cases for demo
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  // Search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    specialty: "",
    condition: "",
    outcome: "",
    treatmentType: "",
    dateRange: "",
    ageRange: "",
    gender: "",
  })
  const [sortBy, setSortBy] = useState<"date" | "outcome" | "success" | "duration">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    setIsVisible(true)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Filter and search logic
  const filteredCases = useMemo(() => {
    const filtered = allCaseStudies.filter((caseStudy) => {
      const matchesSearch =
        searchTerm === "" ||
        caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.therapist.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecialty = filters.specialty === "" || caseStudy.specialty === filters.specialty
      const matchesCondition = filters.condition === "" || caseStudy.patient.condition === filters.condition
      const matchesOutcome = filters.outcome === "" || caseStudy.outcome === filters.outcome
      const matchesTreatment = filters.treatmentType === "" || caseStudy.treatmentType === filters.treatmentType
      const matchesGender = filters.gender === "" || caseStudy.patient.gender === filters.gender

      return (
        matchesSearch && matchesSpecialty && matchesCondition && matchesOutcome && matchesTreatment && matchesGender
      )
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = a.dateCompleted.getTime() - b.dateCompleted.getTime()
          break
        case "outcome":
          const outcomeOrder = { Excellent: 4, Good: 3, Fair: 2, Poor: 1 }
          comparison =
            outcomeOrder[a.outcome as keyof typeof outcomeOrder] - outcomeOrder[b.outcome as keyof typeof outcomeOrder]
          break
        case "success":
          comparison = a.successRate - b.successRate
          break
        case "duration":
          comparison = Number.parseInt(a.patient.duration) - Number.parseInt(b.patient.duration)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [allCaseStudies, searchTerm, filters, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage)
  const paginatedCases = filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Statistics
  const stats = useMemo(() => {
    const total = filteredCases.length
    const excellent = filteredCases.filter((c) => c.outcome === "Excellent").length
    const avgSuccess = filteredCases.reduce((sum, c) => sum + c.successRate, 0) / total || 0
    const avgSatisfaction =
      filteredCases.reduce((sum, c) => sum + Number.parseFloat(c.metrics.satisfactionScore), 0) / total || 0

    return {
      total,
      excellentRate: ((excellent / total) * 100).toFixed(1),
      avgSuccess: avgSuccess.toFixed(1),
      avgSatisfaction: avgSatisfaction.toFixed(1),
    }
  }, [filteredCases])

  // Get unique values for filter dropdowns
  const uniqueSpecialties = [...new Set(allCaseStudies.map((c) => c.specialty))].sort()
  const uniqueConditions = [...new Set(allCaseStudies.map((c) => c.patient.condition))].sort()
  const uniqueOutcomes = ["Excellent", "Good", "Fair", "Poor"]
  const uniqueTreatmentTypes = [...new Set(allCaseStudies.map((c) => c.treatmentType))].sort()

  const clearFilters = () => {
    setFilters({
      specialty: "",
      condition: "",
      outcome: "",
      treatmentType: "",
      dateRange: "",
      ageRange: "",
      gender: "",
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "Excellent":
        return "text-green-400 bg-green-400/10"
      case "Good":
        return "text-blue-400 bg-blue-400/10"
      case "Fair":
        return "text-yellow-400 bg-yellow-400/10"
      case "Poor":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const CaseCard = ({ caseStudy }: { caseStudy: any }) => (
    <Link href={`/clinical-case-studies/${caseStudy.id}`} passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">{caseStudy.id}</div>
                <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {caseStudy.title}
                </h3>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(caseStudy.outcome)}`}>
                {caseStudy.outcome}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Patient:</span>
                  <div className="text-gray-200">
                    {caseStudy.patient.gender}, {caseStudy.patient.age}y
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <div className="text-gray-200">{caseStudy.patient.duration}</div>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-gray-400">Condition:</span>
                <div className="text-gray-200 font-medium">{caseStudy.patient.condition}</div>
              </div>

              <div className="text-xs">
                <span className="text-gray-400">Specialty:</span>
                <span className="text-blue-400 ml-1">{caseStudy.specialty}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <div className="text-xs">
                  <span className="text-gray-400">Success:</span>
                  <span className="text-green-400 ml-1 font-medium">{caseStudy.successRate}%</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-yellow-400 ml-1 font-medium">{caseStudy.metrics.satisfactionScore}/10</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">{caseStudy.dateCompleted.toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  )

  const CaseListItem = ({ caseStudy }: { caseStudy: any }) => (
    <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 grid grid-cols-6 gap-4 items-center">
            <div>
              <div className="text-xs text-gray-400">{caseStudy.id}</div>
              <div className="text-sm text-white font-medium truncate">{caseStudy.title}</div>
            </div>
            <div className="text-sm text-gray-200">{caseStudy.patient.condition}</div>
            <div className="text-sm text-blue-400">{caseStudy.specialty}</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getOutcomeColor(caseStudy.outcome)}`}>
              {caseStudy.outcome}
            </div>
            <div className="text-sm text-green-400 font-medium">{caseStudy.successRate}%</div>
            <div className="text-xs text-gray-400">{caseStudy.dateCompleted.toLocaleDateString()}</div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="ml-4 text-blue-400 hover:text-blue-300"
            onClick={() => setSelectedCase(caseStudy.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Scientific Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-10 opacity-5">
          <Database className="h-32 w-32 text-blue-400 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5">
          <Layers className="h-40 w-40 text-green-400 transform -rotate-12" />
        </div>
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="text-gray-600">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none transition-all duration-1000 z-10"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`,
        }}
      />

      {/* Header */}
      <header className="fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-7xl bg-black/30 backdrop-blur-2xl z-40 transition-all duration-500 rounded-2xl border border-white/10 shadow-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white transition-all duration-300 hover:text-blue-400 group"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-xl font-light">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Physiogen
                </span>
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 font-light">Clinical Database</span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <a href="tel:00923137818887">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                    Schedule Assessment
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Statistics */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div
              className={`space-y-8 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full text-sm font-medium text-blue-300 border border-blue-500/30">
                  <Database className="h-4 w-4" />
                  <span>Clinical Research Database</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white leading-none">
                  <span className="block">Clinical Case</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                    Database System
                  </span>
                </h1>

                <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Comprehensive repository of clinical interventions, treatment outcomes, and evidence-based protocols.
                  Search, filter, and analyze from our extensive database of documented cases.
                </p>
              </div>

              {/* Statistics Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-light bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stats.total.toLocaleString()}
                  </div>
                  <div className="text-gray-400 font-light text-sm">Total Cases</div>
                </div>

                <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-light bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {stats.avgSuccess}%
                  </div>
                  <div className="text-gray-400 font-light text-sm">Avg Success Rate</div>
                </div>

                <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-light bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {stats.avgSatisfaction}/10
                  </div>
                  <div className="text-gray-400 font-light text-sm">Patient Satisfaction</div>
                </div>

                <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-light bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stats.excellentRate}%
                  </div>
                  <div className="text-gray-400 font-light text-sm">Excellent Outcomes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Controls */}
      <section className="py-8 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cases by ID, condition, therapist, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <Button
                      onClick={() => setShowFilters(!showFilters)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {Object.values(filters).some((v) => v !== "") && (
                        <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full"></span>
                      )}
                    </Button>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-800">
                      <select
                        value={filters.specialty}
                        onChange={(e) => setFilters((prev) => ({ ...prev, specialty: e.target.value }))}
                        className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">All Specialties</option>
                        {uniqueSpecialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filters.condition}
                        onChange={(e) => setFilters((prev) => ({ ...prev, condition: e.target.value }))}
                        className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">All Conditions</option>
                        {uniqueConditions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filters.outcome}
                        onChange={(e) => setFilters((prev) => ({ ...prev, outcome: e.target.value }))}
                        className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">All Outcomes</option>
                        {uniqueOutcomes.map((outcome) => (
                          <option key={outcome} value={outcome}>
                            {outcome}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filters.treatmentType}
                        onChange={(e) => setFilters((prev) => ({ ...prev, treatmentType: e.target.value }))}
                        className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">All Treatments</option>
                        {uniqueTreatmentTypes.map((treatment) => (
                          <option key={treatment} value={treatment}>
                            {treatment}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filters.gender}
                        onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
                        className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>

                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  )}

                  {/* Sort and View Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Sort by:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="date">Date</option>
                          <option value="outcome">Outcome</option>
                          <option value="success">Success Rate</option>
                          <option value="duration">Duration</option>
                        </select>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                          className="text-gray-400 hover:text-white"
                        >
                          {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Show:</span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => setItemsPerPage(Number(e.target.value))}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                          <option value={200}>200</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        {((currentPage - 1) * itemsPerPage + 1).toLocaleString()} -{" "}
                        {Math.min(currentPage * itemsPerPage, filteredCases.length).toLocaleString()} of{" "}
                        {filteredCases.length.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewMode("grid")}
                          className={`${viewMode === "grid" ? "text-blue-400" : "text-gray-400"} hover:text-white`}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewMode("list")}
                          className={`${viewMode === "list" ? "text-blue-400" : "text-gray-400"} hover:text-white`}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedCases.map((caseStudy) => (
                  <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
                ))}
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {/* List Header */}
                <Card className="border-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-400">
                      <div>Case ID / Title</div>
                      <div>Condition</div>
                      <div>Specialty</div>
                      <div>Outcome</div>
                      <div>Success Rate</div>
                      <div>Date</div>
                    </div>
                  </CardContent>
                </Card>
                {paginatedCases.map((caseStudy) => (
                  <CaseListItem key={caseStudy.id} caseStudy={caseStudy} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-green-300 border border-green-500/30">
                <Calendar className="h-4 w-4" />
                <span>Join Our Clinical Database</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extralight text-white mb-6">
                Contribute to Evidence-Based
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Healthcare Research
                </span>
              </h2>

              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto mb-12">
                Be part of our comprehensive clinical research database. Your case contributes to advancing
                rehabilitation science and improving patient outcomes worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="https://wa.me/923137818887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex justify-center"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <MessageCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    Schedule Clinical Assessment
                  </Button>
                </a>

                <a href="tel:00923137818887" className="w-full sm:w-auto flex justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto bg-transparent"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>

              <div className="pt-12 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>35, Iqbal, Block Commercial FF Bahria Town, Lahore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black text-white relative overflow-hidden border-t border-gray-800/50">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Link href="/" className="text-3xl font-extralight hover:text-blue-400 transition-colors duration-300">
              Physiogen
            </Link>
            <p className="text-gray-300 font-light max-w-3xl mx-auto text-lg">
              Advancing human movement science through evidence-based clinical practice, comprehensive data analysis,
              and innovative therapeutic interventions.
            </p>
            <div className="border-t border-gray-700 pt-8 text-gray-400 font-light">
              <p>
                &copy; 2024 Physiogen Clinical Sciences. All rights reserved. Licensed healthcare facility providing
                evidence-based rehabilitation services and clinical research.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

