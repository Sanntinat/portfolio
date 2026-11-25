"use client"

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { X } from "lucide-react"

import { useI18n } from "@/components/i18n-provider"
import { getProjects } from "@/data/projects"
import { getProfile } from "@/data/profile"
import { CONSOLE_EVENT } from "@/lib/console-bus"
import { swapLangPath, type Dict, type Lang } from "@/lib/i18n"
import { CONTACT, RESUME, SECTIONS, type SectionId } from "@/lib/sections"

/**
 * La consola es una terminal: se escribe un comando, se aprieta Enter y la
 * respuesta se tipea sola, renglón por renglón. Historial con ↑ ↓, Tab
 * completa comando y argumento, Ctrl+L limpia. Se abre con / o Ctrl+K desde
 * cualquier parte del sitio.
 */

type Tone = "cmd" | "out" | "strong" | "err" | "dim"
type Line = { text: string; tone: Tone }

const SECTION_ALIASES: Record<string, SectionId> = {
  inicio: "inicio",
  home: "inicio",
  "~": "inicio",
  "..": "inicio",
  "/": "inicio",
  experiencia: "experiencia",
  experience: "experiencia",
  proyectos: "proyectos",
  projects: "proyectos",
  perfil: "perfil",
  profile: "perfil",
  contacto: "contacto",
  contact: "contacto",
}

const CMD_ALIASES: Record<string, string> = {
  ayuda: "help",
  "?": "help",
  quien: "whoami",
  "quién": "whoami",
  dir: "ls",
  leer: "cat",
  abrir: "open",
  mail: "email",
  tema: "theme",
  idioma: "lang",
  english: "lang",
  "español": "lang",
  espanol: "lang",
  historial: "history",
  limpiar: "clear",
  cls: "clear",
  salir: "exit",
  quit: "exit",
}

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cd",
  "cat",
  "open",
  "stack",
  "email",
  "cv",
  "theme",
  "lang",
  "history",
  "clear",
  "exit",
  "sudo hire-me",
]

/**
 * Todo lo que muestra la terminal vive en un único registro ordenado. La
 * máquina de escribir no mueve líneas de un lado a otro: sólo avanza un
 * puntero (`shown` líneas completas y `typed` caracteres de la siguiente).
 */
type Screen = { log: Line[]; shown: number; typed: number }
type ScreenAction =
  | { type: "append"; lines: Line[]; instant?: boolean }
  | { type: "tick" }
  | { type: "flush" }
  | { type: "clear" }

function screenReducer(state: Screen, action: ScreenAction): Screen {
  switch (action.type) {
    case "append": {
      const log = [...state.log, ...action.lines]
      return action.instant ? { log, shown: log.length, typed: 0 } : { ...state, log }
    }
    case "tick": {
      const line = state.log[state.shown]
      if (!line) return state
      const step = Math.max(1, Math.ceil(line.text.length / 40))
      // El eco de lo que escribió la persona aparece entero, como en una terminal.
      if (line.tone === "cmd" || state.typed + step >= line.text.length) {
        return { ...state, shown: state.shown + 1, typed: 0 }
      }
      return { ...state, typed: state.typed + step }
    }
    case "flush":
      return { ...state, shown: state.log.length, typed: 0 }
    case "clear":
      return { log: [], shown: 0, typed: 0 }
  }
}

const pad = (text: string, width: number) => text + " ".repeat(Math.max(1, width - text.length))

function sectionNames(t: Dict) {
  return SECTIONS.filter((s) => s.id !== "inicio").map((s) => t.sections[s.id].toLowerCase())
}

/** Sugerencia para Tab: completa el comando o, si ya está, su argumento. */
function suggest(input: string, lang: Lang, t: Dict): string | null {
  const raw = input.replace(/^\s+/, "")
  if (!raw) return null
  const lower = raw.toLowerCase()

  if (!lower.includes(" ")) {
    const hit = COMMANDS.find((c) => c.startsWith(lower) && c !== lower)
    return hit ?? null
  }

  const [cmd, ...rest] = lower.split(/\s+/)
  const arg = rest.join(" ")
  const name = CMD_ALIASES[cmd] ?? cmd
  let pool: string[] = []
  if (name === "cd") pool = sectionNames(t)
  if (name === "cat") pool = getProjects(lang).map((p) => p.slug)
  if (name === "open") pool = [...getProjects(lang).map((p) => p.slug), "github", "linkedin", "cv"]
  if (name === "ls") pool = [t.sections.proyectos.toLowerCase()]
  if (name === "sudo") pool = ["hire-me"]
  const hit = pool.find((p) => p.startsWith(arg) && p !== arg)
  return hit ? `${cmd} ${hit}` : null
}

