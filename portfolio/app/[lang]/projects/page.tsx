import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

import ProjectCover from "@/components/projects/ProjectCover"
import { formatPeriod, getProjects } from "@/data/projects"
import { getDict, isLang } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDict(lang).projects
  return {
    title: t.allTitle,
    description: t.allMetaDescription,
    alternates: {
      canonical: `/${lang}/projects`,
      languages: { es: "/es/projects", en: "/en/projects" },
    },
  }
}

/**
 * Listado completo, con la forma de una planilla de lámina: una fila por
 * proyecto, con miniatura, contexto, stack y si el código es público.
 */
export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang).projects
  const projects = getProjects(lang)

  return (
    <div className="mx-auto max-w-[92rem] px-5 pt-12 pb-24 sm:px-8">
      <header className="border-t border-ink pt-6">
        <h1 className="plot-title text-[clamp(2.5rem,7vw,4.5rem)]">{t.allTitle}</h1>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">{t.allLead}</p>
      </header>

      <ul className="mt-14 border-t border-rule">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-rule">
            <Link
              href={`/${lang}/projects/${project.slug}`}
              className="group grid gap-5 py-6 transition-colors duration-200 hover:bg-sheet-raised sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-8 sm:px-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden border border-rule bg-sheet-sunk">
                <ProjectCover
                  project={project}
                  sizes="(max-width: 640px) 100vw, 12rem"
                  decorative
                  compact
                  schematicLabel={t.schematic}
                />
              </div>

              <div className="min-w-0">
                <h2 className="plot-heading text-xl text-ink transition-colors group-hover:text-mark">
                  {project.title}
                </h2>
                <p className="annot mt-1.5 text-ink-faint">
                  {formatPeriod(project.from, project.to, lang, t.present)} · {project.context}
                </p>
                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-soft">{project.summary}</p>
                <p className="annot mt-3 text-ink-faint">{project.tech.join(" · ")}</p>
              </div>

              <span className="flex items-center gap-3 justify-self-start sm:justify-self-end">
                <span className="annot text-ink-faint">{project.github ? t.hasCode : t.privateCode}</span>
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
