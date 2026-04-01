import { projects } from "@/data/projects"
import ProjectCard from "@/components/projects/ProjectCard"

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-16 sm:py-20">

      <div className="mb-10 max-w-3xl space-y-4">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
          Portfolio
        </span>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Proyectos
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Una selección de trabajos con foco en interfaz, estructura y ejecución.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

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

    </main>
  )
}