import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clinical Case Studies - Evidence-Based Rehabilitation Outcomes | Physiogen",
  description:
    "Explore evidence-based clinical case studies from Physiogen. Real patient outcomes in ACL reconstruction recovery, pediatric cerebral palsy, sports medicine, and neurological rehabilitation. 98% treatment efficacy.",
  keywords: [
    "clinical case studies",
    "physiotherapy outcomes",
    "ACL reconstruction recovery",
    "pediatric rehabilitation",
    "sports medicine cases",
    "neurological rehabilitation",
    "evidence-based treatment",
    "Lahore physiotherapy",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://physiogen.fit/clinical-case-studies" },
  openGraph: {
    title: "Clinical Case Studies - Evidence-Based Rehabilitation Outcomes | Physiogen",
    description:
      "Explore evidence-based clinical case studies from Physiogen. Real patient outcomes in ACL reconstruction recovery, pediatric cerebral palsy, sports medicine, and neurological rehabilitation.",
    url: "https://physiogen.fit/clinical-case-studies",
    type: "website",
    images: [{ url: "https://physiogen.fit/case-studies-og.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Case Studies - Evidence-Based Rehabilitation Outcomes",
    description: "Explore evidence-based clinical case studies from Physiogen. Real patient outcomes in rehabilitation science.",
    images: ["https://physiogen.fit/case-studies-og.jpg"],
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
