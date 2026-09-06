/**
 * Encabezado de sección: la referencia de grilla a la izquierda, sobre la
 * misma regla que abre la sección. La referencia es la misma que muestra el
 * riel lateral, así que dice dónde estás en el pliego; no es un rótulo
 * decorativo por encima del título.
 */
export default function SectionHead({
  sectionRef,
  title,
  lead,
  aside,
}: {
  sectionRef: string
  title: string
  lead?: string
  aside?: React.ReactNode
}) {
  return (
    <div className="border-t border-ink pt-5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-5 sm:gap-8">
          <span aria-hidden className="annot pt-2 text-mark">
            {sectionRef}
          </span>

          <div>
            <h2 className="plot-heading max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.75rem)] text-ink">
              {title}
            </h2>

            {lead && (
              <p className="measure mt-5 text-base leading-relaxed text-ink-soft">
                {lead}
              </p>
            )}
          </div>
        </div>

        {aside && <div className="shrink-0 sm:pt-2">{aside}</div>}
      </div>
    </div>
  )
}
