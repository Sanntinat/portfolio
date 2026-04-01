import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, Layers3, Sparkles } from "lucide-react"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

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
    <main className="container mx-auto px-6 py-8 sm:py-10 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="outline" className="w-fit rounded-full px-5">
          <Link href="/#projects">
            <ArrowLeft className="size-4" />
            Volver a proyectos
          </Link>
        </Button>

        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
          <Sparkles className="size-4 text-primary" />
          Proyecto destacado
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
              {project.tech.join(" · ")}
            </p>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </div>

          <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm">
            <div className="relative aspect-[16/9] bg-muted">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <Layers3 className="size-5 text-primary" />
                  <h2 className="text-xl font-semibold">Funcionalidades</h2>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <Github className="size-5 text-primary" />
                  <h2 className="text-xl font-semibold">Stack</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-xl font-semibold">Arquitectura</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {project.architecture.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/60 bg-background/60 p-4"
                  >
                    <p className="text-sm text-muted-foreground">0{index + 1}</p>
                    <p className="mt-1 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28">
          <Card className="border-border/60 bg-background/70 backdrop-blur-xl">
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Resumen</p>
                <h2 className="text-2xl font-semibold">Visión general del proyecto</h2>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Esta vista está pensada para que cada proyecto se lea como una ficha editorial,
                  con jerarquía clara y un peso visual consistente con el home.
                </p>
                <p>
                  Si querés, después puedo llevar este mismo lenguaje a las cards y a una galería de
                  imágenes más completa.
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border/60 bg-card/60 p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">Proyecto web</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Estado</span>
                  <span className="font-medium">Portfolio</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Enfoque</span>
                  <span className="font-medium">Diseño + técnica</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full px-5">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github className="size-4" />
                    Ver código
                  </a>
                </Button>

                {project.demo && (
                  <Button asChild variant="outline" className="rounded-full px-5">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" />
                      Ver demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}