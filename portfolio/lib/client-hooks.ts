"use client"

import { useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

/**
 * `false` durante el render del servidor y la hidratación, `true` después.
 * Sirve para el contenido que sólo se puede decidir en el cliente sin
 * provocar un desajuste de hidratación.
 */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

/** `true` cuando la página se desplazó más allá del umbral indicado. */
export function useScrolledPast(threshold = 8) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false
  )
}
