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
import { CaseStudy } from "./case-study-types"

// Comprehensive detailed case studies data
const detailedCaseStudies: { [key: string]: CaseStudy } = {
  // ... copy the entire detailedCaseStudies object from page.tsx ...
}

export default function CaseStudyDetailClient({ id }: { id: string }) {
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
    const study = detailedCaseStudies[id]
    if (study) {
      setCaseStudy(study)
    } else {
      // Generate mock data for other IDs
      setCaseStudy({
        id,
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
  }, [id])

  if (!caseStudy) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  }

  const IconComponent = caseStudy.icon

  // ... copy the entire JSX return from page.tsx ...
  // (from <div className="min-h-screen ..."> to the end)
} 