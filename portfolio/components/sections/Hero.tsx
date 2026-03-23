"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Terminal from "@/components/ui/terminal"

export default function Hero() {
  return (
    <section className="container mx-auto px-6 pt-40 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            >
            <h1 className="text-7xl lg:text-7xl font-bold tracking-tight leading-tight">
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
                <Button size="lg" className="px-6 py-3 text-lg">
                Ver proyectos
                </Button>

                <Button size="lg" variant="outline" className="px-6 py-3 text-lg">
                Contactarme
                </Button>
            </div>
        </motion.div>

        <div className="relative h-[400px] flex items-center justify-center">
            <Terminal />
        </div>

      </div>
    </section>
  )
}