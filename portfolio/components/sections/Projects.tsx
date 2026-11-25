import SectionHead from "@/components/layout/SectionHead"
import ProjectIndex from "@/components/projects/ProjectIndex"
import { getProjects } from "@/data/projects"
import { getDict, type Lang } from "@/lib/i18n"

export default function ProjectsSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).projects
  const projects = getProjects(lang)

  return (
    <section id="proyectos" className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8">
      <SectionHead
        sectionRef="C"
        title={t.title}
        lead={t.lead}
        aside={<span className="annot text-ink-faint tabular-nums">{t.count(projects.length)}</span>}
      />

      <div className="mt-12">
        <ProjectIndex projects={projects} />
      </div>
    </section>
  )
}
