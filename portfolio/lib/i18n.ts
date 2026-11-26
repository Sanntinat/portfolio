/**
 * Idiomas del sitio. Cada ruta vive bajo /es o /en; la raíz la resuelve
 * proxy.ts según el navegador. Los textos de la interfaz están acá; el
 * contenido (experiencia, proyectos, perfil) está en data/.
 */

export const LANGS = ["es", "en"] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = "es"

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value)
}

/** Texto en los dos idiomas. */
export type Bi<T = string> = { es: T; en: T }

export function pick<T>(value: Bi<T>, lang: Lang): T {
  return value[lang]
}

const es = {
  locale: "es-AR",
  ogLocale: "es_AR",
  otherLang: "English",
  otherLangShort: "EN",
  switchLang: "Read in English",
  skip: "Saltar al contenido",
  meta: {
    title: "Santiago Natalichio — Desarrollador de software",
    description:
      "Desarrollador de software y estudiante de último año de Ingeniería en Sistemas (UTN La Plata). Backends en Python y Ruby, interfaces en React, y las pruebas junto con cada funcionalidad.",
    ogAlt:
      "Santiago Natalichio, desarrollador de software y estudiante de Ingeniería en Sistemas en la UTN La Plata",
  },
  sections: {
    inicio: "Inicio",
    experiencia: "Experiencia",
    proyectos: "Proyectos",
    perfil: "Perfil",
    contacto: "Contacto",
  },
  nav: {
    console: "Consola",
    openConsole: "Abrir consola",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    sectionsLabel: "Secciones",
    resume: "CV",
    downloadResume: "Descargar CV",
    railLabel: "Referencias del pliego",
    railProgress: "Posición en el pliego",
  },
  theme: {
    toLight: "Usar tema claro",
    toDark: "Usar tema oscuro",
    toggle: "Cambiar tema",
  },
  hero: {
    lead: "Desarrollador de software y estudiante de último año de Ingeniería en Sistemas de Información en la UTN La Plata.",
    body: "Hoy trabajo en HIDRAGIS, un sistema de alerta temprana de inundaciones del grupo de investigación GIDAS. Programo backends en Python y Ruby, interfaces en React, y escribo las pruebas junto con cada funcionalidad.",
    seeProjects: "Ver proyectos",
    downloadResume: "Descargar CV",
    writeMe: "Escribirme",
    consoleHint: "Abrir la consola para navegar el sitio",
    plateLabel:
      "Plano de la traza fundacional de La Plata: un cuadrado con retícula ortogonal, dos diagonales cruzadas, un rombo de avenidas y nueve plazas.",
    plateSide: "5 196 m de lado",
    plateTouchHint: "tocá el plano",
    plateCaption:
      "La Plata se dibujó entera sobre un tablero en 1882: cuadrícula, diagonales y una plaza cada seis cuadras. Es donde estudio, y la ciudad cuyas calles recorre el ruteo de evacuación de HIDRAGIS.",
  },
  experience: {
    title: "Practicante en GIDAS, sobre un sistema de alerta de inundaciones.",
    stack: "Stack",
    period: "Período",
    team: "Equipo",
    code: "Código",
    privateRepo: "Repositorio privado del GIDAS",
    whatIDid: "Qué hice",
    figureCaption:
      "Esquema del ruteo de evacuación: la ruta a pie rodea los tramos con más de 0,30 m de agua.",
    figureLegendRoute: "ruta de evacuación",
    figureLegendExcluded: "excluido · calado > 0,30 m",
    figureResident: "VECINO",
    figureShelter: "REFUGIO",
    figureLabel: "Fig.",
    figureName: "Ruteo con agua",
    figureAria:
      "Dibujo de una traza de calles en damero con diagonales. Una zona anegada rayada corta el camino corto, marcado como excluido; la ruta de evacuación, en rojo, va del vecino al refugio rodeando el agua.",
  },
  projects: {
    title: "Cinco proyectos, del modelo de datos al despliegue.",
    lead: "En cada ficha está qué hice yo, con qué stack y qué quedó medido.",
    count: (n: number) => `${n} proyectos`,
    seeProject: "Ver el proyecto",
    allTitle: "Proyectos",
    allLead: "Todo lo que construí hasta ahora, con su contexto, su stack y dónde está el código.",
    allMetaDescription:
      "Proyectos de Santiago Natalichio: OneStock, Sistema Inmune, EventHub, turnos odontológicos para el CECQ y un mapa de estacionamiento medido.",
    hasCode: "Con código",
    privateCode: "Código privado",
    back: "Volver al índice",
    whatIDid: "Qué hice",
    architecture: "Arquitectura",
    results: "Resultados medidos",
    gallery: "Capturas",
    sheet: "Ficha",
    period: "Período",
    context: "Contexto",
    stack: "Stack",
    code: "Código",
    seeRepo: "Ver repositorio",
    notPublished: "Privado",
    seeCode: "Ver el código",
    next: "Siguiente proyecto",
    otherProjects: "Otros proyectos",
    schematic: "Esquema",
    schematicNote: "Sin capturas publicadas todavía: el esquema muestra cómo está armado.",
    present: "actualidad",
  },
  profile: {
    title: "Empiezo por el modelo de datos, no por la pantalla.",
    lead: "Arranco preguntando qué entidades existen y cómo se relacionan. Después escribo la API, la interfaz y las pruebas de cada parte. Es más lento al principio y evita reescribir todo a mitad de camino.",
    references: "Referencias",
    education: "Formación",
    languages: "Idiomas",
    skills: "Stack",
  },
  contact: {
    title: "Si estás buscando a alguien, escribime.",
    lead: "Busco mi primer puesto como desarrollador, full time o pasantía. Respondo todos los mensajes.",
    email: "Email",
    copyEmail: "Copiar la dirección de email",
    copied: "Dirección copiada.",
    location: "Ubicación",
    coords: "Coordenadas",
    resume: "CV",
    resumeEs: "Español",
    resumeEn: "English",
    message: "Mensaje",
    name: "Nombre",
    namePlaceholder: "Cómo te llamás",
    emailPlaceholder: "A dónde te respondo",
    messageField: "Mensaje",
    messagePlaceholder: "Qué necesitás y para cuándo",
    submit: "Abrir el mensaje en tu correo",
    sent: "Se abrió tu programa de correo con el mensaje listo. Todavía tenés que enviarlo desde ahí.",
    idle: "El formulario prepara el mensaje en tu propio correo: nada se envía desde este sitio.",
    subject: (name: string) => `Contacto desde el portfolio — ${name}`,
    errors: {
      name: "Falta tu nombre.",
      email: "Falta tu email para poder responderte.",
      emailFormat: "Ese email no tiene un formato válido. Revisá la arroba y el dominio.",
      message: "Contame un poco más: al menos diez caracteres.",
    },
  },
  footer: {
    author: "Autor",
    location: "Ubicación",
    contact: "Contacto",
    contents: "Contenido",
    built: "Construido con Next.js y Tailwind",
    madeIn: "Hecho en Quilmes",
  },
  console: {
    title: "consola",
    close: "Cerrar la consola",
    dialog: "Consola: terminal para recorrer el sitio",
    inputLabel: "Comando",
    placeholder: "escribí un comando",
    user: "visitante",
    tryThis: "probá",
    intro: [
      "santiago natalichio · portfolio",
      "Escribí help para ver los comandos. Tab completa, ↑ ↓ recorre el historial, Esc cierra.",
    ],
    introTouch: "Tocá un comando de abajo o escribí help.",
    help: {
      title: "Comandos:",
      whoami: "quién soy",
      ls: "qué hay en el sitio",
      cd: "ir a una sección",
      cat: "leer un proyecto acá mismo",
      open: "abrir un proyecto o un enlace",
      stack: "con qué trabajo",
      email: "copiar mi mail",
      theme: "plano claro o cianotipo",
      lang: "ver el sitio en inglés",
      history: "lo que escribiste",
      clear: "limpiar la pantalla (también Ctrl+L)",
      exit: "cerrar la consola",
    },
    args: { section: "<sección>", project: "<proyecto>", target: "<proyecto|github|linkedin|cv>" },
    out: {
      notFound: (cmd: string) => `${cmd}: comando no encontrado. Probá help.`,
      noProject: (cmd: string, arg: string) => `${cmd}: ${arg}: no existe. Probá ls proyectos.`,
      noSection: (arg: string) => `cd: ${arg}: no existe. Probá ls.`,
      usage: (usage: string) => `uso: ${usage}`,
      going: (path: string) => `→ ${path}`,
      copied: (email: string) => `Copiado al portapapeles: ${email}`,
      copyFailed: (email: string) => `No se pudo copiar. Escribime a ${email}`,
      theme: (dark: boolean): string => (dark ? "Tema: cianotipo." : "Tema: plano claro."),
      lang: "Switching to English…",
      opened: (what: string) => `${what}: abierto en otra pestaña.`,
      historyEmpty: "(todavía no escribiste nada)",
      lsProjects: "proyectos/",
      hireMe: [
        "[sudo] verificando credenciales de reclutador… ok",
        "Abriendo un mail para Santiago. Respondo todos.",
      ],
      hireSubject: "Quiero contratarte",
      bye: "Hasta luego.",
    },
  },
}

