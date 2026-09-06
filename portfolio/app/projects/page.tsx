import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Listado completo de los proyectos de Santiago Natalichio, con su stack y su estado de publicación.",
}

/**
 * Listado completo, con la forma de una planilla de lámina: una fila por
 * proyecto, con miniatura, stack y estado. Complementa al índice con visor de
 * la portada, que muestra sólo la selección.
 */
export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[92rem] px-5 pt-12 pb-24 sm:px-8">
      <header className="border-t border-ink pt-6">
        <h1 className="plot-title text-[clamp(2.5rem,7vw,4.5rem)]">Proyectos</h1>

        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
          Todo lo que construí hasta ahora, con su stack y su estado de
          publicación.
        </p>
      </header>

      <ul className="mt-14 border-t border-rule">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-rule">
            <Link
              href={`/projects/${project.slug}`}
              className="group grid gap-5 py-6 transition-colors duration-200 hover:bg-sheet-raised sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-8 sm:px-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden border border-rule bg-sheet-sunk">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 10rem"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <h2 className="plot-heading text-xl text-ink transition-colors group-hover:text-mark">
                  {project.title}
                </h2>

                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                <p className="annot mt-3 text-ink-faint">
                  {project.tech.join(" · ")}
                </p>
              </div>

              <span className="flex items-center gap-3 justify-self-start sm:justify-self-end">
                <span className="annot text-ink-faint">
                  {project.demo ? "Con demo" : "Sin desplegar"}
                </span>

                <ArrowUpRight
                  aria-hidden
                  className="size-5 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-mark"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
