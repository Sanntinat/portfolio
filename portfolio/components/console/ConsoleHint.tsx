"use client"

import { openConsole } from "@/lib/console-bus"
import { useIsClient } from "@/lib/client-hooks"

/**
 * Invitación a la consola. Muestra el atajo real de la plataforma, así que
 * espera a estar en el cliente antes de decidir entre ⌘K y Ctrl+K.
 */
export default function ConsoleHint() {
  const isClient = useIsClient()

  const shortcut = !isClient
    ? "/"
    : /mac|iphone|ipad/i.test(navigator.userAgent)
      ? "⌘K"
      : "Ctrl+K"

  return (
    <button
      type="button"
      onClick={openConsole}
      className="group mt-7 flex w-full max-w-md items-center gap-3 border border-rule bg-sheet-raised px-4 py-3 text-left transition-colors duration-200 hover:border-ink"
    >
      <span aria-hidden className="annot text-mark">
        &gt;
      </span>

      <span className="annot flex-1 text-ink-soft transition-colors group-hover:text-ink">
        Abrir la consola para navegar el sitio
      </span>

      <kbd className="annot border border-rule px-1.5 py-0.5 text-ink-faint">
        {shortcut}
      </kbd>
    </button>
  )
}
