import CaseStudyDetailClient from "./CaseStudyDetailClient"
import { Metadata } from "next"

// Generate metadata for individual case study pages
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  
  // Get case study data based on ID
  const caseStudyData = getCaseStudyData(id)
  
  if (!caseStudyData) {
    return {
      title: "Case Study Not Found | Physiogen",
      description: "The requested clinical case study could not be found.",
    }
  }

  return {
    title: `${caseStudyData.title} - Clinical Case Study | Physiogen`,
    description: `${caseStudyData.patient.condition} - ${caseStudyData.specialty} case study with ${caseStudyData.successRate}% success rate. Evidence-based rehabilitation outcomes from Physiogen Clinical Sciences.`,
    keywords: [
      caseStudyData.patient.condition.toLowerCase(),
      caseStudyData.specialty.toLowerCase(),
      "clinical case study",
      "physiotherapy outcomes",
      "rehabilitation science",
      "evidence-based treatment",
      "Lahore physiotherapy",
      caseStudyData.treatmentType.toLowerCase(),
      `${caseStudyData.patient.age} year old ${caseStudyData.patient.gender.toLowerCase()}`,
      "Physiogen"
    ],
    openGraph: {
      title: `${caseStudyData.title} - Clinical Case Study`,
      description: `${caseStudyData.patient.condition} - ${caseStudyData.specialty} case study with ${caseStudyData.successRate}% success rate.`,
      url: `https://physiogen.fit/clinical-case-studies/${id}`,
      type: 'article',
      images: [
        {
          url: '/case-study-og.jpg',
          width: 1200,
          height: 630,
          alt: `${caseStudyData.title} - Clinical Case Study`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudyData.title} - Clinical Case Study`,
      description: `${caseStudyData.patient.condition} - ${caseStudyData.specialty} case study with ${caseStudyData.successRate}% success rate.`,
      images: ['/case-study-og.jpg'],
    },
    alternates: {
      canonical: `https://physiogen.fit/clinical-case-studies/${id}`,
    },
  }
}

// Helper function to get case study data
function getCaseStudyData(id: string) {
  const caseStudies = {
    "CS000001": {
      title: "Post-Surgical ACL Reconstruction Recovery",
      patient: {
        condition: "Complete ACL Rupture with Grade 2 Medial Meniscal Tear",
        age: 24,
        gender: "Male"
      },
      specialty: "Sports Medicine & Orthopedic Rehabilitation",
      successRate: 98,
      treatmentType: "Exercise Therapy",
      outcome: "Excellent"
    },
    "CS000002": {
      title: "Pediatric Cerebral Palsy Motor Development",
      patient: {
        condition: "Bilateral lower extremity spasticity with gait dysfunction",
        age: 8,
        gender: "Female"
      },
      specialty: "Pediatric Neurology",
      successRate: 89,
      treatmentType: "Neurodevelopmental Treatment",
      outcome: "Good"
    }
  }
  
  return caseStudies[id as keyof typeof caseStudies]
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CaseStudyDetailClient id={id} />
}
