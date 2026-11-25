import RouteFigure from "@/components/experience/RouteFigure"
import SectionHead from "@/components/layout/SectionHead"
import { formatPeriod } from "@/data/projects"
import { getProfile } from "@/data/profile"
import { getDict, type Lang } from "@/lib/i18n"

/**
 * La práctica en GIDAS. HIDRAGIS es privado, así que en lugar de capturas va
 * la lámina del ruteo de evacuación, que muestra qué resuelve el sistema.
 */
export default function Experience({ lang }: { lang: Lang }) {
  const dict = getDict(lang)
  const t = dict.experience
  const xp = getProfile(lang).experience

  return (
    <section id="experiencia" className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8">
      <SectionHead sectionRef="B" title={t.title} />

      <div className="mt-12 grid gap-14 *:min-w-0 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        <div>
          <header className="border-b border-rule pb-6">
            <h3 className="plot-heading text-[clamp(1.35rem,2.4vw,1.75rem)] text-ink">{xp.role}</h3>
            <p className="mt-2 text-ink-soft">{xp.org}</p>
          </header>

          <p className="measure mt-6 text-lg leading-relaxed text-ink">{xp.intro}</p>

          <h4 className="annot mt-10 border-b border-ink pb-2 text-ink-soft">{t.whatIDid}</h4>
          <ul>
            {xp.highlights.map((item) => (
              <li key={item} className="flex gap-4 border-b border-rule-soft py-3.5 leading-relaxed text-ink">
                <span aria-hidden className="mt-3 w-4 shrink-0 border-t border-mark" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <RouteFigure
            aria={t.figureAria}
            caption={t.figureCaption}
            legendRoute={t.figureLegendRoute}
            legendExcluded={t.figureLegendExcluded}
            resident={t.figureResident}
            shelter={t.figureShelter}
            label={t.figureLabel}
            name={t.figureName}
          />

          <dl className="border border-rule bg-sheet-raised">
            <Row field={t.period} value={formatPeriod(xp.from, xp.to, lang, dict.projects.present)} />
            <Row field={t.team} value={xp.team} />
            <Row field={t.stack} value={xp.tech.join(" · ")} />
            <Row field={t.code} value={<span className="text-ink-soft">{t.privateRepo}</span>} />
          </dl>
        </div>
      </div>
    </section>
  )
}

function Row({ field, value }: { field: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-rule-soft px-4 py-3.5 last:border-b-0">
      <dt className="annot text-ink-faint">{field}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  )
}
