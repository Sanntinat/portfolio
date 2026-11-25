import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Github } from "lucide-react"

import Schematic from "@/components/projects/Schematic"
import { actionClass } from "@/components/ui/action"
import { PROJECT_SLUGS, formatPeriod, getProjects } from "@/data/projects"
import { LANGS, getDict, isLang } from "@/lib/i18n"

export const dynamicParams = false

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PROJECT_SLUGS.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLang(lang)) return {}
  const project = getProjects(lang).find((item) => item.slug === slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { es: `/es/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLang(lang)) notFound()

  const t = getDict(lang).projects
  const projects = getProjects(lang)
  const index = projects.findIndex((item) => item.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const [lead, ...gallery] = project.shots

  return (
    <article className="mx-auto max-w-[92rem] px-5 pt-12 pb-24 sm:px-8">
      <Link
        href={`/${lang}#proyectos`}
        className="annot group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft
          className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1"
          strokeWidth={1.5}
        />
        {t.back}
      </Link>

      <header className="mt-10 border-t border-ink pt-6">
        <h1 className="plot-title max-w-[18ch] text-[clamp(2.25rem,6vw,4.25rem)]">{project.title}</h1>

        <p className="mt-4 text-ink-soft">{project.context}</p>

        <p className="measure mt-6 text-lg leading-relaxed text-ink">{project.summary}</p>
      </header>

      <div className="mt-12 grid gap-12 *:min-w-0 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="min-w-0">
          {lead ? (
            <Figure shot={lead} priority />
          ) : (
            project.schematic && (
              <figure>
                <div className="overflow-x-auto border border-rule bg-sheet-raised py-4">
                  <Schematic layers={project.schematic} label={t.schematic} />
                </div>
                <figcaption className="annot mt-3 text-ink-faint">{t.schematicNote}</figcaption>
              </figure>
            )
          )}

          {gallery.length > 0 && (
            <div className="mt-8 grid items-start gap-8 sm:grid-cols-2">
              {gallery.map((shot) => (
                <Figure key={shot.src} shot={shot} small />
              ))}
            </div>
          )}

          <section className="mt-14">
            <h2 className="plot-heading border-b border-ink pb-3 text-2xl">{t.whatIDid}</h2>

            <ul className="mt-1">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-4 border-b border-rule-soft py-4 leading-relaxed text-ink">
                  <span aria-hidden className="mt-3 w-4 shrink-0 border-t border-mark" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {project.results.length > 0 && (
            <section className="mt-14">
              <h2 className="plot-heading border-b border-ink pb-3 text-2xl">{t.results}</h2>

              <dl className="mt-1">
                {project.results.map((row) => (
                  <div
                    key={row.what}
                    className="grid gap-1 border-b border-rule-soft py-4 sm:grid-cols-[1fr_1fr] sm:gap-8"
                  >
                    <dt className="text-ink-soft">{row.what}</dt>
                    <dd className="text-ink tabular-nums">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-14">
            <h2 className="plot-heading border-b border-ink pb-3 text-2xl">{t.architecture}</h2>

            <ol className="mt-1">
              {project.architecture.map((item, position) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-rule-soft py-4"
                >
                  <span aria-hidden className="annot text-ink-faint tabular-nums">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-rule bg-sheet-raised">
            <h2 className="annot border-b border-rule px-4 py-3 text-ink-soft">{t.sheet}</h2>

            <dl>
              <Row field={t.period} value={formatPeriod(project.from, project.to, lang, t.present)} />
              <Row field={t.context} value={project.context} />
              <Row field={t.stack} value={project.tech.join(", ")} />
              <Row
                field={t.code}
                value={
                  project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-rule underline-offset-4 hover:text-mark hover:decoration-mark"
                    >
                      {t.seeRepo}
                    </a>
                  ) : (
                    <span className="text-ink-soft">{t.notPublished}</span>
                  )
                }
              />
            </dl>

            {project.github && (
              <div className="border-t border-rule p-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`${actionClass("solid")} w-full justify-center`}
                >
                  <Github className="size-4" strokeWidth={1.5} />
                  {t.seeCode}
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>

      <nav aria-label={t.otherProjects} className="mt-20 border-t border-ink pt-6">
        <Link href={`/${lang}/projects/${next.slug}`} className="group block">
          <span className="annot text-ink-faint">{t.next}</span>

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

function Figure({
  shot,
  priority = false,
  small = false,
}: {
  shot: { src: string; w: number; h: number; alt: string; caption: string; fit: "cover" | "contain" }
  priority?: boolean
  small?: boolean
}) {
  // Entera y en su proporción: una captura con texto chico recortada no se lee.
  return (
    <figure>
      <div className={`border border-rule ${shot.fit === "contain" ? "bg-sheet-raised p-3" : "bg-sheet-sunk"}`}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          priority={priority}
          sizes={small ? "(max-width: 640px) 100vw, 30rem" : "(max-width: 1024px) 100vw, 60rem"}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">{shot.caption}</figcaption>
    </figure>
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
