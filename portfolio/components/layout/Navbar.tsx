"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText, Menu, X } from "lucide-react"

const links = [
  { href: "/#hero", label: "Inicio", id: "hero" },
  { href: "/#about", label: "Sobre mí", id: "about" },
  { href: "/#projects", label: "Proyectos", id: "projects" },
  { href: "/#contact", label: "Contacto", id: "contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sectionIds = useMemo(() => links.map((link) => link.id), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const syncActiveFromRoute = () => {
      if (pathname.startsWith("/projects")) {
        setActiveSection("projects")
        return
      }

      const hash = window.location.hash.replace("#", "")

      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash)
        return
      }

      if (pathname === "/") {
        setActiveSection("hero")
      }
    }

    syncActiveFromRoute()
    setMobileMenuOpen(false)

    window.addEventListener("hashchange", syncActiveFromRoute)

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (pathname !== "/" || sections.length === 0) {
      return () => window.removeEventListener("hashchange", syncActiveFromRoute)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", syncActiveFromRoute)
    }
  }, [pathname, sectionIds])

  return (
    <header className="sticky top-4 md:top-8 z-50 flex justify-center px-3 md:px-0">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
        className={`
          w-[95%] max-w-7xl
          relative flex flex-wrap items-center justify-between gap-4
          border border-border/40
          bg-background/70 dark:bg-background/70
          backdrop-blur-2xl
          transform-gpu
          transition-all duration-300 ease-out
          will-change-transform

          ${scrolled
            ? "h-16 px-7 rounded-full scale-[0.992] shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
            : "h-20 px-10 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          }
        `}
      >
        {/* Logo */}
        <Link
          href="/#hero"
          className="
            text-xl md:text-2xl font-semibold tracking-tight
            hover:opacity-80 transition
          "
        >
          Santiago.dev
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-medium md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id

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
        <div className="hidden items-center gap-5 md:flex">
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

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
            className="rounded-full"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-3 rounded-3xl border border-border/40 bg-background/90 p-4 shadow-xl backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-2 text-base font-medium">
              {links.map((link) => {
                const isActive = activeSection === link.id

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 transition ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Button
                asChild
                variant="outline"
                className="mt-2 w-full rounded-2xl px-4 py-3"
              >
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                  <FileText size={18} />
                  CV
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </motion.div>
    </header>
  )
}