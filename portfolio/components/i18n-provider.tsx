"use client"

import { createContext, useContext } from "react"

import { getDict, type Dict, type Lang } from "@/lib/i18n"

const I18nContext = createContext<{ lang: Lang; t: Dict } | null>(null)

/**
 * Lleva el idioma de la ruta a los componentes de cliente (barra, riel,
 * consola, formulario). Los de servidor lo reciben por props desde la página.
 */
export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ lang, t: getDict(lang) }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error("useI18n fuera de <I18nProvider>")
  return value
}
