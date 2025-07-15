import CaseStudyDetailClient from "./CaseStudyDetailClient"

export default function CaseStudyDetailPage({ params }: { params: { id: string } }) {
  return <CaseStudyDetailClient id={params.id} />
}
