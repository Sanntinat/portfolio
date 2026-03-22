export const projects = [
  {
    slug: "sistema-eventos",
    title: "Sistema de Eventos",
    description:
      "Plataforma fullstack para gestión de eventos con autenticación, favoritos y CRUD completo.",

    tech: ["Django", "React", "PostgreSQL"],

    image: "/projects/eventos/preview.png",

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
    slug: "app-recetas",
    title: "App de Recetas",
    description:
      "Aplicación mobile desarrollada con React Native y Firebase.",

    tech: ["React Native", "Expo", "Firebase"],

    image: "/projects/eventos/preview.png",

    images: [
      "/projects/eventos/1.png",
      "/projects/eventos/2.png",
    ],

    features: [
      "Registro de usuarios",
      "Favoritos de recetas",
      "Listado dinámico",
    ],

    architecture: [
      "Frontend mobile con Expo",
      "Autenticación Firebase",
      "Firestore como base de datos",
    ],

    github: "https://github.com/",
    demo: "",
  },

  {
    slug: "api-reservas",
    title: "API de Reservas",
    description:
      "API REST con autenticación JWT y arquitectura modular.",

    tech: ["Node", "Express", "MongoDB"],

    image: "/projects/eventos/preview.png",

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
      "Node.js + Express",
      "MongoDB",
      "Middleware de autenticación",
    ],

    github: "https://github.com/",
    demo: "",
  },
]