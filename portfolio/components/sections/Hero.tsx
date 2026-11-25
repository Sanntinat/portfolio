import { ArrowRight, FileText, MapPin } from "lucide-react"

import ConsoleHint from "@/components/console/ConsoleHint"
import TrazaLaPlata from "@/components/hero/TrazaLaPlata"
import { ActionAnchor, ActionLink } from "@/components/ui/action"
import { getDict, type Lang } from "@/lib/i18n"
import { CONTACT, RESUME } from "@/lib/sections"

export default function Hero({ lang }: { lang: Lang }) {
  const dict = getDict(lang)
  const t = dict.hero

  return (
    <section
      id="inicio"
      className="mx-auto max-w-[92rem] scroll-mt-14 px-5 pt-16 pb-24 sm:px-8 sm:pt-24 lg:pt-28"
    >
      <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <h1 className="plot-title text-[clamp(3rem,11vw,6rem)]">
            Santiago
            <br />
            Natalichio
          </h1>

          <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink sm:text-xl">{t.lead}</p>

          <p className="measure mt-4 text-base leading-relaxed text-ink-soft">{t.body}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink href={`/${lang}#proyectos`} variant="solid">
              {t.seeProjects}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/action:translate-x-1"
                strokeWidth={1.5}
              />
            </ActionLink>

            <ActionAnchor href={RESUME[lang]} external>
              <FileText className="size-4" strokeWidth={1.5} />
              {t.downloadResume}
            </ActionAnchor>

            <ActionAnchor href={`mailto:${CONTACT.email}`}>{t.writeMe}</ActionAnchor>
          </div>

          <ConsoleHint />

          <p className="annot mt-10 flex items-center gap-2 text-ink-faint">
            <MapPin className="size-3.5" strokeWidth={1.5} />
            {CONTACT.location}
          </p>
        </div>

        <TrazaLaPlata
          label={t.plateLabel}
          side={t.plateSide}
          caption={t.plateCaption}
          locale={dict.locale}
        />
      </div>
    </section>
  )
}
