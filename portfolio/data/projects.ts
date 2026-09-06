/**
 * Fichas de proyecto. El contenido de cada una está pendiente de completar por
 * Santiago: los textos, las capturas adicionales y sobre todo `github` y
 * `demo`, que hoy no apuntan a nada real.
 */
export type Project = {
  slug: string
  title: string
  description: string
  tech: string[]
  image: string
  images: string[]
  features: string[]
  architecture: string[]
  /** URL del repositorio, o null mientras no haya una real. */
  github: string | null
  /** URL de la demo desplegada, o null si el proyecto no está publicado. */
  demo: string | null
}

export const projects: Project[] = [
  {
    slug: "sistema-eventos",
    title: "Sistema de gestión de citas para dentistas",
    description:
      "Plataforma fullstack para gestión de citas con autenticación, agenda personalizable y CRUD completo.",

    tech: ["Django", "React", "PostgreSQL"],

    image: "/projects/eventos/preview1.png",

    // Las capturas 1.png y 2.png no existen en /public; la galería queda
    // vacía hasta que Santiago suba las reales.
    images: [],

    features: [
      "Autenticación de usuarios",
      "Sistema de favoritos",
      "CRUD completo de eventos",
      "Permisos y roles",
    ],

    architecture: [
      "Frontend en React",
      "Backend REST con Django",
      "Base de datos PostgreSQL",
      "Autenticación basada en sesión",
    ],

    github: null,
    demo: null,
  },

  {
    slug: "mapa-estacionamiento-la-plata",
    title: "Mapa Interactivo de Estacionamiento Medido en La Plata",
    description:
      "Proyecto en React Native que muestra un mapa interactivo de La Plata para visualizar calles con estacionamiento medido.",

    tech: ["React Native (Expo)", "React Native Maps", "Expo Location"],

    image: "/projects/eventos/preview3.png",

    // Las capturas 1.png y 2.png no existen en /public; la galería queda
    // vacía hasta que Santiago suba las reales.
    images: [],

    features: [
      "Visualización en mapa de calles con estacionamiento medido",
      "Interacción directa con el mapa para explorar zonas",
      "Ubicación del usuario en tiempo real",
    ],

    architecture: [
      "Aplicación mobile con React Native y Expo",
      "Renderizado cartográfico con React Native Maps",
      "Geolocalización con Expo Location",
    ],

    github: null,
    demo: null,
  },

  {
    slug: "api-reservas",
    title: "GYM E-commerce",
    description:
      "Plataforma de comercio electrónico para un gimnasio, con autenticación JWT, endpoints REST y arquitectura modular.",

    tech: ["Django", "React", "PostgreSQL"],

    image: "/projects/eventos/preview2.png",

    // Las capturas 1.png y 2.png no existen en /public; la galería queda
    // vacía hasta que Santiago suba las reales.
    images: [],

    features: [
      "Autenticación JWT",
      "Endpoints REST",
      "Arquitectura modular",
    ],

    architecture: [
      "React",
      "Material UI",
      "Django REST Framework",
      "PostgreSQL",
      "Postman"
    ],

    github: null,
    demo: null,
  },
]