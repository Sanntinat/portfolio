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
      className="mx-auto flex max-w-[92rem] scroll-mt-14 items-center px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:min-h-[calc(100svh-3.5rem)] lg:py-10"
    >
      {/* En escritorio la portada entra entera en la primera pantalla: la
          lámina se achica con la altura de la ventana, no sólo con el ancho. */}
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <h1 className="plot-title text-[clamp(3rem,min(11vw,12svh),6rem)]">
            Santiago
            <br />
            Natalichio
          </h1>

          <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink sm:text-xl [@media(max-height:760px)]:mt-6">{t.lead}</p>

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

          <p className="annot mt-8 flex items-center gap-2 text-ink-faint">
            <MapPin className="size-3.5" strokeWidth={1.5} />
            {CONTACT.location}
          </p>
        </div>

        <div className="w-full lg:max-w-[calc(100svh-16rem)] lg:justify-self-end">
          <TrazaLaPlata
            label={t.plateLabel}
            side={t.plateSide}
            caption={t.plateCaption}
            locale={dict.locale}
            touchHint={t.plateTouchHint}
          />
        </div>
      </div>
    </section>
  )
}
