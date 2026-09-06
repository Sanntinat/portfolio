import type { MetadataRoute } from "next"

import { projects } from "@/data/projects"
import { SITE_URL } from "@/lib/sections"

/**
 * Índice del pliego para los buscadores. La portada tiene prioridad porque es
 * la lámina completa; las fichas de proyecto van debajo, y el listado en el
 * medio. Sin `lastModified` inventado: el sitio es estático y la fecha
 * honesta es la del build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date()

  return [
    { url: SITE_URL, lastModified: builtAt, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/projects`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: builtAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
