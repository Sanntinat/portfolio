import Link from "next/link"

import { getDict, type Lang } from "@/lib/i18n"
import { CONTACT, SECTIONS } from "@/lib/sections"

const YEAR = new Date().getFullYear()

/**
 * Cajetín de cierre de la lámina. Los campos son los que llevaría un plano
 * real: quién lo dibujó, dónde, cómo se lo contacta y qué contiene.
 */
export default function SheetFooter({ lang }: { lang: Lang }) {
  const t = getDict(lang)

  return (
    <footer className="border-t border-rule bg-sheet-raised">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <dl className="grid grid-cols-2 border-x border-rule lg:grid-cols-4">
          <Field label={t.footer.author} className="border-b lg:border-b-0">
            Santiago Natalichio
          </Field>

          <Field
            label={t.footer.location}
            className="border-b border-l lg:border-b-0"
          >
            {CONTACT.locationShort}
            <span className="annot mt-1 block text-ink-faint">
              {CONTACT.coords[lang]}
            </span>
          </Field>

          <Field label={t.footer.contact} className="lg:border-l">
            <a
              href={`mailto:${CONTACT.email}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
            >
              {CONTACT.email}
            </a>
          </Field>

          <Field label={t.footer.contents} className="border-l">
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`/${lang}#${section.id}`}
                  className="transition-colors hover:text-mark"
                >
                  {t.sections[section.id]}
                </Link>
              ))}
            </span>
          </Field>
        </dl>

        <div className="flex flex-wrap items-baseline justify-between gap-3 border-x border-t border-rule px-4 py-3">
          <span className="annot text-ink-faint">
            {t.footer.built} · {YEAR}
          </span>
          <span className="annot text-ink-faint">
            {t.footer.madeIn}
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
