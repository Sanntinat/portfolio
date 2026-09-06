"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { useIsClient } from "@/lib/client-hooks"

/**
 * Alterna entre la hoja de plano y el cianotipo. Reserva su espacio antes de
 * conocer el tema para que la barra no salte al hidratar.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isClient = useIsClient()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isClient
          ? isDark
            ? "Usar tema claro"
            : "Usar tema oscuro"
          : "Cambiar tema"
      }
      className="flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
    >
      {isClient ? (
        isDark ? (
          <Moon className="size-4" strokeWidth={1.5} />
        ) : (
          <Sun className="size-4" strokeWidth={1.5} />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  )
}