export default function Console() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, t } = useI18n()
  const c = t.console
  const { resolvedTheme, setTheme } = useTheme()

  const [open, setOpen] = useState(false)
  const [screen, dispatch] = useReducer(screenReducer, { log: [], shown: 0, typed: 0 })
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyAt, setHistoryAt] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)
  const timers = useRef<number[]>([])
  const introShown = useRef(false)

  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )

  const projects = useMemo(() => getProjects(lang), [lang])

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const emit = useCallback(
    (next: Line[]) => dispatch({ type: "append", lines: next, instant: reduced }),
    [reduced]
  )

  /** Termina de escribir todo lo pendiente de una vez. */
  const flush = useCallback(() => dispatch({ type: "flush" }), [])

  const close = useCallback(() => {
    flush()
    setOpen(false)
    window.setTimeout(() => restoreTo.current?.focus(), 0)
  }, [flush])

  // Máquina de escribir: unos caracteres por cuadro, así una línea larga no
  // tarda más de medio segundo; una pausa corta entre líneas.
  const pendingLine = screen.log[screen.shown]
  useEffect(() => {
    if (!pendingLine) return
    const delay = pendingLine.tone === "cmd" ? 0 : screen.typed === 0 ? 45 : 12
    const id = window.setTimeout(() => dispatch({ type: "tick" }), delay)
    return () => window.clearTimeout(id)
  }, [pendingLine, screen.typed, screen.shown])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [screen, open])

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const go = useCallback(
    (href: string) => {
      emit([{ text: c.out.going(href), tone: "dim" }])
      later(() => {
        close()
        router.push(href)
      }, reduced ? 0 : 550)
    },
    [c, emit, later, close, router, reduced]
  )

  const run = useCallback(
    (rawInput: string) => {
      const raw = rawInput.trim()
      const echo: Line = { text: raw, tone: "cmd" }
      if (!raw) {
        emit([echo])
        return
      }

      setHistory((prev) => (prev[prev.length - 1] === raw ? prev : [...prev, raw]))
      setHistoryAt(null)

      const [head, ...rest] = raw.split(/\s+/)
      const cmd = CMD_ALIASES[head.toLowerCase()] ?? head.toLowerCase()
      const arg = rest.join(" ").toLowerCase()
      const out: Line[] = []
      const say = (text: string, tone: Tone = "out") => out.push({ text, tone })

      if (cmd === "clear") {
        dispatch({ type: "clear" })
        return
      }

      out.push(echo)

      switch (cmd) {
        case "help": {
          const h = c.help
          say(h.title, "strong")
          const rows: [string, string][] = [
            ["whoami", h.whoami],
            ["ls", h.ls],
            [`cd ${c.args.section}`, h.cd],
            [`cat ${c.args.project}`, h.cat],
            [`open ${c.args.target}`, h.open],
            ["stack", h.stack],
            ["email", h.email],
            ["theme", h.theme],
            ["lang", h.lang],
            ["history", h.history],
            ["clear", h.clear],
            ["exit", h.exit],
          ]
          const width = Math.max(...rows.map(([n]) => n.length)) + 3
          rows.forEach(([n, d]) => say(`  ${pad(n, width)}${d}`))
          break
        }

        case "whoami": {
          say("Santiago Natalichio", "strong")
          say(t.hero.lead)
          say(CONTACT.location, "dim")
          break
        }

        case "ls": {
          const projectsDir = t.sections.proyectos.toLowerCase()
          if (arg && SECTION_ALIASES[arg] === "proyectos") {
            const width = Math.max(...projects.map((p) => p.slug.length)) + 3
            projects.forEach((p) => say(`${pad(p.slug, width)}${p.title}`))
          } else if (arg) {
            say(c.out.noSection(arg), "err")
          } else {
            say(
              [...sectionNames(t).map((n) => `${n}/`), RESUME[lang].split("/").pop()].join("   ")
            )
            say(`ls ${projectsDir}`, "dim")
          }
          break
        }

        case "cd": {
          if (!arg) {
            say(c.out.usage(`cd ${c.args.section}`), "err")
            break
          }
          const id = SECTION_ALIASES[arg]
          if (!id) {
            say(c.out.noSection(arg), "err")
            break
          }
          go(id === "inicio" ? `/${lang}` : `/${lang}#${id}`)
          break
        }

        case "cat": {
          if (!arg) {
            say(c.out.usage(`cat ${c.args.project}`), "err")
            break
          }
          const p = projects.find((x) => x.slug === arg || x.title.toLowerCase() === arg)
          if (!p) {
            say(c.out.noProject("cat", arg), "err")
            break
          }
          say(p.title, "strong")
          say(p.context, "dim")
          say(p.summary)
          p.highlights.forEach((h) => say(`- ${h}`))
          say(`open ${p.slug}`, "dim")
          break
        }

        case "open": {
          if (!arg) {
            say(c.out.usage(`open ${c.args.target}`), "err")
            break
          }
          if (arg === "github" || arg === "linkedin") {
            window.open(CONTACT[arg], "_blank", "noopener")
            say(c.out.opened(arg === "github" ? "GitHub" : "LinkedIn"))
            break
          }
          if (arg === "cv") {
            window.open(RESUME[lang], "_blank", "noopener")
            say(c.out.opened("CV"))
            break
          }
          const p = projects.find((x) => x.slug === arg)
          if (!p) {
            say(c.out.noProject("open", arg), "err")
            break
          }
          go(`/${lang}/projects/${p.slug}`)
          break
        }

        case "cv": {
          window.open(RESUME[lang], "_blank", "noopener")
          say(c.out.opened("CV"))
          break
        }

        case "stack": {
          const skills = getProfile(lang).skills
          const width = Math.max(...skills.map((s) => s.label.length)) + 3
          skills.forEach((s) => say(`${pad(s.label.toLowerCase(), width)}${s.value}`))
          break
        }

        case "email": {
          navigator.clipboard
            ?.writeText(CONTACT.email)
            .then(() => emit([{ text: c.out.copied(CONTACT.email), tone: "out" }]))
            .catch(() => emit([{ text: c.out.copyFailed(CONTACT.email), tone: "err" }]))
          break
        }

        case "theme": {
          const dark = resolvedTheme !== "dark"
          setTheme(dark ? "dark" : "light")
          say(c.out.theme(dark))
          break
        }

        case "lang": {
          say(c.out.lang, "dim")
          emit(out)
          later(() => {
            close()
            router.push(swapLangPath(pathname, lang === "es" ? "en" : "es"))
          }, reduced ? 0 : 650)
          return
        }

        case "history": {
          if (!history.length) say(c.out.historyEmpty, "dim")
          history.forEach((h, i) => say(`${String(i + 1).padStart(3, " ")}  ${h}`))
          break
        }

        case "exit": {
          say(c.out.bye, "dim")
          emit(out)
          later(close, reduced ? 0 : 400)
          return
        }

        case "sudo": {
          if (arg === "hire-me" || arg === "contratar") {
            c.out.hireMe.forEach((l, i) => say(l, i === 0 ? "dim" : "strong"))
            later(() => {
              window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.out.hireSubject)}`
            }, reduced ? 0 : 1100)
          } else {
            say(c.out.notFound(raw), "err")
          }
          break
        }

        default:
          say(c.out.notFound(head), "err")
      }

      emit(out)
    },
    [c, t, lang, projects, history, emit, go, later, close, router, pathname, resolvedTheme, setTheme, reduced]
  )

  // Apertura por atajo global y por el evento que emiten los disparadores.
  useEffect(() => {
    const onOpenRequest = () => {
      restoreTo.current = document.activeElement as HTMLElement
      setOpen(true)
      if (!introShown.current) {
        introShown.current = true
        emit(c.intro.map((text, i) => ({ text, tone: i === 0 ? "strong" : "dim" })))
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)

      const shortcut =
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey)

      if (shortcut) {
        event.preventDefault()
        onOpenRequest()
      }
    }

    window.addEventListener(CONSOLE_EVENT, onOpenRequest)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener(CONSOLE_EVENT, onOpenRequest)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [emit, c])

  // Al abrir: bloquea el scroll de fondo y enfoca el prompt.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  const ghost = suggest(input, lang, t)
  const ghostRest = ghost && ghost.toLowerCase().startsWith(input.toLowerCase()) ? ghost.slice(input.length) : ""
  const busy = screen.shown < screen.log.length
  const current = pendingLine && pendingLine.tone !== "cmd" ? pendingLine : null
  const lines = screen.log.slice(0, screen.shown)
  const typed = screen.typed

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (busy && event.key !== "Escape") flush()

    switch (event.key) {
      case "Escape":
        event.preventDefault()
        close()
        break
      case "Enter":
        event.preventDefault()
        run(input)
        setInput("")
        break
      case "Tab":
        event.preventDefault()
        if (ghost) setInput(ghost + (ghost.includes(" ") ? "" : " "))
        break
      case "ArrowRight":
        if (ghost && inputRef.current?.selectionStart === input.length) {
          event.preventDefault()
          setInput(ghost)
        }
        break
      case "ArrowUp": {
        event.preventDefault()
        if (!history.length) break
        const next = historyAt === null ? history.length - 1 : Math.max(0, historyAt - 1)
        setHistoryAt(next)
        setInput(history[next])
        break
      }
      case "ArrowDown": {
        event.preventDefault()
        if (historyAt === null) break
        const next = historyAt + 1
        if (next >= history.length) {
          setHistoryAt(null)
          setInput("")
        } else {
          setHistoryAt(next)
          setInput(history[next])
        }
        break
      }
      case "l":
        if (event.ctrlKey) {
          event.preventDefault()
          dispatch({ type: "clear" })
        }
        break
      default:
        break
    }
  }

  const prompt = (
    <span aria-hidden className="shrink-0 whitespace-pre select-none">
      <span className="text-ink-soft">{c.user}@santiago</span>
      <span className="text-ink-faint">:</span>
      <span className="text-ink">~</span>
      <span className="text-mark">$ </span>
    </span>
  )

  const quick = ["help", "whoami", `ls ${t.sections.proyectos.toLowerCase()}`, "cat onestock", "open cv"]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[10vh] sm:px-4">
      <button
        type="button"
        tabIndex={-1}
        aria-label={c.close}
        onClick={close}
        className="absolute inset-0 cursor-default bg-sheet-sunk/80 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.dialog}
        className="console-panel relative flex max-h-[78vh] w-full max-w-2xl flex-col border border-ink bg-sheet-raised"
      >
        <div className="flex items-center justify-between border-b border-ink px-4 py-2">
          <span className="annot text-ink-soft">
            {c.title} <span className="text-ink-faint">· {c.user}@santiago</span>
          </span>
          <div className="flex items-center gap-3">
            <kbd className="annot hidden border border-rule px-1.5 py-px text-ink-faint sm:inline">esc</kbd>
            <button
              type="button"
              onClick={close}
              aria-label={c.close}
              className="flex size-6 items-center justify-center text-ink-soft transition-colors hover:text-ink"
            >
              <X className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="console-screen min-h-[16rem] flex-1 cursor-text overflow-y-auto bg-sheet-sunk px-4 py-4 font-mono text-[0.8rem] leading-6 sm:text-[0.84rem]"
        >
          <div role="log" aria-live="polite" aria-relevant="additions">
            {lines.map((line, i) => (
              <Row key={i} line={line} prompt={prompt} />
            ))}
          </div>

          {current && (
            <p aria-hidden className={`whitespace-pre-wrap break-words ${toneClass(current.tone)}`}>
              {current.text.slice(0, typed)}
              <span className="console-cursor ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-ink-soft" />
            </p>
          )}

          <div className={`flex items-start ${busy ? "opacity-40" : ""}`}>
            {prompt}
            <div className="relative min-w-0 flex-1">
              <span aria-hidden className="pointer-events-none absolute inset-0 whitespace-pre text-ink-faint">
                <span className="invisible">{input}</span>
                {ghostRest}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value)
                  setHistoryAt(null)
                }}
                onKeyDown={handleKeyDown}
                aria-label={c.inputLabel}
                placeholder={lines.length || busy ? "" : c.placeholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="send"
                className="console-input relative w-full bg-transparent text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-rule px-4 py-2.5">
          <span className="annot text-ink-faint">{c.tryThis}</span>
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                flush()
                run(q)
                inputRef.current?.focus()
              }}
              className="annot border border-rule px-2 py-1 text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function toneClass(tone: Tone) {
  switch (tone) {
    case "strong":
      return "text-ink"
    case "err":
      return "text-mark"
    case "dim":
      return "text-ink-faint"
    case "cmd":
      return "text-ink"
    default:
      return "text-ink-soft"
  }
}

function Row({ line, prompt }: { line: Line; prompt: React.ReactNode }) {
  if (line.tone === "cmd") {
    return (
      <p className="flex whitespace-pre-wrap break-words">
        {prompt}
        <span className="text-ink">{line.text}</span>
      </p>
    )
  }
  return <p className={`whitespace-pre-wrap break-words ${toneClass(line.tone)}`}>{line.text || " "}</p>
}
