import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-4">
        {project.title}
      </h1>

      <p className="text-lg text-muted-foreground mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <Button asChild>
        <a href={project.github} target="_blank">
          Ver código en GitHub
        </a>
      </Button>

    </main>
  )
}