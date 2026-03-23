"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Sobre mí" },
  { href: "/contact", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-8 z-50 flex justify-center">
      <div
        className={`
          transition-all duration-300

          ${scrolled
            ? "h-16 px-8 rounded-2xl bg-background/80 backdrop-blur-xl shadow-md"
            : "h-20 px-10 rounded-full bg-background/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          }

          w-[95%] max-w-7xl
          flex items-center justify-between
          border border-border/40
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl font-semibold tracking-tight
            hover:opacity-80 transition
          "
        >
          Santiago.dev
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-10 text-lg font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span
                  className={`transition ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  } group-hover:text-foreground`}
                >
                  {link.label}
                </span>

                {/* underline animado */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] w-full
                    origin-left scale-x-0
                    bg-primary
                    transition-transform duration-300
                    group-hover:scale-x-100
                    ${isActive ? "scale-x-100" : ""}
                  `}
                />
              </Link>
            )
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-5">

          <ThemeToggle />

          <Button
            variant="outline"
            className="
              flex items-center gap-2
              px-5 py-2.5
              text-base

              rounded-full

              transition-all duration-300
              hover:scale-105
              hover:bg-primary
              hover:text-primary-foreground
              hover:shadow-lg

              relative overflow-hidden
            "
          >
            <FileText size={18} />
            CV

            <span className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition" />
          </Button>

        </div>
      </div>
    </header>
  )
}