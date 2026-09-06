import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"

import { actionClass } from "@/components/ui/action"
import { projects } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = projects.findIndex((item) => item.slug === slug)

  if (index === -1) notFound()

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="mx-auto max-w-[92rem] px-5 pt-12 pb-24 sm:px-8">
      <Link
        href="/#proyectos"
        className="annot group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft
          className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1"
          strokeWidth={1.5}
        />
        Volver al índice
      </Link>

      <header className="mt-10 border-t border-ink pt-6">
        <h1 className="plot-title max-w-[18ch] text-[clamp(2.25rem,6vw,4.25rem)]">
          {project.title}
        </h1>

        <p className="annot mt-6 text-ink-faint">{project.tech.join(" · ")}</p>

        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
          {project.description}
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <figure className="border border-rule bg-sheet-raised">
            <div className="relative aspect-[16/9] overflow-hidden bg-sheet-sunk">
              <Image
                src={project.image}
                alt={`Captura de ${project.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60rem"
                className="object-cover"
              />
            </div>
          </figure>

          {project.images.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.images.map((src, position) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden border border-rule bg-sheet-sunk"
                >
                  <Image
                    src={src}
                    alt={`${project.title}, vista ${position + 2}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 30rem"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <section className="mt-14">
            <h2 className="plot-heading border-b border-ink pb-3 text-2xl">
              Funcionalidades
            </h2>

            <ul className="mt-1">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-4 border-b border-rule-soft py-4 text-ink"
                >
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-mark" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="plot-heading border-b border-ink pb-3 text-2xl">
              Arquitectura
            </h2>

            <ol className="mt-1">
              {project.architecture.map((item, position) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-rule-soft py-4"
                >
                  <span aria-hidden className="annot text-ink-faint tabular-nums">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-rule bg-sheet-raised">
            <h2 className="annot border-b border-rule px-4 py-3 text-ink-soft">
              Ficha
            </h2>

            <dl>
              <Row field="Stack" value={project.tech.join(", ")} />

              <Row
                field="Código"
                value={
                  project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-rule underline-offset-4 hover:text-mark hover:decoration-mark"
                    >
                      Ver repositorio
                    </a>
                  ) : (
                    <span className="text-ink-soft">Sin publicar</span>
                  )
                }
              />

              <Row
                field="Demo"
                value={
                  project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-rule underline-offset-4 hover:text-mark hover:decoration-mark"
                    >
                      Abrir demo
                    </a>
                  ) : (
                    <span className="text-ink-soft">Sin desplegar</span>
                  )
                }
              />
            </dl>

            {(project.github || project.demo) && (
              <div className="flex flex-col gap-2 border-t border-rule p-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`${actionClass("solid")} justify-center`}
                  >
                    <Github className="size-4" strokeWidth={1.5} />
                    Ver el código
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={`${actionClass()} justify-center`}
                  >
                    <ExternalLink className="size-4" strokeWidth={1.5} />
                    Abrir la demo
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      <nav aria-label="Otros proyectos" className="mt-20 border-t border-ink pt-6">
        <Link href={`/projects/${next.slug}`} className="group block">
          <span className="annot text-ink-faint">Siguiente proyecto</span>

          <span className="mt-3 flex items-baseline justify-between gap-6">
            <span className="plot-heading text-[clamp(1.5rem,3vw,2.25rem)] text-ink transition-colors group-hover:text-mark">
              {next.title}
            </span>

            <ArrowRight
              aria-hidden
              className="size-6 shrink-0 self-center text-ink-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-mark"
              strokeWidth={1.5}
            />
          </span>
        </Link>
      </nav>
    </article>
  )
}

function Row({ field, value }: { field: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-rule-soft px-4 py-4 last:border-b-0">
      <dt className="annot text-ink-faint">{field}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  )
}
