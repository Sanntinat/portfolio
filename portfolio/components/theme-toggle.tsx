"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

/**
 * Alterna entre la hoja de plano y el cianotipo. Reserva su espacio antes de
 * montar para que la barra no salte al hidratar.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Usar tema claro" : "Usar tema oscuro") : "Cambiar tema"}
      className="flex size-9 items-center justify-center border border-rule text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
    >
      {mounted ? (
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
