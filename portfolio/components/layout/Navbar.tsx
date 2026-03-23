"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          Santiago.dev
        </Link>

        <nav className="flex gap-4">
          <Link href="/projects">Proyectos</Link>
          <Link href="/about">Sobre mí</Link>
          <Link href="/contact">Contacto</Link>
        </nav>

        <div className="flex gap-3">
        <ThemeToggle />
        <Button variant="outline">CV</Button>
        </div>
        
      </div>
    </header>
  )
}