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
  Phone,
  MessageCircle,
  BarChart3,
  Stethoscope,
  FileText,
  Download,
  Share2,
  User,
  MapPin,
} from "lucide-react"

// TypeScript interfaces for case study data
interface PatientInfo {
  demographics: string;
  condition: string;
  duration: string;
  surgicalDetails?: string;
  medicalHistory?: string;
}

interface ClinicalPresentation {
  initialAssessment: string[];
  functionalLimitations: string[];
  diagnosticImaging?: string[];
}

interface TreatmentPhase {
  title: string;
  duration?: string;
  frequency?: string;
  interventions: string[];
  goals: string;
  milestones?: string[];
}

interface TreatmentProtocol {
  [phase: string]: TreatmentPhase;
}

interface FunctionalTest {
  test: string;
  baseline: string;
  week8?: string;
  week12?: string;
  outcome: string;
}

interface ClinicalMetric {
  metric: string;
  baseline: string;
  week4?: string;
  week8?: string;
  week12?: string;
  week16?: string;
  outcome: string;
}

interface ClinicalOutcomes {
  functionalTests: FunctionalTest[];
  clinicalMetrics: ClinicalMetric[];
  complications?: string[];
}

type FollowUp =
  | string
  | {
      shortTerm: string;
      mediumTerm: string;
      longTerm: string;
      additionalNotes?: string;
    };

export interface CaseStudy {
  id: string;
  title: string;
  patient: PatientInfo;
  clinicalPresentation: ClinicalPresentation;
  treatmentProtocol: TreatmentProtocol;
  clinicalOutcomes: ClinicalOutcomes;
  followUp: FollowUp;
  gradient: string;
  icon: React.ElementType;
  specialty: string;
  therapist: string;
  assistingStaff?: string[];
  dateCompleted: string;
  surgicalDate?: string;
  successRate: number;
  evidenceBase?: string[];
  keyLearnings?: string[];
}

