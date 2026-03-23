import Navbar from "@/components/layout/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Background from "@/components/ui/background"
import "./globals.css"

export const metadata = {
  title: "Santiago Natalichio | Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <Background />

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