import Image from "next/image"

import Schematic from "@/components/projects/Schematic"
import type { Project } from "@/data/projects"

/**
 * La imagen principal de un proyecto: su primera captura o, si no tiene
 * capturas publicadas, su esquema por capas. Ocupa la caja que le da el
 * contenedor (que define la proporción).
 */
export default function ProjectCover({
  project,
  sizes,
  priority = false,
  decorative = false,
  compact = false,
  schematicLabel,
}: {
  project: Project
  sizes: string
  priority?: boolean
  decorative?: boolean
  compact?: boolean
  schematicLabel: string
}) {
  const shot = project.shots[0]

  if (shot) {
    return (
      <Image
        src={shot.src}
        alt={decorative ? "" : shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={shot.fit === "contain" ? "object-contain p-3" : "object-cover object-left-top"}
      />
    )
  }

  if (project.schematic) {
    return decorative ? (
      <div aria-hidden className="h-full">
        <Schematic layers={project.schematic} label={schematicLabel} compact={compact} />
      </div>
    ) : (
      <Schematic layers={project.schematic} label={schematicLabel} compact={compact} />
    )
  }

  return null
}
