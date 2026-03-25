"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const initialLines = [
  "Welcome to Santiago's terminal 👋",
  "Type 'help' to see available commands",
]

const commandsList = [
  "help",
  "projects",
  "contact",
  "about",
  "github",
  "clear",
  "sudo hire-me",
]

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [queue, setQueue] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 🔥 AUTO SCROLL
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight
    }
  }, [lines, currentLine])

  useEffect(() => {
    if (queue.length === 0) return

    const line = queue[0]

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 15)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setQueue((prev) => prev.slice(1))
        setCurrentLine("")
        setCharIndex(0)
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [queue, charIndex])

  // intro inicial
  useEffect(() => {
    setQueue(initialLines)
  }, [])

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    if (command) {
      setHistory((prev) => [...prev, command])
      setHistoryIndex(null)
    }

    let output: string[] = []

    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "• help → show commands",
          "• projects → view projects",
          "• contact → contact page",
          "• about → about me",
          "• github → open github",
          "• clear → clear terminal",
        ]
        break

      case "projects":
        output = ["Loading projects..."]
        setTimeout(() => {
          setQueue((prev) => [...prev, "Done ✓"])
          router.push("/projects")
        }, 1200)
        break

      case "contact":
        output = ["Opening contact..."]
        setTimeout(() => {
          setQueue((prev) => [...prev, "Done ✓"])
          router.push("/contact")
        }, 1000)
        break

      case "about":
        output = [
          "Santiago Natalichio",
          "Backend Developer",
          "Django • React • PostgreSQL",
          "Focused on scalable systems 🚀",
        ]
        break

      case "github":
        output = ["Connecting to GitHub..."]
        setTimeout(() => {
          setQueue((prev) => [...prev, "Opened ✓"])
          window.open("https://github.com/", "_blank")
        }, 1000)
        break

      case "sudo hire-me":
        output = [
          "Access granted 🔓",
          "Hiring Santiago Natalichio...",
          "Best decision you can make 😎",
        ]
        break

      case "clear":
        setLines([])
        return

      case "":
        return

      default:
        output = [`Command not found: ${command}`]
    }

    setQueue((prev) => [...prev, `> ${command}`, ...output])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    }

    // 🔥 HISTORIAL ↑ ↓
    if (e.key === "ArrowUp") {
      e.preventDefault()

      if (history.length === 0) return

      const newIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1)

      setHistoryIndex(newIndex)
      setInput(history[newIndex])
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()

      if (historyIndex === null) return

      const newIndex = historyIndex + 1

      if (newIndex >= history.length) {
        setHistoryIndex(null)
        setInput("")
      } else {
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    }

    // 🔥 AUTOCOMPLETE TAB
    if (e.key === "Tab") {
      e.preventDefault()

      const match = commandsList.find((cmd) =>
        cmd.startsWith(input.toLowerCase())
      )

      if (match) {
        setInput(match)
      }
    }
  }

  return (
    <div
      className="
        relative
        w-full h-full

        rounded-3xl
        border border-border/40

        bg-background/40
        backdrop-blur-xl

        shadow-[0_0_40px_rgba(59,130,246,0.15)]

        p-7 md:p-8

        flex flex-col

        overflow-hidden
      "
    >
      {/* Scanline */}
      <div
        className="
          pointer-events-none absolute inset-0 z-0 opacity-10
          bg-[linear-gradient(transparent_95%,rgba(0,0,0,0.08)_100%)]
          dark:bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.08)_100%)]
          bg-[size:100%_4px]
        "
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Output */}
      <div
        ref={containerRef}
        className="
          relative z-10 flex-1
          font-mono text-base md:text-lg
          text-primary
          space-y-1
          overflow-y-auto
        "
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        {currentLine && (
          <div>
            {currentLine}
            <span className="animate-pulse ml-1">|</span>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center">
          <span className="mr-2">{">"}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="
              bg-transparent
              outline-none
              flex-1
              text-primary
            "
          />
        </div>
      </div>
    </div>
  )
}