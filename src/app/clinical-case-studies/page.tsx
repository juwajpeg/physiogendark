"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  CheckCircle,
  Activity,
  Brain,
  Star,
  Phone,
  MessageCircle,
  BarChart3,
  Microscope,
  Stethoscope,
  FileText,
  User,
  MapPin,
} from "lucide-react"

export default function CaseStudiesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCase, setActiveCase] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setIsVisible(true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const detailedCaseStudies = [
    {
      id: "CS001",
      title: "Post-Surgical ACL Reconstruction Recovery",
      patient: {
        demographics: "Male, 24 years, Professional Soccer Player",
        condition: "Complete ACL Rupture with Meniscal Tear",
        duration: "16-week comprehensive rehabilitation protocol",
      },
      clinicalPresentation: {
        initialAssessment: [
          "Complete loss of anterior cruciate ligament integrity",
          "Grade 2 medial meniscal tear",
          "Significant quadriceps atrophy (35% strength deficit)",
          "Limited range of motion (0-90° flexion)",
          "Positive Lachman and anterior drawer tests",
        ],
        functionalLimitations: [
          "Unable to perform cutting movements",
          "Instability during pivoting activities",
          "Pain level: 7/10 during activity",
          "Significant fear of re-injury",
        ],
      },
      treatmentProtocol: {
        phase1: {
          title: "Acute Phase (Weeks 1-4)",
          interventions: [
            "Cryotherapy and compression therapy",
            "Gentle range of motion exercises",
            "Quadriceps activation protocols",
            "Weight-bearing progression",
            "Patellar mobilization techniques",
          ],
          goals: "Reduce inflammation, restore basic mobility, initiate muscle activation",
        },
        phase2: {
          title: "Strengthening Phase (Weeks 5-10)",
          interventions: [
            "Progressive resistance training",
            "Closed-chain kinetic exercises",
            "Proprioceptive training protocols",
            "Functional movement patterns",
            "Cardiovascular conditioning",
          ],
          goals: "Restore strength, improve neuromuscular control, enhance proprioception",
        },
        phase3: {
          title: "Return-to-Sport Phase (Weeks 11-16)",
          interventions: [
            "Sport-specific movement training",
            "Plyometric exercise progression",
            "Agility and cutting drills",
            "Psychological readiness assessment",
            "Performance optimization protocols",
          ],
          goals: "Achieve sport-specific function, psychological confidence, performance optimization",
        },
      },
      clinicalOutcomes: {
        functionalTests: [
          { test: "Single Leg Hop Test", baseline: "45% deficit", outcome: "98% of contralateral limb" },
          { test: "Y-Balance Test", baseline: "Significant asymmetry", outcome: "Within normal limits" },
          { test: "Isokinetic Strength", baseline: "35% quadriceps deficit", outcome: "102% of baseline" },
          { test: "Return to Sport Scale", baseline: "N/A", outcome: "95/100 confidence score" },
        ],
        clinicalMetrics: [
          { metric: "Range of Motion", baseline: "0-90°", outcome: "0-140° (full restoration)" },
          { metric: "Pain Level (VAS)", baseline: "7/10", outcome: "0/10 at rest, 1/10 with activity" },
          { metric: "Functional Capacity", baseline: "25%", outcome: "98% of pre-injury level" },
          { metric: "Return to Competition", baseline: "N/A", outcome: "Full return at 18 weeks" },
        ],
      },
      followUp: "12-month follow-up: No re-injury, maintained performance level, continued professional career",
      gradient: "from-blue-500 to-cyan-400",
      icon: "Activity",
    },
    {
      id: "CS002",
      title: "Pediatric Cerebral Palsy Motor Development",
      patient: {
        demographics: "Female, 8 years, Spastic Diplegia CP (GMFCS Level III)",
        condition: "Bilateral lower extremity spasticity with gait dysfunction",
        duration: "24-week intensive neurodevelopmental intervention",
      },
      clinicalPresentation: {
        initialAssessment: [
          "Gross Motor Function Measure (GMFM-88): 45%",
          "Significant hip adductor spasticity (Modified Ashworth Scale 3)",
          "Crouch gait pattern with excessive knee flexion",
          "Limited selective motor control",
          "Functional mobility requiring assistive device",
        ],
        functionalLimitations: [
          "Unable to walk independently for >50 meters",
          "Difficulty with stairs and uneven surfaces",
          "Limited participation in age-appropriate activities",
          "Decreased endurance and strength",
        ],
      },
      treatmentProtocol: {
        phase1: {
          title: "Neuromuscular Re-education (Weeks 1-8)",
          interventions: [
            "Neurodevelopmental Treatment (NDT) techniques",
            "Functional electrical stimulation",
            "Selective motor control training",
            "Spasticity management protocols",
            "Postural control activities",
          ],
          goals: "Improve selective motor control, reduce spasticity, enhance postural stability",
        },
        phase2: {
          title: "Functional Training (Weeks 9-16)",
          interventions: [
            "Gait training with body weight support",
            "Strength training using functional movements",
            "Balance and coordination exercises",
            "Adaptive equipment training",
            "Family education and home program",
          ],
          goals: "Enhance functional mobility, improve gait pattern, increase independence",
        },
        phase3: {
          title: "Community Integration (Weeks 17-24)",
          interventions: [
            "Community-based mobility training",
            "School environment adaptations",
            "Recreational activity participation",
            "Peer interaction facilitation",
            "Long-term maintenance planning",
          ],
          goals: "Maximize community participation, maintain gains, promote quality of life",
        },
      },
      clinicalOutcomes: {
        functionalTests: [
          { test: "GMFM-88 Score", baseline: "45%", outcome: "72% (significant improvement)" },
          { test: "6-Minute Walk Test", baseline: "180 meters", outcome: "420 meters" },
          { test: "Timed Up and Go", baseline: "25 seconds", outcome: "12 seconds" },
          { test: "Pediatric Balance Scale", baseline: "28/56", outcome: "48/56" },
        ],
        clinicalMetrics: [
          { metric: "Spasticity (MAS)", baseline: "Grade 3", outcome: "Grade 1-2" },
          { metric: "Selective Motor Control", baseline: "Limited", outcome: "Significantly improved" },
          { metric: "Gait Velocity", baseline: "0.4 m/s", outcome: "0.8 m/s" },
          { metric: "Independence Level", baseline: "Moderate assistance", outcome: "Minimal assistance" },
        ],
      },
      followUp:
        "18-month follow-up: Maintained functional gains, successful school integration, improved quality of life measures",
      gradient: "from-purple-500 to-pink-400",
      icon: "Brain",
    },
    {
      id: "CS003",
      title: "Chronic Low Back Pain with Radiculopathy",
      patient: {
        demographics: "Female, 42 years, Office Manager",
        condition: "L4-L5 disc herniation with right-sided radiculopathy",
        duration: "12-week multimodal conservative treatment approach",
      },
      clinicalPresentation: {
        initialAssessment: [
          "Oswestry Disability Index: 68% (severe disability)",
          "Positive straight leg raise test at 35°",
          "Neurological deficits: L5 dermatome numbness",
          "Significant lumbar flexion restriction",
          "Chronic pain duration: 8 months",
        ],
        functionalLimitations: [
          "Unable to sit for >30 minutes",
          "Difficulty with forward bending activities",
          "Sleep disturbance due to pain",
          "Work productivity significantly impacted",
        ],
      },
      treatmentProtocol: {
        phase1: {
          title: "Pain Management Phase (Weeks 1-4)",
          interventions: [
            "Manual therapy and spinal mobilization",
            "Dry needling for trigger point release",
            "Postural education and ergonomic training",
            "Neural mobilization techniques",
            "Pain science education",
          ],
          goals: "Reduce pain and inflammation, improve mobility, educate patient",
        },
        phase2: {
          title: "Stabilization Phase (Weeks 5-8)",
          interventions: [
            "Core stabilization exercises",
            "Motor control training",
            "Progressive strengthening program",
            "Movement pattern correction",
            "Workplace ergonomic modifications",
          ],
          goals: "Improve spinal stability, enhance motor control, prevent recurrence",
        },
        phase3: {
          title: "Functional Integration (Weeks 9-12)",
          interventions: [
            "Functional movement training",
            "Work-specific conditioning",
            "Maintenance exercise program",
            "Lifestyle modification counseling",
            "Return-to-work planning",
          ],
          goals: "Restore full function, prevent recurrence, optimize long-term outcomes",
        },
      },
      clinicalOutcomes: {
        functionalTests: [
          { test: "Oswestry Disability Index", baseline: "68%", outcome: "12% (minimal disability)" },
          { test: "Visual Analog Scale", baseline: "8/10", outcome: "2/10" },
          { test: "Straight Leg Raise", baseline: "35°", outcome: "80° (normal)" },
          { test: "Lumbar Flexion ROM", baseline: "25°", outcome: "60° (normal)" },
        ],
        clinicalMetrics: [
          { metric: "Sitting Tolerance", baseline: "30 minutes", outcome: "8+ hours" },
          { metric: "Work Productivity", baseline: "40%", outcome: "95%" },
          { metric: "Sleep Quality", baseline: "Poor (3/10)", outcome: "Good (8/10)" },
          { metric: "Medication Use", baseline: "Daily NSAIDs", outcome: "Occasional use only" },
        ],
      },
      followUp:
        "6-month follow-up: No recurrence of symptoms, maintained functional improvements, successful return to full work duties",
      gradient: "from-green-500 to-emerald-400",
      icon: "Target",
    },
    {
      id: "CS004",
      title: "Stroke Recovery and Neuroplasticity Enhancement",
      patient: {
        demographics: "Male, 58 years, Post-CVA (Right MCA Territory)",
        condition: "Left hemiparesis with aphasia and cognitive deficits",
        duration: "20-week comprehensive neurorehabilitation program",
      },
      clinicalPresentation: {
        initialAssessment: [
          "Fugl-Meyer Assessment: 28/66 (severe motor impairment)",
          "Modified Rankin Scale: 4 (moderately severe disability)",
          "Brunnstrom Recovery Stage: Stage 2-3",
          "Significant spasticity in affected limbs",
          "Expressive aphasia with comprehension deficits",
        ],
        functionalLimitations: [
          "Unable to perform activities of daily living independently",
          "Non-functional use of affected upper extremity",
          "Requires assistance for mobility and transfers",
          "Communication barriers affecting social interaction",
        ],
      },
      treatmentProtocol: {
        phase1: {
          title: "Acute Recovery Phase (Weeks 1-6)",
          interventions: [
            "Constraint-induced movement therapy (CIMT)",
            "Functional electrical stimulation",
            "Task-specific training protocols",
            "Speech and language therapy integration",
            "Cognitive rehabilitation exercises",
          ],
          goals: "Promote neuroplasticity, prevent complications, initiate functional recovery",
        },
        phase2: {
          title: "Intensive Rehabilitation (Weeks 7-14)",
          interventions: [
            "Robotic-assisted gait training",
            "Virtual reality-based therapy",
            "Bilateral arm training protocols",
            "Cognitive-motor dual-task training",
            "Family caregiver education",
          ],
          goals: "Maximize motor recovery, improve cognitive function, enhance independence",
        },
        phase3: {
          title: "Community Reintegration (Weeks 15-20)",
          interventions: [
            "Community-based rehabilitation",
            "Driving assessment and training",
            "Vocational rehabilitation planning",
            "Adaptive technology training",
            "Long-term maintenance strategies",
          ],
          goals: "Facilitate community participation, optimize quality of life, prevent decline",
        },
      },
      clinicalOutcomes: {
        functionalTests: [
          { test: "Fugl-Meyer Assessment", baseline: "28/66", outcome: "52/66 (significant improvement)" },
          { test: "Modified Rankin Scale", baseline: "4", outcome: "2 (slight disability)" },
          { test: "Barthel Index", baseline: "35/100", outcome: "85/100" },
          { test: "Berg Balance Scale", baseline: "12/56", outcome: "48/56" },
        ],
        clinicalMetrics: [
          { metric: "Upper Extremity Function", baseline: "Non-functional", outcome: "Functional for ADLs" },
          { metric: "Gait Speed", baseline: "0.2 m/s", outcome: "0.9 m/s" },
          { metric: "Communication Ability", baseline: "Severely impaired", outcome: "Functional communication" },
          { metric: "Independence Level", baseline: "Total assistance", outcome: "Modified independence" },
        ],
      },
      followUp:
        "12-month follow-up: Continued functional improvements, successful return to modified work duties, maintained independence in ADLs",
      gradient: "from-orange-500 to-red-400",
      icon: "Brain",
    },
    {
      id: "CS005",
      title: "Elite Athletic Performance Enhancement",
      patient: {
        demographics: "Male, 26 years, Professional Tennis Player",
        condition: "Performance optimization and injury prevention",
        duration: "16-week periodized training and recovery program",
      },
      clinicalPresentation: {
        initialAssessment: [
          "Baseline VO2 max: 58 ml/kg/min",
          "Functional Movement Screen: 14/21 (multiple asymmetries)",
          "Shoulder internal rotation deficit: 15° bilateral",
          "Core stability deficits identified",
          "Previous history of shoulder impingement",
        ],
        functionalLimitations: [
          "Decreased serve velocity in late sets",
          "Fatigue-related technique breakdown",
          "Recurrent shoulder discomfort",
          "Suboptimal recovery between matches",
        ],
      },
      treatmentProtocol: {
        phase1: {
          title: "Assessment and Correction (Weeks 1-4)",
          interventions: [
            "Comprehensive biomechanical analysis",
            "Movement pattern correction",
            "Targeted mobility interventions",
            "Core stabilization program",
            "Recovery protocol optimization",
          ],
          goals: "Identify and correct movement dysfunctions, establish baseline metrics",
        },
        phase2: {
          title: "Performance Development (Weeks 5-12)",
          interventions: [
            "Sport-specific strength training",
            "Power and explosiveness development",
            "Endurance capacity enhancement",
            "Mental performance training",
            "Nutrition optimization strategies",
          ],
          goals: "Enhance physical performance parameters, improve mental resilience",
        },
        phase3: {
          title: "Competition Preparation (Weeks 13-16)",
          interventions: [
            "Competition simulation training",
            "Tapering and peaking strategies",
            "Match-specific conditioning",
            "Injury prevention protocols",
            "Performance monitoring systems",
          ],
          goals: "Optimize performance for competition, maintain health and prevent injury",
        },
      },
      clinicalOutcomes: {
        functionalTests: [
          { test: "VO2 Max", baseline: "58 ml/kg/min", outcome: "64 ml/kg/min" },
          { test: "Serve Velocity", baseline: "185 km/h", outcome: "198 km/h" },
          { test: "Functional Movement Screen", baseline: "14/21", outcome: "20/21" },
          { test: "Shoulder ROM", baseline: "15° deficit", outcome: "Normal bilateral ROM" },
        ],
        clinicalMetrics: [
          { metric: "Match Endurance", baseline: "Fatigue in 3rd set", outcome: "Maintained performance 5 sets" },
          { metric: "Injury Incidence", baseline: "3 injuries/season", outcome: "0 injuries during program" },
          { metric: "Recovery Time", baseline: "48-72 hours", outcome: "24-36 hours" },
          { metric: "Competition Results", baseline: "ATP Ranking #45", outcome: "ATP Ranking #28" },
        ],
      },
      followUp:
        "Season follow-up: Achieved career-high ranking, no significant injuries, maintained performance improvements",
      gradient: "from-indigo-500 to-purple-400",
      icon: "TrendingUp",
    },
  ]

  const iconMap = {
    Activity,
    Brain,
    Target,
    TrendingUp,
    FileText,
    Star,
    Microscope,
    Calendar,
    Clock,
    Stethoscope,
    MessageCircle,
    Phone,
    MapPin,
    BarChart3,
  };

  const researchMetrics = [
    { label: "Total Cases Documented", value: "2,847", icon: "FileText" },
    { label: "Average Treatment Success Rate", value: "94.2%", icon: "TrendingUp" },
    { label: "Patient Satisfaction Score", value: "9.6/10", icon: "Star" },
    { label: "Research Publications", value: "23", icon: "Microscope" },
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Scientific Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* DNA Helix Pattern */}
        <div className="absolute top-20 right-10 opacity-5">
          <svg width="200" height="400" viewBox="0 0 200 400" className="text-blue-400">
            <path
              d="M50 0 Q100 50 50 100 Q0 150 50 200 Q100 250 50 300 Q0 350 50 400"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M150 0 Q100 50 150 100 Q200 150 150 200 Q100 250 150 300 Q200 350 150 400"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1={i * 50 + 25}
                x2="150"
                y2={i * 50 + 25}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* Molecular Structure */}
        <div className="absolute bottom-20 left-10 opacity-5">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-green-400">
            <circle cx="150" cy="150" r="8" fill="currentColor" />
            <circle cx="100" cy="100" r="6" fill="currentColor" />
            <circle cx="200" cy="100" r="6" fill="currentColor" />
            <circle cx="100" cy="200" r="6" fill="currentColor" />
            <circle cx="200" cy="200" r="6" fill="currentColor" />
            <circle cx="50" cy="150" r="4" fill="currentColor" />
            <circle cx="250" cy="150" r="4" fill="currentColor" />
            <line x1="150" y1="150" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="200" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="100" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="200" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="100" x2="50" y2="150" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="100" x2="250" y2="150" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Anatomical Grid */}
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
      <header className="fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-7xl bg-black/30 backdrop-blur-2xl z-40 transition-all duration-500 rounded-2xl border border-white/10 shadow-2xl">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white transition-all duration-300 hover:text-blue-400 group"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-lg md:text-xl font-light hidden md:inline">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Physiogen
                </span>
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 font-light text-sm md:text-base">Clinical Case Studies</span>
              <a href="tel:00923137818887">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 md:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 text-xs md:text-sm">
                  Schedule Assessment
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        {/* Background Scientific Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4">
            <BarChart3 className="h-32 w-32 text-blue-400 transform rotate-12" />
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <Microscope className="h-40 w-40 text-green-400 transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <Stethoscope className="h-24 w-24 text-purple-400 transform rotate-45" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-6xl mx-auto text-center">
            <div
              className={`space-y-12 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full text-sm font-medium text-blue-300 mb-8 border border-blue-500/30">
                  <FileText className="h-4 w-4" />
                  <span>Evidence-Based Clinical Documentation</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-none">
                  <span className="block">Clinical</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                    Case Studies
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                  Comprehensive documentation of clinical interventions, treatment outcomes, and evidence-based
                  therapeutic protocols demonstrating the efficacy of our rehabilitation science approach.
                </p>
              </div>

              {/* Research Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-5xl mx-auto">
                {researchMetrics.map((metric, index) => {
                  const Icon = iconMap[metric.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={index}
                      className="text-center transition-all duration-500 ease-out hover:scale-110 group cursor-pointer"
                      style={{
                        animationDelay: `${index * 200 + 800}ms`,
                        transform: isVisible ? "translateY(0)" : "translateY(20px)",
                        opacity: isVisible ? 1 : 0,
                        transition: `all 0.6s ease-out ${index * 200 + 800}ms`,
                      }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-light bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                        {metric.value}
                      </div>
                      <div className="text-gray-400 font-light text-sm mt-2">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Navigation */}
      <section className="py-16 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {detailedCaseStudies.map((study, index) => (
                <button
                  key={study.id}
                  onClick={() => setActiveCase(index)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-light border ${
                    activeCase === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                      : "text-gray-300 border-gray-600 hover:border-gray-400 hover:text-white"
                  }`}
                >
                  {study.id}: {study.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Case Study Display */}
      <section className="pb-32 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            {detailedCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`transition-all duration-500 ${
                  activeCase === index ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                {/* Case Study Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center space-x-6 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${study.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                    >
                      {(() => {
                        const Icon = iconMap[study.icon as keyof typeof iconMap];
                        return <Icon className="h-6 w-6" />;
                      })()}
                    </div>
                    <div className="text-left pl-2">
                      <div className="text-sm text-gray-400 font-light">Case Study {study.id}</div>
                      <h2 className="text-3xl font-light text-white">{study.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Patient Information */}
                <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-light text-white mb-6 flex items-center space-x-3">
                      <User className="h-6 w-6 text-blue-400" />
                      <span>Patient Demographics & Condition</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Demographics</h4>
                        <p className="text-gray-200 font-light">{study.patient.demographics}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Primary Condition</h4>
                        <p className="text-gray-200 font-light">{study.patient.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Treatment Duration</h4>
                        <p className="text-gray-200 font-light">{study.patient.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Presentation */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                        <Stethoscope className="h-5 w-5 text-red-400" />
                        <span>Initial Clinical Assessment</span>
                      </h3>
                      <div className="space-y-3">
                        {study.clinicalPresentation.initialAssessment.map((finding, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 font-light text-sm">{finding}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                        <Target className="h-5 w-5 text-orange-400" />
                        <span>Functional Limitations</span>
                      </h3>
                      <div className="space-y-3">
                        {study.clinicalPresentation.functionalLimitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 font-light text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Treatment Protocol */}
                <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-light text-white mb-8 flex items-center space-x-3">
                      <Activity className="h-6 w-6 text-green-400" />
                      <span>Evidence-Based Treatment Protocol</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {Object.entries(study.treatmentProtocol).map(([phaseKey, phase]) => (
                        <div key={phaseKey} className="space-y-4">
                          <div className="text-center">
                            <h4 className="text-lg font-light text-white mb-2">{phase.title}</h4>
                            <p className="text-gray-400 font-light text-sm mb-4">{phase.goals}</p>
                          </div>
                          <div className="space-y-3">
                            {phase.interventions.map((intervention, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 font-light text-sm">{intervention}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Outcomes */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                        <span>Functional Test Results</span>
                      </h3>
                      <div className="space-y-4">
                        {study.clinicalOutcomes.functionalTests.map((test, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-200 font-light text-sm">{test.test}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-gray-400">Baseline: </span>
                                <span className="text-red-300">{test.baseline}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Outcome: </span>
                                <span className="text-green-300">{test.outcome}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span>Clinical Metrics</span>
                      </h3>
                      <div className="space-y-4">
                        {study.clinicalOutcomes.clinicalMetrics.map((metric, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-200 font-light text-sm">{metric.metric}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-gray-400">Baseline: </span>
                                <span className="text-red-300">{metric.baseline}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Outcome: </span>
                                <span className="text-green-300">{metric.outcome}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Follow-up Results */}
                <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light text-white mb-4 flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-400" />
                      <span>Long-term Follow-up</span>
                    </h3>
                    <p className="text-gray-300 font-light leading-relaxed">{study.followUp}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-green-300 mb-8 border border-green-500/30">
                <Calendar className="h-4 w-4" />
                <span>Begin Your Clinical Journey</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extralight text-white mb-6">
                Experience Evidence-Based
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Clinical Excellence
                </span>
              </h2>

              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto mb-12">
                Join thousands of patients who have achieved optimal outcomes through our comprehensive, evidence-based
                rehabilitation protocols and personalized treatment approaches.
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
              Advancing human movement science through evidence-based clinical practice, innovative therapeutic
              interventions, and comprehensive rehabilitation protocols.
            </p>
            <div className="border-t border-gray-700 pt-8 text-gray-400 font-light">
              <p>
                &copy; 2024 Physiogen Clinical Sciences. All rights reserved. Licensed healthcare facility providing
                evidence-based rehabilitation services.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
