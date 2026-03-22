import { projects } from "@/data/projects"
import ProjectCard from "@/components/projects/ProjectCard"

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-10">
        Proyectos
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            tech={project.tech}
            github={project.github}
            slug={project.slug}
            image={project.image}
          />
        ))}

      </div>

    </main>
  )
}