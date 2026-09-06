import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import ProjectsSection from "@/components/sections/Projects"
import Contact from "@/components/sections/Contact"

/**
 * Las cuatro secciones del pliego, en orden A–D. El landmark <main> lo pone el
 * layout: si la portada abriera otro, el documento tendría dos y el salto al
 * contenido dejaría de ser un destino único.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Contact />
    </>
  )
}