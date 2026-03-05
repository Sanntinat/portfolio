import "./globals.css"
import  Navbar   from "@/components/layout/Navbar"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Santiago Natalichio | Portfolio",
  description: "Portfolio de desarrollador fullstack",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </ThemeProvider>
      </body>
    </html>
  )
}