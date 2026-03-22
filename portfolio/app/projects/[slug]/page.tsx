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
  <main className="container mx-auto px-6 py-20 max-w-4xl">

    <h1 className="text-4xl font-bold mb-4">
      {project.title}
    </h1>

    <p className="text-lg text-muted-foreground mb-10">
      {project.description}
    </p>

    {/* STACK */}

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Stack Tecnológico
      </h2>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </section>

    {/* FEATURES */}

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Funcionalidades
      </h2>

      <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>

    {/* ARQUITECTURA */}

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Arquitectura
      </h2>

      <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
        {project.architecture.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>

    {/* LINKS */}

    <div className="flex gap-4 mt-10">

      <Button asChild>
        <a href={project.github} target="_blank">
          Ver código
        </a>
      </Button>

      {project.demo && (
        <Button variant="outline" asChild>
          <a href={project.demo} target="_blank">
            Ver demo
          </a>
        </Button>
      )}

    </div>

  </main>
)
}