import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE_URL = "https://physiogen.fit"

// Case studies that have dedicated detail pages
const CASE_STUDY_IDS = ["CS000001", "CS000002"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/clinical-case-studies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDY_IDS.map((id) => ({
    url: `${SITE_URL}/clinical-case-studies/${id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...caseStudyRoutes]
}
