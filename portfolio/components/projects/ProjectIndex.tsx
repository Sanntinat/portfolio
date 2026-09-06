"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import type { Project } from "@/data/projects"

/**
 * Índice de proyectos como llamadas de plano: la lista a la izquierda, el
 * visor de detalle fijado a la derecha. Recorrer la lista con el mouse o con
 * el teclado cambia lo que muestra el visor; la línea de llamada apunta desde
 * la fila hacia él.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0)
  const current = projects[active]

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-14">
      <ul className="border-t border-rule">
        {projects.map((project, index) => {
          const isActive = index === active

          return (
            <li key={project.slug} className="relative border-b border-rule">
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group block py-6 transition-colors duration-200 hover:bg-sheet-raised lg:py-8"
              >
                <div className="flex items-start justify-between gap-6 px-1">
                  <div className="min-w-0">
                    <h3
                      className={`plot-heading text-[clamp(1.25rem,2.4vw,1.75rem)] transition-colors duration-200 ${
                        isActive ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="annot mt-3 text-ink-faint">
                      {project.tech.join(" · ")}
                    </p>
                  </div>

                  <ArrowUpRight
                    aria-hidden
                    className={`mt-1 size-5 shrink-0 transition-all duration-200 ${
                      isActive
                        ? "translate-x-0 text-mark opacity-100"
                        : "-translate-x-1 text-ink-faint opacity-0 group-hover:opacity-100"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* En pantallas angostas no hay visor fijo, así que la captura
                    viaja con su fila. */}
                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden border border-rule bg-sheet-sunk lg:hidden">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-ink-soft lg:hidden">
                  {project.description}
                </p>
              </Link>

              {/* Línea de llamada hacia el visor. */}
              <span
                aria-hidden
                className={`absolute top-1/2 left-full hidden h-px w-14 origin-left bg-mark transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </li>
          )
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24 border border-rule bg-sheet-raised">
          <div className="relative aspect-[16/10] overflow-hidden bg-sheet-sunk">
            {projects.map((project, index) => (
              <Image
                key={project.slug}
                src={project.image}
                alt={`Captura de ${project.title}`}
                fill
                sizes="28rem"
                priority={index === 0}
                className={`object-cover transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="border-t border-rule px-5 py-5">
            <p className="min-h-[4.5rem] text-sm leading-relaxed text-ink-soft">
              {current.description}
            </p>

            <Link
              href={`/projects/${current.slug}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
            >
              Ver el proyecto
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
