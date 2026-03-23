"use client"

import { useEffect, useState } from "react"

export default function Background() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      setOffset({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`
        }}
      >
        <div className="
          absolute inset-0
          bg-[linear-gradient(120deg,#f1f5f9,#e2e8f0,#f8fafc)]
          dark:bg-[linear-gradient(120deg,#020617,#0f172a,#020617)]
        " />
      </div>

      <div className="
        absolute top-[-100px] left-1/2 -translate-x-1/2
        w-[900px] h-[400px]
        bg-blue-500/30 dark:bg-blue-500/20
        blur-[160px]
        rounded-full
        animate-pulse
      " />

      <div className="
        absolute bottom-[-100px] right-1/3
        w-[700px] h-[300px]
        bg-cyan-400/20 dark:bg-cyan-400/10
        blur-[160px]
        rounded-full
        animate-pulse
      " />

      <div className="
        absolute inset-0
        opacity-[0.08] dark:opacity-[0.04]
        bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.4)_1px,transparent_0)]
        dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)]
        bg-[size:24px_24px]
      " />

    </div>
  )
}