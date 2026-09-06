export type SectionRef = {
  /** Referencia de grilla del plano. Es el identificador que usa el riel lateral. */
  ref: string
  id: string
  label: string
}

export const SECTIONS: SectionRef[] = [
  { ref: "A", id: "inicio", label: "Inicio" },
  { ref: "B", id: "perfil", label: "Perfil" },
  { ref: "C", id: "proyectos", label: "Proyectos" },
  { ref: "D", id: "contacto", label: "Contacto" },
]

export const SECTION_IDS = SECTIONS.map((section) => section.id)

export const CONTACT = {
  email: "santiagonatalichio03@gmail.com",
  location: "La Plata, Buenos Aires, Argentina",
  coords: "34°55′S 57°57′O",

  /**
   * Perfiles reales. Están en null a propósito: los valores anteriores eran
   * los placeholders `github.com/tu-usuario` y `linkedin.com/in/tu-usuario`, y
   * un enlace muerto en un portfolio cuesta más que un enlace ausente.
   * Mientras sean null no se renderiza el botón correspondiente.
   * TODO(santiago): poner las URLs reales.
   */
  github: null as string | null,
  linkedin: null as string | null,
} as const

/**
 * Ruta del CV dentro de /public. Mientras sea null, la acción de CV no se
 * muestra en ninguna parte del sitio en lugar de apuntar a un enlace muerto.
 * TODO(santiago): dejar el PDF en public/ y poner acá su ruta.
 */
export const RESUME_URL: string | null = null
