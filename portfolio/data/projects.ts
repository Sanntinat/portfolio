import type { Bi, Lang } from "@/lib/i18n"

/**
 * Fichas de proyecto. Los hechos y las cifras son los mismos del CV
 * (github.com/Sanntinat/cv, datos/cv.yaml) y salen de repos y PRs: si algo
 * cambia allá, se cambia acá. Nada de lo que está acá es de relleno.
 */

export type Shot = {
  src: string
  /** Tamaño real, para mostrarla entera en la ficha. */
  w: number
  h: number
  alt: Bi
  caption: Bi
  /** Diagramas y capturas con texto chico se muestran enteros, sin recorte. */
  fit?: "cover" | "contain"
}

/** Esquema por capas para los proyectos sin capturas publicadas. */
export type Schematic = { title: Bi; nodes: Bi[] }[]

type ProjectData = {
  slug: string
  title: Bi
  context: Bi
  summary: Bi
  from: string // AAAA-MM
  to: string | "present"
  tech: string[]
  github: string | null
  shots: Shot[]
  schematic?: Schematic
  highlights: Bi[]
  architecture: Bi[]
  results?: { what: Bi; value: Bi }[]
}

export type Project = {
  slug: string
  title: string
  context: string
  summary: string
  from: string
  to: string | "present"
  tech: string[]
  github: string | null
  shots: { src: string; w: number; h: number; alt: string; caption: string; fit: "cover" | "contain" }[]
  schematic?: { title: string; nodes: string[] }[]
  highlights: string[]
  architecture: string[]
  results: { what: string; value: string }[]
}

const b = (es: string, en: string): Bi => ({ es, en })

