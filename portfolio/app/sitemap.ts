import type { MetadataRoute } from "next"

import { PROJECT_SLUGS } from "@/data/projects"
import { LANGS } from "@/lib/i18n"
import { SITE_URL } from "@/lib/sections"

/**
 * Índice del pliego para los buscadores, en los dos idiomas y con cada página
 * enlazada a su par. Sin `lastModified` inventado: el sitio es estático y la
 * fecha honesta es la del build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date()
  const paths = ["", "/projects", ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`)]

  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: builtAt,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/projects" ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    }))
  )
}
