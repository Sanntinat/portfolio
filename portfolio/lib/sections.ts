import type { Bi, Dict, Lang } from "@/lib/i18n"

/**
 * Dominio público del sitio. Lo usan el metadataBase, el sitemap y robots.txt.
 * En Vercel sale del dominio de producción del proyecto; NEXT_PUBLIC_SITE_URL
 * lo pisa cuando haya un dominio propio.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export type SectionId = keyof Dict["sections"]

export type SectionRef = {
  /** Referencia de grilla del plano. Es el identificador que usa el riel lateral. */
  ref: string
  id: SectionId
}

export const SECTIONS: SectionRef[] = [
  { ref: "A", id: "inicio" },
  { ref: "B", id: "experiencia" },
  { ref: "C", id: "proyectos" },
  { ref: "D", id: "perfil" },
  { ref: "E", id: "contacto" },
]

export const SECTION_IDS = SECTIONS.map((section) => section.id)

export const CONTACT = {
  email: "santiagonatalichio03@gmail.com",
  location: "Quilmes, Buenos Aires, Argentina",
  locationShort: "Quilmes, AR",
  coords: { es: "34°43′S 58°16′O", en: "34°43′S 58°16′W" } satisfies Bi,
  github: "https://github.com/Sanntinat",
  linkedin: "https://www.linkedin.com/in/santiago-natalichio-bestosini/",
} as const

/** El CV que sale de github.com/Sanntinat/cv, copiado a public/cv. */
export const RESUME: Record<Lang, string> = {
  es: "/cv/Santiago_Natalichio_Bestosini_CV_ES.pdf",
  en: "/cv/Santiago_Natalichio_Bestosini_CV_EN.pdf",
}
