import type { Metadata, Viewport } from "next"
import { Archivo, Azeret_Mono } from "next/font/google"

import Navbar from "@/components/layout/Navbar"
import SheetFooter from "@/components/layout/SheetFooter"
import SheetRail from "@/components/layout/SheetRail"
import { ThemeProvider } from "@/components/theme-provider"
import Background from "@/components/ui/background"
import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL("https://santiagonatalichio.dev"),
  title: {
    default: "Santiago Natalichio — Ingeniería en Sistemas",
    template: "%s · Santiago Natalichio",
  },
  description:
    "Estudiante avanzado de Ingeniería en Sistemas en La Plata. Construyo aplicaciones completas con Django, React y PostgreSQL: del modelo de datos a la interfaz.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Santiago Natalichio — Ingeniería en Sistemas",
    description:
      "Aplicaciones completas con Django, React y PostgreSQL. Del modelo de datos a la interfaz.",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e6df" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1a28" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${azeret.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-sheet text-ink antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Background />
          <SheetRail />

          <a
            href="#contenido"
            className="annot sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-ink focus:bg-sheet-raised focus:px-3 focus:py-2 focus:text-ink"
          >
            Saltar al contenido
          </a>

          <div className="flex min-h-screen flex-col lg:pl-14">
            <Navbar />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <SheetFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
