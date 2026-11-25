import { notFound } from "next/navigation"

import Contact from "@/components/sections/Contact"
import Experience from "@/components/sections/Experience"
import Hero from "@/components/sections/Hero"
import Profile from "@/components/sections/Profile"
import ProjectsSection from "@/components/sections/Projects"
import { isLang } from "@/lib/i18n"

/**
 * Las cinco secciones del pliego, en orden A–E. El landmark <main> lo pone el
 * layout: si la portada abriera otro, el documento tendría dos y el salto al
 * contenido dejaría de ser un destino único.
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <>
      <Hero lang={lang} />
      <Experience lang={lang} />
      <ProjectsSection lang={lang} />
      <Profile lang={lang} />
      <Contact />
    </>
  )
}
