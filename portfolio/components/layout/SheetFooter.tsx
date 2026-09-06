import Link from "next/link"

import { CONTACT, SECTIONS } from "@/lib/sections"

const YEAR = new Date().getFullYear()

/**
 * Cajetín de cierre de la lámina. Los campos son los que llevaría un plano
 * real: quién lo dibujó, dónde, cómo se lo contacta y qué contiene.
 */
export default function SheetFooter() {
  return (
    <footer className="border-t border-rule bg-sheet-raised">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <dl className="grid grid-cols-2 border-x border-rule lg:grid-cols-4">
          <Field label="Autor" className="border-b lg:border-b-0">
            Santiago Natalichio
          </Field>

          <Field
            label="Ubicación"
            className="border-b border-l lg:border-b-0"
          >
            La Plata, AR
            <span className="annot mt-1 block text-ink-faint">
              {CONTACT.coords}
            </span>
          </Field>

          <Field label="Contacto" className="lg:border-l">
            <a
              href={`mailto:${CONTACT.email}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
            >
              {CONTACT.email}
            </a>
          </Field>

          <Field label="Contenido" className="border-l">
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`/#${section.id}`}
                  className="transition-colors hover:text-mark"
                >
                  {section.label}
                </Link>
              ))}
            </span>
          </Field>
        </dl>

        <div className="flex flex-wrap items-baseline justify-between gap-3 border-x border-t border-rule px-4 py-3">
          <span className="annot text-ink-faint">
            Construido con Next.js y Tailwind · {YEAR}
          </span>
          <span className="annot text-ink-faint">
            Hecho en La Plata
          </span>
        </div>
      </div>

      <div className="h-8" />
    </footer>
  )
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`border-rule px-4 py-5 ${className}`}>
      <dt className="annot mb-2 text-ink-faint">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  )
}
