"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FileText, Menu, Terminal, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { RESUME_URL, SECTIONS, SECTION_IDS } from "@/lib/sections"
import { useActiveSection } from "@/lib/use-active-section"

/**
 * Cajetín de rotulación del pliego: identidad a la izquierda, referencia de la
 * sección en curso, y las acciones a la derecha. Plano, a ras, con una única
 * regla inferior — nada de píldora flotante.
 */
export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(isHome ? SECTION_IDS : [])

  const activeSection = SECTIONS.find((section) => section.id === active)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const openConsole = () => window.dispatchEvent(new Event("plano:console"))

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-rule bg-sheet" : "border-transparent bg-sheet/0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[92rem] items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="plot-heading text-[0.95rem] tracking-tight text-ink transition-colors hover:text-mark"
        >
          Santiago Natalichio
        </Link>

        {/* Referencia de la sección en lectura: el cajetín dice qué se está
            mirando, igual que el encabezado de una lámina. */}
        {isHome && activeSection && (
          <span className="annot hidden items-center gap-2 border-l border-rule pl-4 text-ink-soft sm:flex">
            <span className="text-mark">{activeSection.ref}</span>
            {activeSection.label}
          </span>
        )}

        <div className="flex-1" />

        <nav aria-label="Secciones" className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((section) => {
            const isActive = isHome && active === section.id

            return (
              <Link
                key={section.id}
                href={`/#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {section.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-px left-0 h-px w-full origin-left bg-mark transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={openConsole}
            className="flex h-9 items-center gap-2 border border-rule px-3 text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            <Terminal className="size-4" strokeWidth={1.5} />
            <span className="annot">Consola</span>
            <kbd className="annot border border-rule px-1 py-px text-ink-faint">
              /
            </kbd>
          </button>

          <ThemeToggle />

          {RESUME_URL && (
            <a
              href={RESUME_URL}
              className="flex h-9 items-center gap-2 bg-ink px-4 text-sm text-sheet transition-colors duration-200 hover:bg-mark"
            >
              <FileText className="size-4" strokeWidth={1.5} />
              CV
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openConsole}
            aria-label="Abrir consola"
            className="flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <Terminal className="size-4" strokeWidth={1.5} />
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {menuOpen ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Secciones"
          className="border-t border-rule bg-sheet md:hidden"
        >
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`/#${section.id}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 border-b border-rule-soft px-5 py-4 text-ink transition-colors hover:bg-sheet-sunk sm:px-8"
            >
              <span className="annot w-4 text-mark">{section.ref}</span>
              {section.label}
            </Link>
          ))}

          {RESUME_URL && (
            <a
              href={RESUME_URL}
              className="flex items-baseline gap-4 px-5 py-4 text-ink sm:px-8"
            >
              <span className="annot w-4 text-mark">·</span>
              Descargar CV
            </a>
          )}
        </nav>
      )}
    </header>
  )
}
