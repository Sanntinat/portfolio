"use client"

import { useId, useState, type FormEvent } from "react"
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react"

import SectionHead from "@/components/layout/SectionHead"
import { actionClass } from "@/components/ui/action"
import { CONTACT } from "@/lib/sections"

type Errors = { name?: string; email?: string; message?: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: { name: string; email: string; message: string }) {
  const errors: Errors = {}

  if (!values.name.trim()) {
    errors.name = "Falta tu nombre."
  }

  if (!values.email.trim()) {
    errors.email = "Falta tu email para poder responderte."
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Ese email no tiene un formato válido. Revisá la arroba y el dominio."
  }

  if (values.message.trim().length < 10) {
    errors.message = "Contame un poco más: al menos diez caracteres."
  }

  return errors
}

export default function Contact() {
  const ids = useId()

  const [values, setValues] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const set = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setSent(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const subject = `Contacto desde el portfolio — ${values.name.trim()}`
    const body = [
      values.message.trim(),
      "",
      "—",
      values.name.trim(),
      values.email.trim(),
    ].join("\n")

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      id="contacto"
      className="mx-auto max-w-[92rem] scroll-mt-14 px-5 py-24 sm:px-8"
    >
      <SectionHead
        sectionRef="D"
        title="Si estás buscando a alguien, escribime."
        lead="Estoy abierto a pasantías y posiciones junior. Respondo todos los mensajes."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <dl className="border-t border-rule">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">Email</dt>
              <dd className="flex items-center gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
                >
                  {CONTACT.email}
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copiar la dirección de email"
                  className="flex size-7 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {copied ? (
                    <Check className="size-3.5 text-mark" strokeWidth={1.5} />
                  ) : (
                    <Copy className="size-3.5" strokeWidth={1.5} />
                  )}
                </button>

                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? "Dirección copiada." : ""}
                </span>
              </dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">Ubicación</dt>
              <dd className="text-ink">{CONTACT.location}</dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">Coordenadas</dt>
              <dd className="annot text-ink tabular-nums">{CONTACT.coords}</dd>
            </div>
          </dl>

          {(CONTACT.github || CONTACT.linkedin) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {CONTACT.github && (
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className={actionClass()}>
                  <Github className="size-4" strokeWidth={1.5} />
                  GitHub
                </a>
              )}

              {CONTACT.linkedin && (
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={actionClass()}>
                  <Linkedin className="size-4" strokeWidth={1.5} />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-rule bg-sheet-raised"
        >
          <h3 className="annot border-b border-rule px-5 py-3 text-ink-soft">
            Mensaje
          </h3>

          <div className="space-y-5 px-5 py-6">
            <Field
              id={`${ids}-name`}
              label="Nombre"
              value={values.name}
              onChange={set("name")}
              error={errors.name}
              autoComplete="name"
              placeholder="Cómo te llamás"
            />

            <Field
              id={`${ids}-email`}
              label="Email"
              type="email"
              value={values.email}
              onChange={set("email")}
              error={errors.email}
              autoComplete="email"
              placeholder="A dónde te respondo"
            />

            <Field
              id={`${ids}-message`}
              label="Mensaje"
              multiline
              value={values.message}
              onChange={set("message")}
              error={errors.message}
              placeholder="Qué necesitás y para cuándo"
            />

            <button type="submit" className={`${actionClass("solid")} w-full justify-center`}>
              <Mail className="size-4" strokeWidth={1.5} />
              Abrir el mensaje en tu correo
            </button>

            <p role="status" aria-live="polite" className="annot leading-5 text-ink-faint">
              {sent
                ? "Se abrió tu programa de correo con el mensaje listo. Todavía tenés que enviarlo desde ahí."
                : "El formulario prepara el mensaje en tu propio correo: nada se envía desde este sitio."}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  multiline = false,
  ...rest
}: {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  multiline?: boolean
  type?: string
  autoComplete?: string
  placeholder?: string
}) {
  const control =
    "w-full border bg-sheet px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"

  return (
    <div>
      <label htmlFor={id} className="annot mb-2 block text-ink-soft">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={5}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${control} resize-y ${error ? "border-mark" : "border-rule"}`}
          {...rest}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${control} ${error ? "border-mark" : "border-rule"}`}
          {...rest}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="annot mt-2 leading-5 text-mark">
          {error}
        </p>
      )}
    </div>
  )
}
