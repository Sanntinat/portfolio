import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, GraduationCap, Rocket, Sparkles } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Formación",
    text: "Estudiante avanzado de Ingeniería en Sistemas de Información, con foco en bases sólidas y criterio técnico.",
  },
  {
    icon: Code2,
    title: "Stack",
    text: "Trabajo con React, Next.js, Django, PostgreSQL y herramientas modernas para construir productos claros y mantenibles.",
  },
  {
    icon: Rocket,
    title: "Objetivo",
    text: "Me interesa participar en proyectos reales donde pueda aportar valor, obtener conocimiento y mejorar la experiencia del usuario.",
  },
]

const skills = ["React", "Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind", "APIs REST", "UI systems"]

export default function About() {
  return (
    <section id="about" className="container mx-auto scroll-mt-32 px-6 py-24">
      <div className="mb-12 max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-4 text-primary" />
          Sobre mí
        </span>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Diseño productos con foco en claridad, estructura y buena experiencia.
        </h2>

        <p className="max-w-2xl text-lg text-muted-foreground">
          Me gusta construir interfaces limpias y sistemas con una base sólida. Busco que el frontend,
          la arquitectura y el detalle visual empujen en la misma dirección.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} className="border-border/60 bg-card/80 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border-border/60 bg-background/60 backdrop-blur-xl">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Perfil</p>
              <h3 className="text-2xl font-semibold">Construcción, criterio y entrega.</h3>
            </div>

            <div className="grid gap-3 rounded-3xl border border-border/60 bg-card/60 p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Enfoque</span>
                <span className="font-medium">Frontend + Backend</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Prioridad</span>
                <span className="font-medium">UX clara</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Meta</span>
                <span className="font-medium">Proyectos reales</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Tecnologías</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}