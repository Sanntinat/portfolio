"use client"

import { SECTIONS, SECTION_IDS } from "@/lib/sections"
import { useActiveSection, useScrollProgress } from "@/lib/use-active-section"

/**
 * Riel de referencia del pliego. En un plano, la referencia de grilla dice
 * dónde estás mirando; acá hace exactamente ese trabajo y además navega.
 */
export default function SheetRail() {
  const active = useActiveSection(SECTION_IDS)
  const progress = useScrollProgress()

  return (
    <nav
      aria-label="Referencias del pliego"
      className="fixed top-0 bottom-0 left-0 z-30 hidden w-14 flex-col justify-between border-r border-rule bg-sheet lg:flex"
    >
      <div aria-hidden className="tick-rail mt-20 h-16 w-full opacity-45" />

      <ul className="flex flex-col gap-px">
        {SECTIONS.map((section) => {
          const isActive = active === section.id

          return (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-14 w-14 items-center justify-center border-y border-transparent transition-colors duration-200 hover:bg-sheet-sunk"
              >
                <span
                  className={`annot transition-colors duration-200 ${
                    isActive
                      ? "text-mark"
                      : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {section.ref}
                </span>

                {/* Línea de llamada: se extiende hacia el dibujo cuando la
                    sección está en lectura. */}
                <span
                  aria-hidden
                  className={`absolute top-1/2 left-full h-px origin-left bg-mark transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "w-3 scale-x-100" : "w-3 scale-x-0"
                  }`}
                />

                {/* Bandera con el nombre de la sección, al pasar o enfocar. */}
                <span
                  aria-hidden
                  className="annot pointer-events-none absolute top-1/2 left-full ml-4 -translate-y-1/2 border border-rule bg-sheet-raised px-2 py-1 whitespace-nowrap text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {section.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Cota de avance. Va oculta a los lectores de pantalla enteros: quien
          navega por teclado ya sabe dónde está, y "37" sin contexto no es
          información sino ruido. */}
      <div aria-hidden className="flex flex-col items-center gap-3 pb-6">
        <div
          className="relative h-24 w-px bg-rule"
          title="Posición en el pliego"
        >
          <span
            className="absolute -left-[3px] h-px w-[7px] bg-mark"
            style={{ top: `${progress * 100}%` }}
          />
        </div>

        <span className="annot text-ink-soft tabular-nums">
          {String(Math.round(progress * 100)).padStart(2, "0")}
        </span>
      </div>
    </nav>
  )
}
