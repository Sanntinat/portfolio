"use client"

import { useEffect, useState } from "react"

/**
 * Devuelve el id de la sección que ocupa la banda de lectura del viewport.
 * Se calcula por scroll en vez de con IntersectionObserver porque las secciones
 * tienen alturas muy distintas y el observer entrega la más visible, no la que
 * la persona está leyendo.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "")

  useEffect(() => {
    if (ids.length === 0) return

    let frame = 0

    const measure = () => {
      frame = 0

      // Línea de lectura: un tercio por debajo del borde superior.
      const line = window.scrollY + window.innerHeight * 0.34
      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= line) current = id
      }

      // El final del documento siempre pertenece a la última sección.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4

      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}

/** Progreso de lectura del documento, de 0 a 1. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable <= 0 ? 0 : window.scrollY / scrollable)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return progress
}
