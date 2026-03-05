import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-3xl space-y-6">
        <Badge variant="secondary">
          Ingeniero en Sistemas en formación
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight">
          Hola, soy Santiago Natalichio
        </h1>

        <p className="text-lg text-muted-foreground">
          Desarrollador fullstack enfocado en backend con experiencia en
          Django, React y arquitectura de aplicaciones escalables.
        </p>

        <div className="flex gap-4">
          <Button size="lg">Ver proyectos</Button>
          <Button size="lg" variant="outline">
            Contactarme
          </Button>
        </div>
      </div>
    </section>
  )
}