"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { CornerDownLeft, X } from "lucide-react"

import { projects } from "@/data/projects"
import { CONSOLE_EVENT } from "@/lib/console-bus"
import { CONTACT, RESUME_URL, SECTIONS } from "@/lib/sections"

type Command = {
  name: string
  hint: string
  group: string
  run: (ctx: Context) => void
}

type Context = {
  router: ReturnType<typeof useRouter>
  print: (lines: string[]) => void
  close: () => void
  clear: () => void
  toggleTheme: () => void
}

const STACK = [
  "Django · Django REST Framework",
  "React · Next.js · TypeScript",
  "React Native · Expo",
  "PostgreSQL",
  "Tailwind CSS",
]

function buildCommands(): Command[] {
  const commands: Command[] = []

  for (const section of SECTIONS) {
    commands.push({
      name: section.label.toLowerCase(),
      hint: `Ir a la sección ${section.ref}`,
      group: "Navegar",
      run: ({ router, close }) => {
        close()
        router.push(`/#${section.id}`)
      },
    })
  }

  for (const project of projects) {
    commands.push({
      name: project.title.toLowerCase(),
      hint: project.tech.join(" · "),
      group: "Proyectos",
      run: ({ router, close }) => {
        close()
        router.push(`/projects/${project.slug}`)
      },
    })
  }

  commands.push(
    {
      name: "stack",
      hint: "Tecnologías con las que trabajo",
      group: "Consultar",
      run: ({ print }) => print(STACK),
    },
    {
      name: "email",
      hint: "Copiar la dirección de correo",
      group: "Consultar",
      run: ({ print }) => {
        navigator.clipboard
          ?.writeText(CONTACT.email)
          .then(() => print([`Copiado: ${CONTACT.email}`]))
          .catch(() =>
            print([
              "No se pudo copiar al portapapeles.",
              `Escribime a ${CONTACT.email}`,
            ])
          )
      },
    },
    {
      name: "tema",
      hint: "Alternar hoja de plano y cianotipo",
      group: "Consultar",
      run: ({ toggleTheme, print }) => {
        toggleTheme()
        print(["Tema cambiado."])
      },
    },
    {
      name: "ayuda",
      hint: "Listar todos los comandos",
      group: "Consultar",
      run: ({ print }) =>
        print([
          "Escribí para filtrar. Enter ejecuta, ↑ ↓ recorre, Esc cierra.",
          "Tab completa el comando resaltado.",
        ]),
    },
    {
      name: "limpiar",
      hint: "Vaciar el registro",
      group: "Consultar",
      run: ({ clear }) => clear(),
    }
  )

  if (CONTACT.github) {
    commands.push({
      name: "github",
      hint: "Abrir el perfil de GitHub",
      group: "Enlaces",
      run: ({ print }) => {
        window.open(CONTACT.github as string, "_blank", "noopener")
        print(["GitHub abierto en otra pestaña."])
      },
    })
  }

  if (CONTACT.linkedin) {
    commands.push({
      name: "linkedin",
      hint: "Abrir el perfil de LinkedIn",
      group: "Enlaces",
      run: ({ print }) => {
        window.open(CONTACT.linkedin as string, "_blank", "noopener")
        print(["LinkedIn abierto en otra pestaña."])
      },
    })
  }

  const resume = RESUME_URL
  if (resume) {
    commands.push({
      name: "cv",
      hint: "Descargar el CV",
      group: "Enlaces",
      run: ({ print }) => {
        window.open(resume, "_blank", "noopener")
        print(["CV abierto en otra pestaña."])
      },
    })
  }

  return commands
}

type Entry = { kind: "in" | "out"; text: string }