// Comprehensive detailed case studies data
const detailedCaseStudies: { [key: string]: CaseStudy } = {
  CS000001: {
    id: "CS000001",
    title: "Post-Surgical ACL Reconstruction Recovery",
    patient: {
      demographics: "Male, 24 years, Professional Soccer Player, 180cm, 75kg",
      condition: "Complete ACL Rupture with Grade 2 Medial Meniscal Tear",
      duration: "16-week comprehensive rehabilitation protocol",
      surgicalDetails:
        "Arthroscopic ACL reconstruction using hamstring autograft, performed by Dr. Martinez on January 15, 2024",
      medicalHistory: "No previous knee injuries, excellent baseline fitness level, competitive athlete for 12 years",
    },
    clinicalPresentation: {
      initialAssessment: [
        "Complete loss of anterior cruciate ligament integrity confirmed via MRI",
        "Grade 2 medial meniscal tear with horizontal cleavage pattern",
        "Significant quadriceps atrophy (35% strength deficit compared to contralateral limb)",
        "Limited range of motion (0-90° flexion, lacking 5° extension)",
        "Positive Lachman test (Grade 3), positive anterior drawer test",
        "Moderate joint effusion with circumferential swelling",
        "Pain level: 7/10 during activity, 4/10 at rest (VAS scale)",
        "Functional hop test: Unable to perform due to instability and pain",
      ],
      functionalLimitations: [
        "Unable to perform cutting movements or directional changes",
        "Significant instability during pivoting activities and deceleration",
        "Cannot run in straight line without knee brace support",
        "Difficulty with stairs, particularly descending",
        "Sleep disturbance due to pain and positioning discomfort",
        "Significant fear of re-injury affecting psychological readiness",
        "Unable to participate in any sport-specific activities",
        "Compensatory movement patterns affecting hip and ankle mechanics",
      ],
      diagnosticImaging: [
        "MRI: Complete ACL rupture at femoral attachment site",
        "Bone bruising present on lateral femoral condyle and posterior tibial plateau",
        "Medial meniscus: horizontal tear extending 8mm from posterior horn",
        "No evidence of other ligamentous injury (PCL, MCL, LCL intact)",
        "Minimal cartilage damage noted on arthroscopic evaluation",
      ],
    },
    treatmentProtocol: {
      phase1: {
        title: "Acute Post-Surgical Phase (Weeks 1-4)",
        duration: "4 weeks",
        frequency: "Daily sessions, 45-60 minutes",
        interventions: [
          "Cryotherapy protocol: 20 minutes every 2 hours for first 72 hours",
          "Compression therapy using pneumatic compression device",
          "Gentle passive range of motion exercises (0-90° progression)",
          "Quadriceps activation exercises with biofeedback",
          "Straight leg raises in multiple planes (when quad control achieved)",
          "Weight-bearing progression: PWB → WBAT → FWB over 3 weeks",
          "Patellar mobilization techniques to prevent adhesions",
          "Electrical muscle stimulation for quadriceps re-education",
          "Gait training with assistive devices as needed",
          "Patient education on healing phases and precautions",
        ],
        goals:
          "Reduce inflammation and pain, restore basic mobility, initiate muscle activation, protect graft healing",
        milestones: [
          "Week 1: Achieve 0-60° ROM, minimal pain with ADLs",
          "Week 2: Progress to 0-90° ROM, independent SLR",
          "Week 3: Full weight bearing without assistive device",
          "Week 4: 0-110° ROM, good quadriceps activation",
        ],
      },
      phase2: {
        title: "Intermediate Strengthening Phase (Weeks 5-10)",
        duration: "6 weeks",
        frequency: "5 sessions per week, 60-75 minutes",
        interventions: [
          "Progressive resistance training using leg press (bilateral → unilateral)",
          "Closed-chain kinetic exercises: mini-squats, step-ups, wall sits",
          "Proprioceptive training on unstable surfaces (foam, BOSU ball)",
          "Stationary cycling for cardiovascular fitness and ROM",
          "Pool therapy for low-impact strengthening and conditioning",
          "Core stabilization exercises focusing on lumbopelvic control",
          "Hip strengthening in all planes (abduction, extension, external rotation)",
          "Calf strengthening and Achilles tendon flexibility",
          "Balance training progression: static → dynamic → sport-specific",
          "Functional movement pattern training (squatting, lunging)",
        ],
        goals:
          "Restore strength symmetry, improve neuromuscular control, enhance proprioception, normalize movement patterns",
        milestones: [
          "Week 6: 80% quadriceps strength compared to contralateral",
          "Week 8: Single leg balance >30 seconds eyes closed",
          "Week 10: Hop test >70% of contralateral limb",
          "Week 10: Return to jogging program initiation",
        ],
      },
      phase3: {
        title: "Advanced Return-to-Sport Phase (Weeks 11-16)",
        duration: "6 weeks",
        frequency: "6 sessions per week, 75-90 minutes",
        interventions: [
          "Sport-specific movement training: cutting, pivoting, jumping",
          "Plyometric exercise progression: bilateral → unilateral → multidirectional",
          "Agility ladder drills and cone exercises",
          "Sport-specific drills: ball handling, shooting, passing under fatigue",
          "High-intensity interval training for match conditioning",
          "Advanced proprioceptive challenges with cognitive loading",
          "Return-to-running progression: straight line → curves → sprints",
          "Psychological readiness assessment and confidence building",
          "Video analysis of movement patterns and technique refinement",
          "Gradual return to team training and contact activities",
        ],
        goals: "Achieve sport-specific function, psychological confidence, performance optimization, injury prevention",
        milestones: [
          "Week 12: Pass all functional movement screens",
          "Week 14: Complete sport-specific testing battery",
          "Week 16: Medical clearance for full competition",
          "Week 16: Psychological readiness score >90/100",
        ],
      },
    },
    clinicalOutcomes: {
      functionalTests: [
        {
          test: "Single Leg Hop Test",
          baseline: "Unable to perform (0%)",
          week8: "68% of contralateral limb",
          week12: "89% of contralateral limb",
          outcome: "98% of contralateral limb (>90% = normal)",
        },
        {
          test: "Triple Hop for Distance",
          baseline: "Unable to perform",
          week8: "72% of contralateral limb",
          week12: "91% of contralateral limb",
          outcome: "96% of contralateral limb",
        },
        {
          test: "Y-Balance Test (Anterior Reach)",
          baseline: "Significant asymmetry (>4cm difference)",
          week8: "2.1cm difference",
          week12: "0.8cm difference",
          outcome: "Within normal limits (<4mm difference)",
        },
        {
          test: "Isokinetic Quadriceps Strength (60°/sec)",
          baseline: "35% deficit compared to contralateral",
          week8: "18% deficit",
          week12: "8% deficit",
          outcome: "102% of contralateral limb strength",
        },
        {
          test: "Return to Sport Scale (Psychological)",
          baseline: "N/A (post-surgical)",
          week8: "65/100 confidence score",
          week12: "82/100 confidence score",
          outcome: "95/100 confidence score (>90 = ready)",
        },
      ],
      clinicalMetrics: [
        {
          metric: "Range of Motion (Flexion)",
          baseline: "0-90° (limited by pain/swelling)",
          week4: "0-110°",
          week8: "0-130°",
          outcome: "0-140° (full restoration, matches contralateral)",
        },
        {
          metric: "Pain Level (VAS 0-10)",
          baseline: "7/10 with activity, 4/10 at rest",
          week4: "3/10 with activity, 1/10 at rest",
          week8: "1/10 with activity, 0/10 at rest",
          outcome: "0/10 at rest, 1/10 with high-intensity activity",
        },
        {
          metric: "Functional Capacity (Tegner Activity Scale)",
          baseline: "Level 2 (unable to run)",
          week8: "Level 6 (recreational sports)",
          week12: "Level 8 (competitive sports)",
          outcome: "Level 9 (elite competitive sports - pre-injury level)",
        },
        {
          metric: "Quadriceps Circumference",
          baseline: "3.2cm atrophy compared to contralateral",
          week4: "2.1cm difference",
          week8: "0.8cm difference",
          outcome: "0.2cm difference (within normal variation)",
        },
        {
          metric: "Return to Competition Timeline",
          baseline: "N/A",
          week12: "Cleared for practice",
          week16: "Cleared for competition",
          outcome: "Full return to professional competition at 18 weeks",
        },
      ],
      complications: [
        "Week 3: Mild anterior knee pain due to aggressive ROM progression - resolved with modified protocol",
        "Week 7: Temporary plateau in strength gains - addressed with exercise variation and motivation",
        "Week 11: Minor hamstring tightness - resolved with targeted stretching program",
      ],
    },
    followUp: {
      shortTerm:
        "6-week follow-up: Excellent progress maintained, no pain or instability reported, full participation in training",
      mediumTerm: "3-month follow-up: Completed full season without re-injury, maintained strength and function levels",
      longTerm:
        "12-month follow-up: No re-injury, maintained performance level at pre-injury standards, continued professional career with contract renewal",
      additionalNotes:
        "Patient reported increased confidence in knee stability and overall improved fitness level compared to pre-injury status",
    },
    gradient: "from-blue-500 to-cyan-400",
    icon: Activity,
    specialty: "Sports Medicine & Orthopedic Rehabilitation",
    therapist: "Dr. Sarah Johnson, PT, DPT, SCS",
    assistingStaff: ["Maria Rodriguez, PTA", "James Chen, Exercise Physiologist"],
    dateCompleted: "2024-05-15",
    surgicalDate: "2024-01-15",
    successRate: 98,
    evidenceBase: [
      "ACL rehabilitation protocols based on Shelbourne & Nitz criteria",
      "Return-to-sport testing battery per Kyritsis et al. guidelines",
      "Psychological readiness assessment using validated ACL-RSI scale",
      "Strength testing protocols following Davies & Zillmer standards",
    ],
    keyLearnings: [
      "Early quadriceps activation crucial for optimal outcomes",
      "Psychological readiness equally important as physical metrics",
      "Sport-specific training essential for elite athlete return",
      "Patient education and compliance directly correlate with success",
    ],
  },
  // Keep the existing CS000002 data and add fallback for other IDs
  CS000002: {
    id: "CS000002",
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
    icon: Brain,
    specialty: "Pediatric Neurology",
    therapist: "Dr. Michael Chen",
    dateCompleted: "2024-02-28",
    successRate: 89,
  },
}

