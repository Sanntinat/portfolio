"use client"

import { useEffect, useState } from "react"

export default function Background() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setOffset({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    >

      {/* Gradient animado */}
      <div className="absolute inset-0 animate-gradient 
        bg-[linear-gradient(120deg,#e2e8f0,#f8fafc,#e2e8f0)] 
        dark:bg-[linear-gradient(120deg,#0f172a,#020617,#0f172a)] 
        opacity-70 dark:opacity-60"
      />

      {/* Luces */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/20 dark:bg-primary/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-1/3 w-[500px] h-[250px] bg-blue-500/10 dark:bg-blue-500/5 blur-[140px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:22px_22px]" />

    </div>
  )
}