export default function Console() {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  // El resaltado pertenece a la consulta que lo produjo: al cambiar el texto
  // vuelve al primer resultado sin necesidad de un efecto de sincronización.
  const [highlight, setHighlight] = useState({ query: "", index: 0 })
  const cursor = highlight.query === query ? highlight.index : 0

  const setCursor = useCallback(
    (next: number | ((current: number) => number)) =>
      setHighlight((previous) => {
        const current = previous.query === query ? previous.index : 0
        return {
          query,
          index: typeof next === "function" ? next(current) : next,
        }
      }),
    [query]
  )
  const [log, setLog] = useState<Entry[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyAt, setHistoryAt] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  const commands = useMemo(() => buildCommands(), [])

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return commands
    return commands.filter(
      (command) =>
        command.name.includes(term) ||
        command.hint.toLowerCase().includes(term) ||
        command.group.toLowerCase().includes(term)
    )
  }, [commands, query])

  // El encabezado de grupo se decide una vez, con la lista ya filtrada, en
  // lugar de arrastrar una variable mutable a través del render.
  const rows = useMemo(
    () =>
      matches.map((command, index) => ({
        command,
        index,
        startsGroup: index === 0 || matches[index - 1].group !== command.group,
      })),
    [matches]
  )

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setHighlight({ query: "", index: 0 })
    restoreTo.current?.focus()
  }, [])

  const print = useCallback((lines: string[]) => {
    setLog((prev) => [...prev, ...lines.map((text) => ({ kind: "out" as const, text }))])
  }, [])

  const context: Context = useMemo(
    () => ({
      router,
      print,
      close,
      clear: () => setLog([]),
      toggleTheme: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    }),
    [router, print, close, setTheme, resolvedTheme]
  )

  const submit = useCallback(() => {
    const typed = query.trim()
    const command = matches[cursor]

    if (typed) {
      setHistory((prev) => [...prev, typed])
      setHistoryAt(null)
    }

    if (command) {
      setLog((prev) => [...prev, { kind: "in", text: command.name }])
      setQuery("")
      setHighlight({ query: "", index: 0 })
      command.run(context)
      return
    }

    setLog((prev) => [
      ...prev,
      { kind: "in", text: typed },
      {
        kind: "out",
        text: `No existe el comando «${typed}». Escribí «ayuda» para ver la lista.`,
      },
    ])
    setQuery("")
  }, [query, matches, cursor, context])

  // Apertura por atajo global y por el evento que emiten los disparadores.
  useEffect(() => {
    const onOpenRequest = () => {
      restoreTo.current = document.activeElement as HTMLElement
      setOpen(true)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)

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
  }, [])

  // Bloquea el scroll de fondo y enfoca el campo mientras la consola está abierta.
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()

    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [log, open])

  if (!open) return null

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault()
        close()
        break

      case "Enter":
        event.preventDefault()
        submit()
        break

      case "ArrowDown":
        event.preventDefault()
        setCursor((c) => (matches.length ? (c + 1) % matches.length : 0))
        break

      case "ArrowUp":
        event.preventDefault()
        // Sin texto escrito, ↑ recorre el historial en vez de la lista.
        if (!query && history.length) {
          const next =
            historyAt === null ? history.length - 1 : Math.max(0, historyAt - 1)
          setHistoryAt(next)
          setQuery(history[next])
          break
        }
        setCursor((c) =>
          matches.length ? (c - 1 + matches.length) % matches.length : 0
        )
        break

      case "Tab":
        event.preventDefault()
        if (matches[cursor]) setQuery(matches[cursor].name)
        break

      default:
        break
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={(event) => {
        if (event.key === "Tab") event.preventDefault()
      }}
    >
      <button
        type="button"
        aria-label="Cerrar la consola"
        onClick={close}
        className="absolute inset-0 cursor-default bg-sheet-sunk/80"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Consola de comandos"
        className="relative flex w-full max-w-xl flex-col border border-ink bg-sheet-raised shadow-[0_24px_60px_-24px_rgb(0_0_0_/_0.45)]"
      >
        <div className="flex items-center justify-between border-b border-rule px-4 py-2">
          <span className="annot text-ink-soft">Consola</span>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar la consola"
            className="flex size-6 items-center justify-center text-ink-soft transition-colors hover:text-ink"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {log.length > 0 && (
          <div
            ref={logRef}
            className="max-h-40 overflow-y-auto border-b border-rule px-4 py-3"
            aria-live="polite"
          >
            {log.map((entry, index) => (
              <p
                key={index}
                className={`annot leading-6 ${
                  entry.kind === "in" ? "text-ink" : "text-ink-soft"
                }`}
              >
                {entry.kind === "in" && <span className="text-mark">&gt; </span>}
                {entry.text}
              </p>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <span aria-hidden className="annot text-mark">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí un comando o una sección"
            aria-label="Comando"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="annot w-full bg-transparent text-ink outline-none"
          />
        </div>

        <div className="max-h-[46vh] overflow-y-auto py-1">
          {matches.length === 0 && (
            <p className="annot px-4 py-6 text-ink-soft">
              Nada coincide con «{query.trim()}». Probá con «ayuda».
            </p>
          )}

          {rows.map(({ command, index, startsGroup }) => {
            const isActive = index === cursor

            return (
              <div key={`${command.group}-${command.name}`}>
                {startsGroup && (
                  <p className="annot px-4 pt-3 pb-1 text-ink-faint">
                    {command.group}
                  </p>
                )}

                <button
                  type="button"
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => {
                    setLog((prev) => [...prev, { kind: "in", text: command.name }])
                    setQuery("")
                    command.run(context)
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
                    isActive ? "bg-sheet-sunk" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-3 w-px ${isActive ? "bg-mark" : "bg-transparent"}`}
                  />
                  <span className="flex-1 truncate text-sm text-ink">
                    {command.name}
                  </span>
                  <span className="annot hidden truncate text-ink-faint sm:block">
                    {command.hint}
                  </span>
                  {isActive && (
                    <CornerDownLeft
                      className="size-3.5 shrink-0 text-mark"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