// Add correct props type for Next.js App Router

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CaseStudyDetailPage({ params }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setIsVisible(true)

    // Load case study data
    const study = detailedCaseStudies[params.id]
    if (study) {
      setCaseStudy(study)
    } else {
      // Generate mock data for other IDs
      setCaseStudy({
        id: params.id,
        title: "Clinical Case Study",
        patient: {
          demographics: "Patient demographics not available",
          condition: "Condition details not available",
          duration: "Duration not specified",
        },
        clinicalPresentation: {
          initialAssessment: ["Assessment data not available"],
          functionalLimitations: ["Limitation data not available"],
        },
        treatmentProtocol: {
          phase1: {
            title: "Phase 1",
            interventions: ["Intervention data not available"],
            goals: "Goals not specified",
          },
        },
        clinicalOutcomes: {
          functionalTests: [{ test: "Test data not available", baseline: "N/A", outcome: "N/A" }],
          clinicalMetrics: [{ metric: "Metric data not available", baseline: "N/A", outcome: "N/A" }],
        },
        followUp: "Follow-up data not available",
        gradient: "from-gray-500 to-gray-400",
        icon: FileText,
        specialty: "General",
        therapist: "Dr. Unknown",
        dateCompleted: "2024-01-01",
        successRate: 0,
      })
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [params.id])

  if (!caseStudy) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  }

  const IconComponent = caseStudy.icon

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Scientific Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
            <div className="flex items-center space-x-4">
              <Link
                href="/case-studies"
                className="flex items-center space-x-3 text-white transition-all duration-300 hover:text-blue-400 group"
              >
                <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="text-xl font-light">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Back to Database
                  </span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 font-light">{caseStudy.id}</span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
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

      {/* Case Study Content */}
      <section className="pt-32 pb-32 relative">
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Case Study Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-6 mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${caseStudy.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-400 font-light mb-1">Case Study {caseStudy.id}</div>
                    <h1 className="text-4xl font-light text-white mb-2">{caseStudy.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-300 mb-2">
                      <span>{caseStudy.specialty}</span>
                      <span>•</span>
                      <span>{caseStudy.therapist}</span>
                      <span>•</span>
                      <span>{caseStudy.dateCompleted}</span>
                      <span>•</span>
                      <span className="text-green-400 font-medium">{caseStudy.successRate}% Success Rate</span>
                    </div>
                    {caseStudy.assistingStaff && (
                      <div className="text-xs text-gray-400">
                        Assisting Staff: {caseStudy.assistingStaff.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light text-white mb-6 flex items-center space-x-3">
                    <User className="h-6 w-6 text-blue-400" />
                    <span>Patient Demographics & Condition</span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Demographics</h3>
                      <p className="text-gray-200 font-light">{caseStudy.patient.demographics}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Primary Condition</h3>
                      <p className="text-gray-200 font-light">{caseStudy.patient.condition}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Treatment Duration</h3>
                      <p className="text-gray-200 font-light">{caseStudy.patient.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Presentation */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                  <CardContent className="p-8">
                    <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                      <Stethoscope className="h-5 w-5 text-red-400" />
                      <span>Initial Clinical Assessment</span>
                    </h2>
                    <div className="space-y-3">
                      {caseStudy.clinicalPresentation.initialAssessment.map((finding, idx) => (
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
                    <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                      <Target className="h-5 w-5 text-orange-400" />
                      <span>Functional Limitations</span>
                    </h2>
                    <div className="space-y-3">
                      {caseStudy.clinicalPresentation.functionalLimitations.map((limitation, idx) => (
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
                  <h2 className="text-2xl font-light text-white mb-8 flex items-center space-x-3">
                    <Activity className="h-6 w-6 text-green-400" />
                    <span>Evidence-Based Treatment Protocol</span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(caseStudy.treatmentProtocol).map(([phaseKey, phase]) => (
                      <div key={phaseKey} className="space-y-4">
                        <div className="text-center">
                          <h3 className="text-lg font-light text-white mb-2">{phase.title}</h3>
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
                    <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                      <span>Functional Test Results</span>
                    </h2>
                    <div className="space-y-4">
                      {caseStudy.clinicalOutcomes.functionalTests.map((test, idx) => (
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
                    <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <span>Clinical Metrics</span>
                    </h2>
                    <div className="space-y-4">
                      {caseStudy.clinicalOutcomes.clinicalMetrics.map((metric, idx) => (
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
              <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                <CardContent className="p-8">
                  <h2 className="text-xl font-light text-white mb-4 flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span>Long-term Follow-up</span>
                  </h2>
                  {/* Render a simple paragraph if followUp is a string.
                    If it's an object (as in CS000001), the detailed
                    timeline is shown later, so we skip the paragraph. */}
                  {typeof caseStudy.followUp === "string" && (
                    <p className="text-gray-300 font-light leading-relaxed">{caseStudy.followUp}</p>
                  )}
                </CardContent>
              </Card>

              {/* Evidence Base & Key Learnings - Only show for CS000001 */}
              {caseStudy.id === "CS000001" && (
                <>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                      <CardContent className="p-8">
                        <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span>Evidence Base</span>
                        </h2>
                        <div className="space-y-3">
                          {caseStudy.evidenceBase?.map((evidence, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-300 font-light text-sm">{evidence}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                      <CardContent className="p-8">
                        <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                          <Brain className="h-5 w-5 text-green-400" />
                          <span>Key Clinical Learnings</span>
                        </h2>
                        <div className="space-y-3">
                          {caseStudy.keyLearnings?.map((learning, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-300 font-light text-sm">{learning}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Complications & Management */}
                  {caseStudy.clinicalOutcomes.complications && (
                    <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                      <CardContent className="p-8">
                        <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                          <Target className="h-5 w-5 text-yellow-400" />
                          <span>Complications & Management</span>
                        </h2>
                        <div className="space-y-3">
                          {caseStudy.clinicalOutcomes.complications.map((complication, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-300 font-light text-sm">{complication}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Detailed Follow-up */}
                  <Card className="mb-12 border-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8">
                      <h2 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span>Comprehensive Follow-up Timeline</span>
                      </h2>
                      {typeof caseStudy.followUp === "object" && caseStudy.followUp !== null ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Short-term (6 weeks)</h3>
                            <p className="text-gray-300 font-light text-sm">{caseStudy.followUp.shortTerm}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Medium-term (3 months)</h3>
                            <p className="text-gray-300 font-light text-sm">{caseStudy.followUp.mediumTerm}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Long-term (12 months)</h3>
                            <p className="text-gray-300 font-light text-sm">{caseStudy.followUp.longTerm}</p>
                          </div>
                          {caseStudy.followUp.additionalNotes && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">Additional Notes</h3>
                              <p className="text-gray-300 font-light text-sm">{caseStudy.followUp.additionalNotes}</p>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
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
