import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type ProjectCardProps = {
  title: string
  description: string
  tech: string[]
  github: string
  slug: string
  image: string
}

export default function ProjectCard({
  title,
  description,
  tech,
  slug,
  image,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="group overflow-hidden border hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full">

        {/* Imagen preview */}
        <div className="relative aspect-video overflow-hidden">
          {image && (
            <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />)}

          {/* overlay sutil */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
        </div>

        <CardHeader>
          <CardTitle className="text-xl">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 space-y-4">

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

        </CardContent>

      </Card>
    </Link>
  )
}