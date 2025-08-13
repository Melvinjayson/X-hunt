import type { MetadataRoute } from "next"
import { mockExperiences } from "@/lib/mock-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://x-hunt.vercel.app"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/host`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  // Dynamic experience pages
  const experiencePages = mockExperiences.map((experience) => ({
    url: `${baseUrl}/experiences/${experience.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...experiencePages]
}
