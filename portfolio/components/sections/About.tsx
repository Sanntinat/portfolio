import SectionHead from "@/components/layout/SectionHead"

/**
 * El recorrido que Santiago dice seguir para construir una aplicación. Es una
 * secuencia real —el modelo de datos precede a la API, que precede a la
 * interfaz—, así que se dibuja numerada y encadenada, como un esquema.
 */
const pipeline = [
  {
    stage: "Modelo de datos",
    detail:
      "Qué entidades existen, cómo se relacionan y qué tiene que ser cierto siempre.",
    tool: "PostgreSQL",
  },
  {
    stage: "API",
    detail:
      "Endpoints REST con permisos y roles, y una respuesta previsible para cada caso.",
    tool: "Django REST Framework",
  },
  {
    stage: "Interfaz",
    detail:
      "Pantallas que dejan claro el estado del sistema, incluso cuando algo falla.",
    tool: "React · Next.js",
  },
]

const spec = [
  { field: "Formación", value: "Ingeniería en Sistemas de Información, en curso" },
  { field: "Base de datos", value: "PostgreSQL · modelado relacional" },
  { field: "Servidor", value: "Django · Django REST Framework" },
  { field: "Interfaz", value: "React · Next.js · TypeScript · Tailwind CSS" },
  { field: "Mobile", value: "React Native · Expo" },
  { field: "Herramientas", value: "Git · Postman" },
]

export default function About() {
  return (
    <section
      id="perfil"
      className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8"
    >
      <SectionHead
        sectionRef="B"
        title="Empiezo por el modelo de datos, no por la pantalla."
      />

      <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_22rem] lg:gap-20">
        <div>
          <p className="measure text-lg leading-relaxed text-ink">
            Estudio ingeniería en sistemas, así que arranco preguntando qué
            entidades existen y cómo se relacionan. Recién después escribo la API
            y la interfaz. Es más lento al principio, y evita tener que reescribir
            todo a mitad de camino.
          </p>

          <ol className="mt-12 border-t border-rule">
            {pipeline.map((step, index) => (
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
        <div className="border border-rule bg-sheet-raised">
          <h3 className="annot border-b border-rule px-4 py-3 text-ink-soft">
            Referencias
          </h3>

          <dl>
            {spec.map((row) => (
              <div key={row.field} className="border-b border-rule-soft px-4 py-4 last:border-b-0">
                <dt className="annot text-ink-faint">{row.field}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
