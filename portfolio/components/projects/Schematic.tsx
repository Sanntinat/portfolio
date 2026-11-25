import type { Project } from "@/data/projects"

/**
 * Esquema por capas de un proyecto sin capturas publicadas: cada columna es
 * una capa y las flechas marcan hacia dónde va el dato. Es lo que dibujaría
 * alguien en un pizarrón para explicar cómo está armado, no un decorado.
 */
export default function Schematic({
  layers,
  label,
  compact = false,
}: {
  layers: NonNullable<Project["schematic"]>
  label: string
  compact?: boolean
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${layers.map((l) => `${l.title} (${l.nodes.join(", ")})`).join(" → ")}`}
      className={`flex h-full w-full ${
        compact ? "flex-row items-stretch p-4" : "flex-col p-5 sm:flex-row sm:items-stretch sm:p-8"
      }`}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.title}
          className={`flex min-w-0 flex-1 ${compact ? "flex-row items-center" : "flex-col sm:flex-row sm:items-center"}`}
        >
          <div className="flex h-full min-w-0 flex-1 flex-col justify-center">
            <p
              className={`annot border-b border-ink pb-1.5 text-ink-soft ${
                compact ? "min-h-[2.4em] text-[0.6rem] leading-tight" : ""
              }`}
            >
              {layer.title}
            </p>
            <ul className={`mt-2.5 flex ${compact ? "flex-col gap-1.5" : "flex-row flex-wrap gap-2 sm:flex-col"}`}>
              {layer.nodes.map((node) => (
                <li
                  key={node}
                  className={`border border-rule bg-sheet text-ink ${
                    compact ? "px-1.5 py-1 text-[0.62rem] leading-tight" : "px-2.5 py-2 text-xs leading-snug sm:text-sm"
                  }`}
                >
                  {node}
                </li>
              ))}
            </ul>
          </div>

          {index < layers.length - 1 && (
            <svg
              aria-hidden
              viewBox="0 0 24 10"
              className={`shrink-0 text-mark ${
                compact ? "mx-1 w-4" : "my-3 w-6 rotate-90 self-start sm:mx-3 sm:my-0 sm:rotate-0 sm:self-auto"
              }`}
            >
              <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M17 2 L22 5 L17 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
