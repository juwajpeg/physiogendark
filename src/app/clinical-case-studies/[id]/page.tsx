import CaseStudyDetailClient from "./CaseStudyDetailClient"

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CaseStudyDetailClient id={id} />
}
