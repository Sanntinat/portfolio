import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Archivo, Azeret_Mono } from "next/font/google"

import Console from "@/components/console/Console"
import { I18nProvider } from "@/components/i18n-provider"
import Navbar from "@/components/layout/Navbar"
import SheetFooter from "@/components/layout/SheetFooter"
import SheetRail from "@/components/layout/SheetRail"
import { ThemeProvider } from "@/components/theme-provider"
import Background from "@/components/ui/background"
import { LANGS, getDict, isLang } from "@/lib/i18n"
import { SITE_URL } from "@/lib/sections"
import "../globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
})

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-azeret",
})

/** Sólo /es y /en: cualquier otro primer segmento es un 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDict(lang)

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: "%s · Santiago Natalichio" },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      title: t.meta.title,
      description: t.meta.description,
    },
    // Sin esto X recorta la tarjeta a un cuadrado y se come el dibujo.
    twitter: { card: "summary_large_image" },
  }
}

export const viewport: Viewport = {
  // Con el teclado abierto, la ventana se achica en vez de taparse: la
  // consola mantiene el prompt y los comandos a la vista.
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e6df" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1a28" },
  ],
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)

  return (
    <html lang={lang} className={`${archivo.variable} ${azeret.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-sheet text-ink antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider lang={lang}>
            <Background />
            <SheetRail />

            <a
              href="#contenido"
              className="annot sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-ink focus:bg-sheet-raised focus:px-3 focus:py-2 focus:text-ink"
            >
              {t.skip}
            </a>

            <div className="flex min-h-screen flex-col lg:pl-14">
              <Navbar />
              <main id="contenido" className="flex-1">
                {children}
              </main>
              <SheetFooter lang={lang} />
            </div>

            <Console />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