export type Dict = typeof es

const en: Dict = {
  locale: "en-US",
  ogLocale: "en_US",
  otherLang: "Español",
  otherLangShort: "ES",
  switchLang: "Leer en español",
  skip: "Skip to content",
  meta: {
    title: "Santiago Natalichio — Software developer",
    description:
      "Software developer in his final year of Information Systems Engineering (UTN La Plata, Argentina). Backends in Python and Ruby, React front ends, and tests written alongside each feature.",
    ogAlt:
      "Santiago Natalichio, software developer and Information Systems Engineering student at UTN La Plata",
  },
  sections: {
    inicio: "Home",
    experiencia: "Experience",
    proyectos: "Projects",
    perfil: "Profile",
    contacto: "Contact",
  },
  nav: {
    console: "Console",
    openConsole: "Open console",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    sectionsLabel: "Sections",
    resume: "CV",
    downloadResume: "Download CV",
    railLabel: "Sheet references",
    railProgress: "Position on the sheet",
  },
  theme: {
    toLight: "Use light theme",
    toDark: "Use dark theme",
    toggle: "Change theme",
  },
  hero: {
    lead: "Software developer in my final year of Information Systems Engineering at UTN La Plata, Argentina.",
    body: "I work on HIDRAGIS, a flood early-warning system at the GIDAS research lab. I write backends in Python and Ruby and front ends in React, and I write the tests alongside each feature.",
    seeProjects: "See projects",
    downloadResume: "Download CV",
    writeMe: "Email me",
    consoleHint: "Open the console to move around the site",
    plateLabel:
      "Plan of La Plata's founding layout: a square with an orthogonal grid, two crossing diagonals, a diamond of avenues and nine squares.",
    plateSide: "5,196 m per side",
    plateTouchHint: "tap the plan",
    plateCaption:
      "La Plata was drawn whole on a drafting table in 1882: a grid, diagonals and a square every six blocks. It's where I study, and the city whose streets HIDRAGIS routes evacuations through.",
  },
  experience: {
    title: "Intern at GIDAS, working on a flood early-warning system.",
    stack: "Stack",
    period: "Period",
    team: "Team",
    code: "Code",
    privateRepo: "Private GIDAS repository",
    whatIDid: "What I did",
    figureCaption:
      "Evacuation routing, sketched: the walking route goes around street segments under more than 0.30 m of water.",
    figureLegendRoute: "evacuation route",
    figureLegendExcluded: "excluded · depth > 0.30 m",
    figureResident: "RESIDENT",
    figureShelter: "SHELTER",
    figureLabel: "Fig.",
    figureName: "Flood-aware routing",
    figureAria:
      "Drawing of a grid street layout with diagonals. A hatched flooded area cuts the short path, marked as excluded; the evacuation route, in red, goes from the resident to the shelter around the water.",
  },
  projects: {
    title: "Five projects, from the data model to deployment.",
    lead: "Each page says what I did, with which stack, and what was measured.",
    count: (n: number) => `${n} projects`,
    seeProject: "See the project",
    allTitle: "Projects",
    allLead: "Everything I've built so far, with its context, its stack and where the code lives.",
    allMetaDescription:
      "Projects by Santiago Natalichio: OneStock, Sistema Inmune, EventHub, a dental scheduling system for CECQ and a metered parking map.",
    hasCode: "Code available",
    privateCode: "Private code",
    back: "Back to the index",
    whatIDid: "What I did",
    architecture: "Architecture",
    results: "Measured results",
    gallery: "Screenshots",
    sheet: "Details",
    period: "Period",
    context: "Context",
    stack: "Stack",
    code: "Code",
    seeRepo: "See repository",
    notPublished: "Private",
    seeCode: "See the code",
    next: "Next project",
    otherProjects: "Other projects",
    schematic: "Schematic",
    schematicNote: "No screenshots published yet: the schematic shows how it's put together.",
    present: "present",
  },
  profile: {
    title: "I start from the data model, not the screen.",
    lead: "I begin by asking which entities exist and how they relate. Then I write the API, the interface and the tests for each part. It's slower at first and saves rewriting everything halfway through.",
    references: "References",
    education: "Education",
    languages: "Languages",
    skills: "Stack",
  },
  contact: {
    title: "If you're looking for someone, write to me.",
    lead: "I'm looking for my first developer role, full time or internship. I answer every message.",
    email: "Email",
    copyEmail: "Copy the email address",
    copied: "Address copied.",
    location: "Location",
    coords: "Coordinates",
    resume: "CV",
    resumeEs: "Español",
    resumeEn: "English",
    message: "Message",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "Where I should reply",
    messageField: "Message",
    messagePlaceholder: "What you need and by when",
    submit: "Open the message in your email",
    sent: "Your email app opened with the message ready. You still need to send it from there.",
    idle: "The form drafts the message in your own email app: nothing is sent from this site.",
    subject: (name: string) => `Contact from the portfolio — ${name}`,
    errors: {
      name: "Your name is missing.",
      email: "Your email is missing, so I can't reply.",
      emailFormat: "That email doesn't look valid. Check the @ and the domain.",
      message: "Tell me a bit more: at least ten characters.",
    },
  },
  footer: {
    author: "Author",
    location: "Location",
    contact: "Contact",
    contents: "Contents",
    built: "Built with Next.js and Tailwind",
    madeIn: "Made in Quilmes, Argentina",
  },
  console: {
    title: "console",
    close: "Close the console",
    dialog: "Console: a terminal to move around the site",
    inputLabel: "Command",
    placeholder: "type a command",
    user: "visitor",
    tryThis: "try",
    intro: [
      "santiago natalichio · portfolio",
      "Type help to see the commands. Tab completes, ↑ ↓ walks the history, Esc closes.",
    ],
    introTouch: "Tap a command below or type help.",
    help: {
      title: "Commands:",
      whoami: "who I am",
      ls: "what's on the site",
      cd: "go to a section",
      cat: "read a project right here",
      open: "open a project or a link",
      stack: "what I work with",
      email: "copy my email",
      theme: "blueprint or cyanotype",
      lang: "see the site in Spanish",
      history: "what you typed",
      clear: "clear the screen (also Ctrl+L)",
      exit: "close the console",
    },
    args: { section: "<section>", project: "<project>", target: "<project|github|linkedin|cv>" },
    out: {
      notFound: (cmd: string) => `${cmd}: command not found. Try help.`,
      noProject: (cmd: string, arg: string) => `${cmd}: ${arg}: no such project. Try ls projects.`,
      noSection: (arg: string) => `cd: ${arg}: no such section. Try ls.`,
      usage: (usage: string) => `usage: ${usage}`,
      going: (path: string) => `→ ${path}`,
      copied: (email: string) => `Copied to the clipboard: ${email}`,
      copyFailed: (email: string) => `Couldn't copy. Write to ${email}`,
      theme: (dark: boolean) => (dark ? "Theme: cyanotype." : "Theme: blueprint."),
      lang: "Cambiando a español…",
      opened: (what: string) => `${what}: opened in another tab.`,
      historyEmpty: "(nothing typed yet)",
      lsProjects: "projects/",
      hireMe: [
        "[sudo] checking recruiter credentials… ok",
        "Opening an email to Santiago. I answer every one.",
      ],
      hireSubject: "I'd like to hire you",
      bye: "See you.",
    },
  },
}

export const DICTS: Record<Lang, Dict> = { es, en }

export function getDict(lang: Lang): Dict {
  return DICTS[lang]
}

/** Ruta equivalente en el otro idioma: /es/projects/x ↔ /en/projects/x. */
export function swapLangPath(pathname: string, to: Lang): string {
  const parts = pathname.split("/")
  if (parts.length > 1 && isLang(parts[1])) {
    parts[1] = to
    return parts.join("/") || `/${to}`
  }
  return `/${to}${pathname === "/" ? "" : pathname}`
}
