import type { Bi, Lang } from "@/lib/i18n"

/**
 * Experiencia, formación y stack. Mismos hechos que el CV
 * (github.com/Sanntinat/cv, datos/cv.yaml).
 */

const b = (es: string, en: string): Bi => ({ es, en })

const experience = {
  role: b("Practicante de Desarrollo de Software (PPS)", "Software Engineering Intern"),
  org: b("GIDAS, grupo de investigación de la UTN La Plata", "GIDAS research lab, UTN La Plata"),
  from: "2026-08",
  to: "present" as const,
  team: b("3 personas · Scrumban en iteraciones de 2 semanas", "3 people · Scrumban in 2-week iterations"),
  intro: b(
    "HIDRAGIS es el sistema GIS de alerta temprana de inundaciones que desarrolla el GIDAS para La Plata. Trabajo en el módulo cartográfico, el ruteo de evacuación y las vistas del vecino, con todo el código revisado por otro integrante antes de entrar.",
    "HIDRAGIS is the GIS flood early-warning system GIDAS is building for La Plata. I work on the cartography module, evacuation routing and the resident-facing views, and every change is reviewed by a teammate before it merges."
  ),
  highlights: [
    b(
      "Entregué 26 historias de usuario en 15 pull requests revisados, en Python y PostGIS",
      "Delivered 26 user stories across 15 reviewed pull requests, in Python and PostGIS"
    ),
    b(
      "Escribí más de 680 pruebas automatizadas (unitarias, de integración, de sistema y E2E) con pytest y Playwright, ejecutadas en cada PR por GitHub Actions",
      "Wrote 680+ automated tests (unit, integration, system and E2E) with pytest and Playwright, run on every pull request by GitHub Actions"
    ),
    b(
      "Desarrollé el ruteo de evacuación a pie sobre el grafo de calles de OpenStreetMap con pgRouting, excluyendo en tiempo real los tramos con más de 0,3 m de agua",
      "Built flood-aware evacuation routing on the OpenStreetMap street graph with pgRouting, excluding street segments flooded deeper than 0.3 m in real time"
    ),
    b(
      "Procesé modelos de elevación en cuencas y zonas de susceptibilidad hídrica (HAND) con Python, pysheds y rasterio, con corridas reproducibles por hash",
      "Processed elevation models into watersheds and HAND flood-susceptibility zones with Python, pysheds and rasterio, using hash-based reproducible runs"
    ),
    b(
      "Construí la API de cartografía en FastAPI y publiqué las capas como servicios OGC (WMS/WFS) con GeoServer y un portal de datos abiertos versionado",
      "Built the cartography API in FastAPI and published map layers as OGC services (WMS/WFS) with GeoServer and a versioned open-data portal"
    ),
    b(
      "Integré catastro, red pluvial y datos censales en PostGIS para calcular la vulnerabilidad a inundaciones por radio censal",
      "Integrated cadastre, storm-drain network and census data in PostGIS to compute flood vulnerability per census tract"
    ),
    b(
      "Construí la vista del vecino con mapa de riesgo por zona, ruta al refugio, avisos y reportes con foto, en JavaScript y Leaflet",
      "Built the resident-facing app with zone risk map, route to shelter, alerts and photo reports in JavaScript and Leaflet"
    ),
  ],
  tech: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "PostGIS",
    "pgRouting",
    "GeoServer",
    "Leaflet",
    "pytest",
    "Playwright",
    "Docker",
    "GitHub Actions",
  ],
}

const education = [
  {
    title: b("Ingeniería en Sistemas de Información", "Information Systems Engineering"),
    where: b("UTN La Plata · último año", "UTN La Plata · final year"),
  },
  {
    title: b("Analista de Sistemas (título intermedio)", "Systems Analyst (intermediate degree)"),
    where: b("UTN La Plata · 2025", "UTN La Plata · 2025"),
  },
]

const languages = [
  b("Español · nativo", "Spanish · native"),
  b("Inglés · B2, Cambridge First Certificate (2021)", "English · B2, Cambridge First Certificate (2021)"),
]

const skills = [
  { label: b("Lenguajes", "Languages"), value: "Python · TypeScript · JavaScript · Ruby · SQL" },
  { label: b("Backend", "Backend"), value: "Django · Django REST Framework · FastAPI · Ruby on Rails" },
  { label: b("Frontend", "Frontend"), value: "React · Next.js · React Native · MUI · TanStack Query · Leaflet" },
  { label: b("Datos y GIS", "Data and GIS"), value: "PostgreSQL · PostGIS · pgRouting · GeoServer" },
  { label: b("Pruebas y DevOps", "Testing and DevOps"), value: "pytest · Playwright · RSpec · Docker · GitHub Actions · Git" },
  { label: b("Redes", "Networking"), value: "MikroTik RouterOS · BGP · OSPF · VRRP · GNS3" },
]

/** El orden en que construyo una funcionalidad. Es una secuencia real. */
const pipeline = [
  {
    stage: b("Modelo de datos", "Data model"),
    detail: b(
      "Qué entidades existen, cómo se relacionan y qué tiene que ser cierto siempre.",
      "Which entities exist, how they relate and what must always hold."
    ),
    tool: "PostgreSQL · PostGIS",
  },
  {
    stage: b("API", "API"),
    detail: b(
      "Endpoints con permisos por acción y una respuesta previsible para cada caso.",
      "Endpoints with per-action permissions and a predictable response for every case."
    ),
    tool: "FastAPI · Django REST Framework · Rails",
  },
  {
    stage: b("Interfaz", "Interface"),
    detail: b(
      "Pantallas que dejan claro el estado del sistema, también cuando algo falla.",
      "Screens that make the system's state clear, including when something fails."
    ),
    tool: "React · TypeScript",
  },
  {
    stage: b("Pruebas", "Tests"),
    detail: b(
      "Van en el mismo PR que la funcionalidad, y la CI no deja entrar nada en rojo.",
      "They ship in the same pull request as the feature, and CI keeps anything red out."
    ),
    tool: "pytest · RSpec · Playwright",
  },
]

export function getProfile(lang: Lang) {
  return {
    experience: {
      role: experience.role[lang],
      org: experience.org[lang],
      from: experience.from,
      to: experience.to,
      team: experience.team[lang],
      intro: experience.intro[lang],
      highlights: experience.highlights.map((h) => h[lang]),
      tech: experience.tech,
    },
    education: education.map((e) => ({ title: e.title[lang], where: e.where[lang] })),
    languages: languages.map((l) => l[lang]),
    skills: skills.map((s) => ({ label: s.label[lang], value: s.value })),
    pipeline: pipeline.map((p) => ({ stage: p.stage[lang], detail: p.detail[lang], tool: p.tool })),
  }
}