const data: ProjectData[] = [
  {
    slug: "onestock",
    title: b("OneStock", "OneStock"),
    context: b("Proyecto final de carrera · equipo de 4", "Final-year capstone · team of 4"),
    summary: b(
      "Plataforma multiempresa de stock, pedidos y envíos para tiendas online, sincronizada con Shopify, Tiendanube y Mercado Libre.",
      "Multi-tenant platform for stock, orders and shipping for online stores, synced with Shopify, Tiendanube and Mercado Libre."
    ),
    from: "2026-03",
    to: "present",
    tech: ["Ruby on Rails 8", "PostgreSQL", "React 19", "TypeScript", "MUI", "TanStack Query", "RSpec"],
    github: "https://github.com/proyectoFinalFRLP",
    shots: [
      {
        src: "/projects/onestock/panel.png",
        w: 1520,
        h: 690,
        alt: b(
          "Panel de operación de OneStock con envíos activos, órdenes pendientes, unidades en stock, alertas de inventario y las últimas órdenes y envíos",
          "OneStock operations dashboard with active shipments, pending orders, units in stock, inventory alerts and the latest orders and shipments"
        ),
        caption: b(
          "El panel de operación de la empresa de demo: envíos activos, órdenes pendientes, stock y alertas.",
          "The demo company's operations dashboard: active shipments, pending orders, stock and alerts."
        ),
      },
      {
        src: "/projects/onestock/detalle-orden.png",
        w: 1520,
        h: 690,
        alt: b(
          "Detalle de una orden con sus líneas, el ciclo de vida del envío, la bitácora del operador logístico y los datos del envío",
          "Order detail with its lines, the shipment lifecycle, the courier log and the shipment data"
        ),
        caption: b(
          "Detalle de una orden con el ciclo de vida del envío y la bitácora del operador logístico. Los datos del cliente están desenfocados.",
          "An order's detail with the shipment lifecycle and the courier log. The customer's data is blurred."
        ),
      },
      {
        src: "/projects/onestock/nueva-orden.png",
        w: 1520,
        h: 690,
        alt: b(
          "Primer paso del asistente de pedido manual, con los datos del cliente y la carga de productos",
          "First step of the manual order wizard, with the customer's data and product entry"
        ),
        caption: b(
          "Paso 1 de 3 del asistente de pedido manual: cliente y productos.",
          "Step 1 of 3 of the manual order wizard: customer and products."
        ),
      },
      {
        src: "/projects/onestock/envios.png",
        w: 1520,
        h: 690,
        alt: b(
          "Listado de envíos con pestañas por estado, operador logístico, número de seguimiento, costo y estado",
          "Shipments list with status tabs, courier, tracking number, cost and status"
        ),
        caption: b(
          "Los envíos de la empresa por estado, con el seguimiento y el costo de cada operador.",
          "The company's shipments by status, with each courier's tracking and cost."
        ),
      },
    ],
    schematic: [
      {
        title: b("Canales", "Channels"),
        nodes: [b("Shopify", "Shopify"), b("Tiendanube", "Tiendanube"), b("Mercado Libre", "Mercado Libre")],
      },
      {
        title: b("API · Rails 8", "API · Rails 8"),
        nodes: [
          b("Pedidos y envíos", "Orders and shipments"),
          b("Productos y stock", "Products and stock"),
          b("Webhooks entrantes", "Incoming webhooks"),
        ],
      },
      {
        title: b("Trabajos en segundo plano", "Background jobs"),
        nodes: [
          b("Sincronizar stock", "Sync stock"),
          b("Seguimiento OCA · Andreani", "OCA · Andreani tracking"),
          b("Reintentos de eventos", "Event retries"),
        ],
      },
      {
        title: b("Datos · Web", "Data · Web"),
        nodes: [b("PostgreSQL", "PostgreSQL"), b("React 19 + TypeScript", "React 19 + TypeScript")],
      },
    ],
    highlights: [
      b(
        "Construí el dominio de pedidos y envíos de la plataforma en Ruby on Rails 8 y PostgreSQL: modelos, alta de pedidos para ventas fuera de línea, confirmación de despacho y eventos del envío",
        "Built the platform's orders and shipments domain in Ruby on Rails 8 and PostgreSQL: data models, order creation for offline sales, dispatch confirmation and shipment events"
      ),
      b(
        "Implementé el seguimiento de envíos de correos sin webhooks (OCA, Andreani) con jobs de polling en segundo plano, y la cotización y despacho de pedidos manuales",
        "Implemented shipment tracking for couriers without webhooks (OCA, Andreani) via background polling jobs, plus quoting and dispatch for manual orders"
      ),
      b(
        "Sumé más de 430 ejemplos de RSpec en 12 PRs de la API, con CI en GitHub Actions (RuboCop, Brakeman, bundler-audit), y revisé más de 55 PRs del equipo",
        "Added 430+ RSpec examples across 12 API pull requests with GitHub Actions CI (RuboCop, Brakeman, bundler-audit), and reviewed 55+ team pull requests"
      ),
      b(
        "Desarrollé el asistente de pedido manual en 3 pasos, el detalle y la edición de pedidos en React 19 y TypeScript con MUI, TanStack Query y Zod",
        "Developed the 3-step manual order wizard, order detail and order editing screens in React 19 and TypeScript with MUI, TanStack Query and Zod"
      ),
    ],
    architecture: [
      b(
        "API REST en Rails 8 (modo API): controladores sin lógica de negocio, casos de uso en POROs, serializers y autorización con Pundit",
        "REST API in Rails 8 (API mode): controllers without business logic, use cases in POROs, serializers and authorization with Pundit"
      ),
      b("Autenticación con Devise y JWT", "Authentication with Devise and JWT"),
      b(
        "Solid Queue para los trabajos en segundo plano: sincronizar stock con los canales, procesar webhooks y consultar el seguimiento de los correos",
        "Solid Queue for background work: syncing stock to the channels, processing webhooks and polling courier tracking"
      ),
      b(
        "Frontend en React 19 y TypeScript con MUI, TanStack Query, Zustand y React Hook Form con Zod",
        "Front end in React 19 and TypeScript with MUI, TanStack Query, Zustand and React Hook Form with Zod"
      ),
      b(
        "CI en GitHub Actions en los dos repos: lint, análisis de seguridad, pruebas y build",
        "GitHub Actions CI in both repos: lint, security analysis, tests and build"
      ),
    ],
  },
  {
    slug: "sistema-inmune",
    title: b("Sistema Inmune", "Sistema Inmune"),
    context: b(
      "Gestión Operativa y Seguridad en Redes · equipo de 4",
      "Network Operations and Security course · team of 4"
    ),
    summary: b(
      "Una red empresarial de 7 routers que se recupera sola de las fallas y bloquea un escaneo de puertos a los pocos segundos de empezar.",
      "A 7-router enterprise network that recovers from failures by itself and blocks a port scan within seconds of it starting."
    ),
    from: "2026-09",
    to: "2026-11",
    tech: ["MikroTik RouterOS", "GNS3", "BGP", "OSPF", "VRRP", "Prometheus", "Grafana", "Ansible", "Docker"],
    github: "https://github.com/Sanntinat/goys-tp4-integrador",
    shots: [
      {
        src: "/projects/sistema-inmune/tablero.png",
        w: 1488,
        h: 729,
        alt: b(
          "Tablero de Grafana con el ping a los dos proveedores, la latencia, los segundos sin respuesta y el estado de las sesiones BGP",
          "Grafana dashboard with ping to both providers, latency, seconds without reply and BGP session state"
        ),
        caption: b(
          "El tablero en Grafana durante un corte: el ping a cada proveedor, la latencia y las sesiones BGP del borde.",
          "The Grafana dashboard during an outage: ping to each provider, latency and the edge router's BGP sessions."
        ),
      },
      {
        src: "/projects/sistema-inmune/alerta-intruso.png",
        w: 796,
        h: 540,
        alt: b(
          "Panel de alertas de Grafana con dos alertas IntrusoBloqueado en el router EDGE",
          "Grafana alerts panel with two IntrusoBloqueado alerts on the EDGE router"
        ),
        caption: b(
          "La alerta IntrusoBloqueado se dispara cuando la defensa del borde corta al atacante.",
          "The IntrusoBloqueado alert fires when the edge defense cuts the attacker off."
        ),
      },
      {
        src: "/projects/sistema-inmune/arquitectura.svg",
        w: 800,
        h: 495,
        alt: b(
          "Diagrama de arquitectura por capas: internet, borde, núcleo, distribución y acceso, con la estación de monitoreo y el intruso",
          "Layered architecture diagram: internet, edge, core, distribution and access, with the monitoring station and the intruder"
        ),
        caption: b(
          "Arquitectura: cinco capas, la estación de monitoreo y el intruso conectado del lado de un proveedor.",
          "Architecture: five layers, the monitoring station and the intruder attached on one provider's side."
        ),
        fit: "contain",
      },
      {
        src: "/projects/sistema-inmune/topologia.png",
        w: 762,
        h: 543,
        alt: b(
          "Topología en GNS3 con dos proveedores, el router de borde, dos de núcleo, dos de distribución, switches y la estación",
          "GNS3 topology with two providers, the edge router, two core routers, two distribution routers, switches and the station"
        ),
        caption: b("La topología en GNS3.", "The topology in GNS3."),
        fit: "contain",
      },
    ],
    highlights: [
      b(
        "Bloqueé escaneos de puertos entre 0,08 y 2,72 s después de iniciados con una defensa automática en el router de borde MikroTik, sin cortar BGP ni OSPF",
        "Blocked port scans within 0.08 to 2.72 s of starting with an automated detect-and-block defense on the MikroTik edge router, keeping BGP and OSPF up"
      ),
      b(
        "Lideré el borde de la red base: eBGP contra los dos proveedores, BGP autenticado con MD5 y el firewall",
        "Led the edge of the base network: eBGP to both providers, MD5-authenticated BGP and the firewall"
      ),
      b(
        "Armé el laboratorio en GNS3 y conecté la estación de monitoreo a la red",
        "Set up the GNS3 lab and connected the monitoring station to the network"
      ),
    ],
    architecture: [
      b(
        "Red jerárquica de cinco capas: internet, borde, núcleo, distribución y acceso",
        "Five-layer hierarchical network: internet, edge, core, distribution and access"
      ),
      b(
        "VRRP en distribución, OSPF área 0 con MD5 en el interior y eBGP con TCP-MD5 contra dos proveedores",
        "VRRP at distribution, OSPF area 0 with MD5 inside, and eBGP with TCP-MD5 to two providers"
      ),
      b(
        "Estación de monitoreo con Prometheus, mktxp y blackbox exporter, y tablero y alertas en Grafana",
        "Monitoring station with Prometheus, mktxp and blackbox exporter, plus a Grafana dashboard and alerts"
      ),
      b(
        "Detección y bloqueo en el router de borde, que el equipo despliega y retira con Ansible",
        "Detection and blocking on the edge router, which the team deploys and removes with Ansible"
      ),
    ],
    results: [
      {
        what: b("Escaneo de puertos (nmap, 100 puertos)", "Port scan (nmap, 100 ports)"),
        value: b("Bloqueado entre 0,08 y 2,72 s", "Blocked within 0.08 to 2.72 s"),
      },
      {
        what: b("Corte de un enlace interno", "Internal link cut"),
        value: b("La red vuelve en 1 a 10 s", "The network is back in 1 to 10 s"),
      },
      {
        what: b("Caída de un proveedor", "Provider outage"),
        value: b("Alerta en 2 s", "Alert in 2 s"),
      },
      {
        what: b("Durante el bloqueo", "While blocking"),
        value: b("BGP, OSPF y el monitoreo siguen arriba", "BGP, OSPF and monitoring stay up"),
      },
    ],
  },
  {
    slug: "eventhub",
    title: b("EventHub", "EventHub"),
    context: b(
      "Ingeniería y Calidad de Software · equipo de 6",
      "Software Quality Engineering course · team of 6"
    ),
    summary: b(
      "Aplicación web de venta de entradas, con pruebas unitarias, de integración y de punta a punta en cada push y despliegue continuo.",
      "Ticketing web app with unit, integration and end-to-end tests on every push, and continuous deployment."
    ),
    from: "2025-04",
    to: "2025-07",
    tech: ["Python", "Django", "Playwright", "GitHub Actions", "Render"],
    github: "https://github.com/maxi-lab/eventhub",
    shots: [
      {
        src: "/projects/eventhub/eventos.png",
        w: 1480,
        h: 520,
        alt: b(
          "Listado de eventos con título, descripción, fecha, estado, categoría, acciones y la estrella de favorito",
          "Event list with title, description, date, status, category, actions and the favorite star"
        ),
        caption: b(
          "El listado de eventos, con la estrella para marcar favoritos. Los eventos son datos de demo.",
          "The event list, with the star to mark favorites. The events are demo data."
        ),
      },
      {
        src: "/projects/eventhub/favoritos.png",
        w: 1480,
        h: 330,
        alt: b(
          "Listado filtrado que muestra sólo los dos eventos marcados como favoritos",
          "Filtered list showing only the two events marked as favorites"
        ),
        caption: b(
          "El filtro de favoritos, una de las partes que construí.",
          "The favorites filter, one of the parts I built."
        ),
      },
      {
        src: "/projects/eventhub/detalle.png",
        w: 1480,
        h: 720,
        alt: b(
          "Detalle de un evento con fecha, organizador, ubicación, categoría, estado y entradas vendidas",
          "Event detail with date, organizer, venue, category, status and tickets sold"
        ),
        caption: b(
          "El detalle de un evento, con las entradas vendidas.",
          "An event's detail, with the tickets sold."
        ),
      },
    ],
    schematic: [
      { title: b("Push", "Push"), nodes: [b("Rama en GitHub", "GitHub branch")] },
      {
        title: b("CI · GitHub Actions", "CI · GitHub Actions"),
        nodes: [
          b("Lint con Ruff", "Ruff lint"),
          b("Unitarias e integración", "Unit and integration"),
          b("E2E con Playwright", "Playwright E2E"),
        ],
      },
      { title: b("CD", "CD"), nodes: [b("Merge a main", "Merge to main"), b("Deploy a Render", "Deploy to Render")] },
    ],
    highlights: [
      b(
        "Automaticé el despliegue continuo a Render en GitHub Actions, condicionado a que pase la integración continua (lint, unitarias, integración y E2E)",
        "Automated continuous deployment to Render with GitHub Actions, gated on the CI pipeline (lint, unit, integration and E2E tests)"
      ),
      b(
        "Construí las solicitudes de reembolso con flujo de aprobación del organizador y los eventos favoritos en Django, con pruebas unitarias, de integración y E2E en Playwright",
        "Built ticket refund requests with an organizer approval workflow and event favorites in Django, covered by unit, integration and Playwright E2E tests"
      ),
    ],
    architecture: [
      b("Django con plantillas del servidor", "Django with server-rendered templates"),
      b(
        "CI en GitHub Actions: lint con Ruff, pruebas unitarias, de integración y E2E con Playwright",
        "GitHub Actions CI: Ruff lint, unit, integration and Playwright E2E tests"
      ),
      b(
        "CD a Render, que corre sólo después de que la CI pasa en main",
        "CD to Render, which runs only after CI passes on main"
      ),
    ],
  },
  {
    slug: "cecq",
    title: b("Turnos Odontológicos CECQ", "CECQ Dental Scheduling"),
    context: b("Seminario UTN con cliente real · equipo de 5", "University seminar with a real client · team of 5"),
    summary: b(
      "Sistema web de turnos y pacientes para un centro odontológico de Quilmes.",
      "Web appointment and patient system for a dental clinic in Quilmes."
    ),
    from: "2024-08",
    to: "2025-10",
    tech: ["Django REST Framework", "React", "PostgreSQL", "Material UI", "OAuth"],
    github: null,
    shots: [
      {
        src: "/projects/cecq/turnos.png",
        w: 1897,
        h: 966,
        alt: b(
          "Listado de turnos con filtros por fecha, paciente, agenda, odontólogo, centro y estado",
          "Appointment list with filters by date, patient, schedule, dentist, clinic and status"
        ),
        caption: b(
          "El listado de turnos, con filtros por agenda, odontólogo, centro y estado.",
          "The appointment list, filtered by schedule, dentist, clinic and status."
        ),
      },
    ],
    highlights: [
      b(
        "Desarrollé un sistema web de turnos y pacientes para un centro odontológico de Quilmes con Django REST Framework, React y PostgreSQL",
        "Developed a web appointment and patient management system for a dental clinic in Quilmes using Django REST Framework, React and PostgreSQL"
      ),
      b(
        "Implementé la autenticación de punta a punta, con login con Google (OAuth) en React y Django, cambio de contraseña y rutas protegidas por rol",
        "Implemented end-to-end authentication, including Google sign-in (OAuth) across React and Django, password change and role-based protected routes"
      ),
    ],
    architecture: [
      b("API REST con Django REST Framework y PostgreSQL", "REST API with Django REST Framework and PostgreSQL"),
      b("Frontend en React con Material UI", "Front end in React with Material UI"),
      b(
        "Login con usuario o con Google, y acciones de administración ocultas según el rol",
        "Sign-in with a password or with Google, and admin actions hidden by role"
      ),
    ],
  },
  {
    slug: "estacionamiento",
    title: b("Mapa de Estacionamiento Medido", "Metered Parking Map"),
    context: b("Desarrollo de Aplicaciones Móviles · equipo de 4", "Mobile Development course · team of 4"),
    summary: b(
      "App móvil con un mapa de La Plata que muestra qué calles tienen estacionamiento medido.",
      "Mobile app with a map of La Plata showing which streets have metered parking."
    ),
    from: "2025-07",
    to: "2025-08",
    tech: ["React Native", "Expo", "TypeScript", "React Native Maps", "Expo Location"],
    github: "https://github.com/BaltaMolteni/DAM-TPFINAL",
    shots: [],
    schematic: [
      { title: b("App · Expo", "App · Expo"), nodes: [b("React Native + TypeScript", "React Native + TypeScript")] },
      {
        title: b("Mapa", "Map"),
        nodes: [b("Calles con estacionamiento medido", "Metered-parking streets"), b("Límite de la zona", "Zone boundary")],
      },
      { title: b("Dispositivo", "Device"), nodes: [b("Ubicación del auto", "Car location"), b("Expo Location", "Expo Location")] },
    ],
    highlights: [
      b(
        "Desarrollé la ubicación del auto en el mapa y el límite de la zona de estacionamiento medido",
        "Built the car's location on the map and the boundary of the metered-parking zone"
      ),
    ],
    architecture: [
      b("React Native con Expo y TypeScript", "React Native with Expo and TypeScript"),
      b("Mapa con React Native Maps", "Map with React Native Maps"),
      b("Geolocalización con Expo Location", "Geolocation with Expo Location"),
    ],
  },
]

export function getProjects(lang: Lang): Project[] {
  return data.map((p) => ({
    slug: p.slug,
    title: p.title[lang],
    context: p.context[lang],
    summary: p.summary[lang],
    from: p.from,
    to: p.to,
    tech: p.tech,
    github: p.github,
    shots: p.shots.map((s) => ({
      src: s.src,
      w: s.w,
      h: s.h,
      alt: s.alt[lang],
      caption: s.caption[lang],
      fit: s.fit ?? "cover",
    })),
    schematic: p.schematic?.map((layer) => ({
      title: layer.title[lang],
      nodes: layer.nodes.map((n) => n[lang]),
    })),
    highlights: p.highlights.map((h) => h[lang]),
    architecture: p.architecture.map((a) => a[lang]),
    results: (p.results ?? []).map((r) => ({ what: r.what[lang], value: r.value[lang] })),
  }))
}

export const PROJECT_SLUGS = data.map((p) => p.slug)

/** "mar. 2026 – actualidad" / "Mar 2026 – present". */
export function formatPeriod(from: string, to: string, lang: Lang, present: string) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number)
    return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString(lang === "es" ? "es-AR" : "en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
  }
  return `${fmt(from)} – ${to === "present" ? present : fmt(to)}`
}
