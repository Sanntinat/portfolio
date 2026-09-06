export const CONSOLE_EVENT = "plano:console"

/** Abre la consola desde cualquier punto del sitio. */
export function openConsole() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(CONSOLE_EVENT))
}
