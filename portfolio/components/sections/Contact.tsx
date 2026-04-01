"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, MessageSquare, Send } from "lucide-react"

const CONTACT_CONFIG = {
  email: "tu-email@dominio.com",
  githubUrl: "https://github.com/tu-usuario",
  linkedinUrl: "https://www.linkedin.com/in/tu-usuario/",
}

export default function Contact() {
  const [name, setName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = `Nuevo mensaje de ${name || "portfolio"}`
    const body = [
      `Nombre: ${name || "(sin nombre)"}`,
      `Email: ${senderEmail || "(sin email)"}`,
      "",
      "Mensaje:",
      message || "(sin mensaje)",
    ].join("\n")

    const mailto = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <section id="contact" className="container mx-auto scroll-mt-32 px-6 py-24 pb-32">
      <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm">
        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground">
              <MessageSquare className="size-4 text-primary" />
              Contacto
            </span>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Si tenés un proyecto, podemos convertirlo en algo sólido.
            </h2>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Escribime por el formulario o conectemos por redes. Todo queda configurable en un solo lugar.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full px-5">
                <a href={CONTACT_CONFIG.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>

              <Button asChild variant="outline" className="rounded-full px-5">
                <a href={CONTACT_CONFIG.linkedinUrl} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </Button>

              <Button asChild variant="outline" className="rounded-full px-5">
                <a href={`mailto:${CONTACT_CONFIG.email}`}>
                  <Mail className="size-4" />
                  {CONTACT_CONFIG.email}
                </a>
              </Button>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground backdrop-blur">
              <p className="font-medium text-foreground">Configuración rápida</p>
              <p className="mt-2">
                Editá el bloque <span className="font-semibold">CONTACT_CONFIG</span> para cambiar email, GitHub y LinkedIn.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-5 sm:p-6 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Enviar mensaje
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                Nombre
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-foreground outline-none transition focus:border-primary"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Email
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-foreground outline-none transition focus:border-primary"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm text-muted-foreground">
              Mensaje
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Contame sobre tu proyecto..."
                rows={6}
                className="w-full resize-none rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-foreground outline-none transition focus:border-primary"
              />
            </label>

            <Button type="submit" className="w-full rounded-full py-6 text-base">
              <Send className="size-4" />
              Enviar por email
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}