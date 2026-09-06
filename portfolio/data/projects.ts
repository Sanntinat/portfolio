export const projects = [
  {
    slug: "sistema-eventos",
    title: "Sistema de gestión de citas para dentistas",
    description:
      "Plataforma fullstack para gestión de citas con autenticación, agenda personalizable y CRUD completo.",

    tech: ["Django", "React", "PostgreSQL"],

    image: "/projects/eventos/preview1.png",

    images: [
      "/projects/eventos/1.png",
      "/projects/eventos/2.png",
  ],

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

    github: "https://github.com/",
    demo: "",
  },

  {
    slug: "mapa-estacionamiento-la-plata",
    title: "Mapa Interactivo de Estacionamiento Medido en La Plata",
    description:
      "Proyecto en React Native que muestra un mapa interactivo de La Plata para visualizar calles con estacionamiento medido.",

    tech: ["React Native (Expo)", "React Native Maps", "Expo Location"],

    image: "/projects/eventos/preview3.png",

    images: [
      "/projects/eventos/1.png",
      "/projects/eventos/2.png",
    ],

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

    github: "https://github.com/",
    demo: "",
  },

  {
    slug: "api-reservas",
    title: "GYM E-commerce",
    description:
      "Plataforma de comercio electrónico para un gimnasio, con autenticación JWT, endpoints REST y arquitectura modular.",

    tech: ["Django", "React", "PostgreSQL"],

    image: "/projects/eventos/preview2.png",

    images: [
      "/projects/eventos/1.png",
      "/projects/eventos/2.png",
    ],

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

    github: "https://github.com/",
    demo: "",
  },
]