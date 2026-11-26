"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FileText, Languages, Menu, Terminal, X } from "lucide-react"

import { useI18n } from "@/components/i18n-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { useScrolledPast } from "@/lib/client-hooks"
import { openConsole } from "@/lib/console-bus"
import { swapLangPath } from "@/lib/i18n"
import { RESUME, SECTIONS, SECTION_IDS } from "@/lib/sections"
import { useActiveSection } from "@/lib/use-active-section"

/**
 * Cajetín de rotulación del pliego: identidad a la izquierda, referencia de la
 * sección en curso, y las acciones a la derecha. Plano, a ras, con una única
 * regla inferior — nada de píldora flotante.
 */
export default function Navbar() {
  const pathname = usePathname()
  const { lang, t } = useI18n()
  const isHome = pathname === `/${lang}`
  const otherLang = lang === "es" ? "en" : "es"
  const otherPath = swapLangPath(pathname, otherLang)

  const scrolled = useScrolledPast(8)

  // El menú se abre "para esta ruta": al navegar, el pathname cambia y el
  // menú se cierra solo, sin un efecto que sincronice.
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const menuOpen = menuFor === pathname
  const active = useActiveSection(isHome ? SECTION_IDS : [])

  const activeSection = SECTIONS.find((section) => section.id === active)

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-rule bg-sheet" : "border-transparent bg-sheet/0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[92rem] items-center gap-4 px-5 sm:px-8">
        <Link
          href={`/${lang}`}
          className="plot-heading shrink-0 text-[0.95rem] tracking-tight whitespace-nowrap text-ink transition-colors hover:text-mark"
        >
          Santiago Natalichio
        </Link>

        {/* Referencia de la sección en lectura: el cajetín dice qué se está
            mirando, igual que el encabezado de una lámina. */}
        {isHome && activeSection && (
          <span className="annot hidden items-center gap-2 border-l border-rule pl-4 text-ink-soft sm:flex">
            <span className="text-mark">{activeSection.ref}</span>
            {t.sections[activeSection.id]}
          </span>
        )}

        <div className="flex-1" />

        <nav aria-label={t.nav.sectionsLabel} className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((section) => {
            const isActive = isHome && active === section.id

            return (
              <Link
                key={section.id}
                href={`/${lang}#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {t.sections[section.id]}
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

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={openConsole}
            className="flex h-9 items-center gap-2 border border-rule px-3 text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            <Terminal className="size-4" strokeWidth={1.5} />
            <span className="annot">{t.nav.console}</span>
            <kbd className="annot border border-rule px-1 py-px text-ink-faint">
              /
            </kbd>
          </button>

          <Link
            href={otherPath}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.switchLang}
            title={t.switchLang}
            className="annot flex h-9 items-center gap-1.5 border border-rule px-2.5 text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            <Languages className="size-3.5" strokeWidth={1.5} />
            {t.otherLangShort}
          </Link>

          <ThemeToggle />

          <a
            href={RESUME[lang]}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 items-center gap-2 bg-ink px-4 text-sm text-sheet transition-colors duration-200 hover:bg-mark"
          >
            <FileText className="size-4" strokeWidth={1.5} />
            {t.nav.resume}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openConsole}
            aria-label={t.nav.openConsole}
            className="flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <Terminal className="size-4" strokeWidth={1.5} />
          </button>

          <Link
            href={otherPath}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.switchLang}
            className="annot flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {t.otherLangShort}
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuFor(menuOpen ? null : pathname)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
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
          aria-label={t.nav.sectionsLabel}
          className="border-t border-rule bg-sheet lg:hidden"
        >
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`/${lang}#${section.id}`}
              onClick={() => setMenuFor(null)}
              className="flex items-baseline gap-4 border-b border-rule-soft px-5 py-4 text-ink transition-colors hover:bg-sheet-sunk sm:px-8"
            >
              <span className="annot w-4 text-mark">{section.ref}</span>
              {t.sections[section.id]}
            </Link>
          ))}

          <a
            href={RESUME[lang]}
            target="_blank"
            rel="noreferrer"
            className="flex items-baseline gap-4 px-5 py-4 text-ink sm:px-8"
          >
            <FileText aria-hidden className="size-3.5 translate-y-0.5 text-mark" strokeWidth={1.5} />
            {t.nav.downloadResume}
          </a>
        </nav>
      )}
    </header>
  )
}
