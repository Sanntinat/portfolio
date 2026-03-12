import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type ProjectCardProps = {
  title: string
  description: string
  tech: string[]
  github: string
  slug: string
}

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  slug,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
  <Card className="hover:shadow-lg transition cursor-pointer">
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <Button asChild>
          <a href={github} target="_blank">
            Ver código
          </a>
        </Button>
      </CardContent>
    </Card>
  </Card>
  </Link>
  )
}