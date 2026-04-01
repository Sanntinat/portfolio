"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Terminal from "@/components/ui/terminal"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="hero" className="container mx-auto scroll-mt-32 px-6 pt-36 pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            >
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight leading-tight sm:text-6xl lg:text-7xl">
                Hola, soy{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Santiago Natalichio
                </span>
                
            </h1>

            <div>
                <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="
                inline-block
                text-lg lg:text-xl
                font-medium

                px-5 py-2

                rounded-full
                border border-primary/30

                bg-gradient-to-r from-blue-500/10 to-cyan-400/10
                border-blue-400/30
                text-blue-500

                backdrop-blur-sm
                ">
                Estudiante avanzado de Ingeniería en Sistemas de Información
                </motion.span>
            </div>

            <div className="flex gap-4">
                <Link href="/#projects">
                  <Button size="lg" className="px-6 py-3 text-lg">
                    Ver proyectos
                  </Button>
                </Link>

                <Link href="/#contact">
                  <Button size="lg" variant="outline" className="px-6 py-3 text-lg">
                    Contactarme
                  </Button>
                </Link>
            </div>
        </motion.div>

        <div className="relative flex h-[400px] items-center justify-center">
            <Terminal />
        </div>

      </div>
    </section>
  )
}