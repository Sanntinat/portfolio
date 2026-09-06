import SectionHead from "@/components/layout/SectionHead"
import ProjectIndex from "@/components/projects/ProjectIndex"
import { projects } from "@/data/projects"

export default function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8"
    >
      <SectionHead
        sectionRef="C"
        title="Tres aplicaciones construidas de punta a punta."
        lead="Cada una tiene su modelo de datos, su API y su interfaz. Entrá para ver cómo está construida."
        aside={
          <span className="annot text-ink-faint tabular-nums">
            {projects.length} proyectos
          </span>
        }
      />

      <div className="mt-12">
        <ProjectIndex projects={projects} />
      </div>
    </section>
  )
}
