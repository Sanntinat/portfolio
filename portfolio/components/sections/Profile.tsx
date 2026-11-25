import SectionHead from "@/components/layout/SectionHead"
import { getProfile } from "@/data/profile"
import { getDict, type Lang } from "@/lib/i18n"

/**
 * El recorrido con el que Santiago construye una funcionalidad. Es una
 * secuencia real —el modelo de datos precede a la API, que precede a la
 * interfaz, y las pruebas van con cada parte—, así que se dibuja numerada y
 * encadenada, como un esquema. Al costado, el cuadro de referencias de la
 * lámina: formación, idiomas y stack.
 */
export default function Profile({ lang }: { lang: Lang }) {
  const t = getDict(lang).profile
  const profile = getProfile(lang)

  return (
    <section id="perfil" className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8">
      <SectionHead sectionRef="D" title={t.title} />

      <div className="mt-12 grid gap-16 *:min-w-0 lg:grid-cols-[1fr_24rem] lg:gap-20">
        <div>
          <p className="measure text-lg leading-relaxed text-ink">{t.lead}</p>

          <ol className="mt-12 border-t border-rule">
            {profile.pipeline.map((step, index) => (
              <li
                key={step.stage}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-rule py-6 sm:grid-cols-[2.5rem_10rem_1fr] sm:gap-x-8"
              >
                <span aria-hidden className="annot text-mark">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="plot-heading text-xl text-ink">{step.stage}</h3>

                <div className="col-start-2 sm:col-start-3">
                  <p className="max-w-[52ch] text-ink-soft">{step.detail}</p>
                  <p className="annot mt-2 text-ink-faint">{step.tool}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Cuadro de referencias de la lámina. */}
        <div className="self-start border border-rule bg-sheet-raised">
          <h3 className="annot border-b border-rule px-4 py-3 text-ink-soft">{t.references}</h3>

          <dl>
            <Group label={t.education}>
              {profile.education.map((item) => (
                <div key={item.title} className="mt-1.5 first:mt-0">
                  <span className="block text-ink">{item.title}</span>
                  <span className="annot text-ink-faint">{item.where}</span>
                </div>
              ))}
            </Group>

            <Group label={t.languages}>
              {profile.languages.map((item) => (
                <span key={item} className="block">
                  {item}
                </span>
              ))}
            </Group>

            {profile.skills.map((skill) => (
              <Group key={skill.label} label={skill.label}>
                {skill.value}
              </Group>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-rule-soft px-4 py-4 last:border-b-0">
      <dt className="annot text-ink-faint">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  )
}
