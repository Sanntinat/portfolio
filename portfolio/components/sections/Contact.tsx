"use client"

import { useId, useState, type FormEvent } from "react"
import { Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react"

import SectionHead from "@/components/layout/SectionHead"
import { actionClass } from "@/components/ui/action"
import { useI18n } from "@/components/i18n-provider"
import type { Dict } from "@/lib/i18n"
import { CONTACT, RESUME } from "@/lib/sections"

type Errors = { name?: string; email?: string; message?: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: { name: string; email: string; message: string }, e: Dict["contact"]["errors"]) {
  const errors: Errors = {}

  if (!values.name.trim()) {
    errors.name = e.name
  }

  if (!values.email.trim()) {
    errors.email = e.email
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = e.emailFormat
  }

  if (values.message.trim().length < 10) {
    errors.message = e.message
  }

  return errors
}

export default function Contact() {
  const { lang, t: dict } = useI18n()
  const t = dict.contact
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

    const found = validate(values, t.errors)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const subject = t.subject(values.name.trim())
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
        sectionRef="E"
        title={t.title}
        lead={t.lead}
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <dl className="border-t border-rule">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">{t.email}</dt>
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
                  aria-label={t.copyEmail}
                  className="flex size-7 items-center justify-center border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {copied ? (
                    <Check className="size-3.5 text-mark" strokeWidth={1.5} />
                  ) : (
                    <Copy className="size-3.5" strokeWidth={1.5} />
                  )}
                </button>

                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? t.copied : ""}
                </span>
              </dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">{t.location}</dt>
              <dd className="text-ink">{CONTACT.location}</dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">{t.coords}</dt>
              <dd className="annot text-ink tabular-nums">{CONTACT.coords[lang]}</dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
              <dt className="annot text-ink-faint">{t.resume}</dt>
              <dd className="flex items-center gap-4">
                {(["es", "en"] as const).map((l) => (
                  <a
                    key={l}
                    href={RESUME[l]}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
                  >
                    <FileText className="size-3.5" strokeWidth={1.5} />
                    {l === "es" ? t.resumeEs : t.resumeEn}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={actionClass()}>
              <Github className="size-4" strokeWidth={1.5} />
              GitHub
            </a>

            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={actionClass()}>
              <Linkedin className="size-4" strokeWidth={1.5} />
              LinkedIn
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-rule bg-sheet-raised"
        >
          <h3 className="annot border-b border-rule px-5 py-3 text-ink-soft">
            {t.message}
          </h3>

          <div className="space-y-5 px-5 py-6">
            <Field
              id={`${ids}-name`}
              label={t.name}
              value={values.name}
              onChange={set("name")}
              error={errors.name}
              autoComplete="name"
              placeholder={t.namePlaceholder}
            />

            <Field
              id={`${ids}-email`}
              label={t.email}
              type="email"
              value={values.email}
              onChange={set("email")}
              error={errors.email}
              autoComplete="email"
              placeholder={t.emailPlaceholder}
            />

            <Field
              id={`${ids}-message`}
              label={t.messageField}
              multiline
              value={values.message}
              onChange={set("message")}
              error={errors.message}
              placeholder={t.messagePlaceholder}
            />

            <button type="submit" className={`${actionClass("solid")} w-full justify-center`}>
              <Mail className="size-4" strokeWidth={1.5} />
              {t.submit}
            </button>

            <p role="status" aria-live="polite" className="annot leading-5 text-ink-faint">
              {sent ? t.sent : t.idle}
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
