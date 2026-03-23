"use client"

import { useEffect, useState } from "react"

const commands = [
  { text: "> whoami", delay: 400 },
  { text: "Santiago Natalichio - Backend Developer", delay: 800 },
  { text: "", delay: 300 },
  { text: "> stack", delay: 400 },
  { text: "Django / Node / React / PostgreSQL", delay: 800 },
  { text: "", delay: 300 },
  { text: "> status", delay: 400 },
  { text: "Building scalable systems...", delay: 800 },
]

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= commands.length) return

    const currentCommand = commands[lineIndex].text

    if (charIndex < currentCommand.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + currentCommand[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 18)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentCommand])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex((prev) => prev + 1)
      }, commands[lineIndex].delay)

      return () => clearTimeout(timeout)
    }
  }, [charIndex, lineIndex])

  return (
    <div
  

      className="
        relative

        w-full h-full

        rounded-3xl
        border border-border/40

        bg-background/40
        backdrop-blur-xl

        shadow-xl
        shadow-primary/10

        p-6

        flex flex-col
        justify-start

        overflow-hidden
      "
    >

      <div
        className="pointer-events-none absolute inset-0 opacity-10 
        bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.1)_100%)] 
        bg-[size:100%_4px]"
        />

      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div
        className="
          font-mono
          text-base md:text-lg
          leading-relaxed

          text-primary

          space-y-1
        "
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        <div>
          {currentLine}
          <span className="animate-pulse ml-1">|</span>
        </div>
      </div>
    </div>
  )
}