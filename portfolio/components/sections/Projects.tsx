import { projects } from "@/data/projects"
import ProjectCard from "@/components/projects/ProjectCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto scroll-mt-32 px-6 py-24">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
            Proyectos
          </span>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Algunos trabajos donde junté lógica, diseño y ejecución.
          </h2>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Esta selección resume el tipo de productos que me interesa construir: interfaces claras,
            flujo simple y una base técnica que escale.
          </p>
        </div>

        <Button asChild variant="outline" className="w-fit rounded-full px-5">
          <Link href="/projects">Ver todos</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            tech={project.tech}
            slug={project.slug}
            image={project.image}
          />
        ))}
      </div>
    </section>
  )
}