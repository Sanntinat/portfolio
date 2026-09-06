import { ArrowRight, MapPin } from "lucide-react"

import TrazaLaPlata from "@/components/hero/TrazaLaPlata"
import ConsoleHint from "@/components/console/ConsoleHint"
import { ActionAnchor, ActionLink } from "@/components/ui/action"
import { CONTACT } from "@/lib/sections"

export default function Hero() {
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

          <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink sm:text-xl">
            Estudiante avanzado de Ingeniería en Sistemas de Información.
            Construyo aplicaciones completas: modelo de datos, API e interfaz.
          </p>

          <p className="measure mt-4 text-base leading-relaxed text-ink-soft">
            Trabajo con Django, React y PostgreSQL. Me interesa entrar en un
            equipo donde el trabajo llegue a producción y lo use alguien.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink href="#proyectos" variant="solid">
              Ver proyectos
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/action:translate-x-1"
                strokeWidth={1.5}
              />
            </ActionLink>

            <ActionAnchor href={`mailto:${CONTACT.email}`}>
              Escribirme
            </ActionAnchor>
          </div>

          <ConsoleHint />

          <p className="annot mt-10 flex items-center gap-2 text-ink-faint">
            <MapPin className="size-3.5" strokeWidth={1.5} />
            {CONTACT.location}
          </p>
        </div>

        <TrazaLaPlata />
      </div>
    </section>
  )
}
