import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/sections"

/**
 * Un portfolio quiere ser encontrado entero: no hay área privada que ocultar.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
