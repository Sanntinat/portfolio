"use client"

import { useRef, useState } from "react"

/**
 * La traza fundacional de La Plata, dibujada como plano y trazada por la
 * página al cargar: perímetro, retícula, diagonales, rombo de avenidas y
 * plazas. Es el único momento animado del sitio.
 *
 * Geometría del dibujo (unidades del viewBox): cuadrado de 320 entre 40 y 360.
 * En el terreno ese cuadrado mide 5 196 m de lado, que es la cota rotulada.
 */

const O = 40 // origen del cuadrado
const S = 320 // lado del cuadrado
const E = O + S // extremo opuesto
const C = O + S / 2 // centro (Plaza Moreno)
const DIV = 16 // divisiones de la retícula

const SIDE_METRES = 5196

const gridLines = Array.from({ length: DIV - 1 }, (_, i) => O + ((i + 1) * S) / DIV)

/** Plazas cada seis cuadras: la cuadrícula de nueve del plan original. */
const plazas = [0.25, 0.5, 0.75].flatMap((y) =>
  [0.25, 0.5, 0.75].map((x) => ({
    x: O + x * S,
    y: O + y * S,
    main: x === 0.5 && y === 0.5,
  }))
)

export default function TrazaLaPlata() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== "mouse") return

    const svg = svgRef.current
    if (!svg) return

    const rect = svg.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 400
    const y = ((event.clientY - rect.top) / rect.height) * 400

    setCursor(x < O || x > E || y < O || y > E ? null : { x, y })
  }

  // Coordenada del cursor sobre el terreno, en metros desde el vértice noroeste.
  const readout = cursor
    ? {
        x: Math.round(((cursor.x - O) / S) * SIDE_METRES),
        y: Math.round(((cursor.y - O) / S) * SIDE_METRES),
      }
    : null

  return (
    <figure className="relative">
      <div className="relative border border-rule bg-sheet-raised">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          role="img"
          aria-label="Plano de la traza fundacional de La Plata: un cuadrado con retícula ortogonal, dos diagonales cruzadas, un rombo de avenidas y nueve plazas."
          className="block w-full"
          onPointerMove={handleMove}
          onPointerLeave={() => setCursor(null)}
        >
          {/* 1 · retícula ortogonal */}
          <g
            className="plot-wipe"
            style={{ "--delay": "0.35s", "--dur": "1.2s" } as React.CSSProperties}
            stroke="var(--rule)"
            strokeWidth="0.5"
          >
            {gridLines.map((v) => (
              <line key={`v${v}`} x1={v} y1={O} x2={v} y2={E} />
            ))}
            {gridLines.map((h) => (
              <line key={`h${h}`} x1={O} y1={h} x2={E} y2={h} />
            ))}
          </g>

          {/* 2 · perímetro de la traza */}
          <rect
            x={O}
            y={O}
            width={S}
            height={S}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
            className="plot-line"
            style={
              {
                "--len": 4 * S,
                "--dur": "1.5s",
                "--delay": "0.1s",
              } as React.CSSProperties
            }
          />

          {/* 3 · diagonales principales, de vértice a vértice */}
          <g
            stroke="var(--ink)"
            strokeWidth="1.1"
            className="plot-line"
            style={
              {
                "--len": Math.round(S * Math.SQRT2),
                "--dur": "1s",
                "--delay": "1.05s",
              } as React.CSSProperties
            }
          >
            <line x1={O} y1={O} x2={E} y2={E} />
            <line x1={E} y1={O} x2={O} y2={E} />
          </g>

          {/* 4 · rombo de avenidas que une los puntos medios */}
          <polygon
            points={`${C},${O} ${E},${C} ${C},${E} ${O},${C}`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.1"
            className="plot-line"
            style={
              {
                "--len": Math.round(4 * (S / 2) * Math.SQRT2),
                "--dur": "1.1s",
                "--delay": "1.35s",
              } as React.CSSProperties
            }
          />

          {/* 5 · plazas cada seis cuadras */}
          <g>
            {plazas.map((plaza, index) => (
              <rect
                key={`${plaza.x}-${plaza.y}`}
                x={plaza.x - (plaza.main ? 7 : 4)}
                y={plaza.y - (plaza.main ? 7 : 4)}
                width={plaza.main ? 14 : 8}
                height={plaza.main ? 14 : 8}
                fill={plaza.main ? "var(--mark)" : "var(--sheet-raised)"}
                stroke={plaza.main ? "var(--mark)" : "var(--ink)"}
                strokeWidth="1"
                className="plot-node"
                style={
                  { "--delay": `${1.75 + index * 0.05}s` } as React.CSSProperties
                }
              />
            ))}
          </g>

          {/* 6 · cota del lado */}
          <g
            className="plot-node"
            style={{ "--delay": "2.35s" } as React.CSSProperties}
            stroke="var(--ink-faint)"
            strokeWidth="0.75"
          >
            <line x1={O} y1={E + 16} x2={E} y2={E + 16} />
            <line x1={O} y1={E + 11} x2={O} y2={E + 21} />
            <line x1={E} y1={E + 11} x2={E} y2={E + 21} />
          </g>

          {/* 7 · cruz del cursor sobre el terreno */}
          {cursor && (
            <g stroke="var(--mark)" strokeWidth="0.75" pointerEvents="none">
              <line x1={O} y1={cursor.y} x2={E} y2={cursor.y} />
              <line x1={cursor.x} y1={O} x2={cursor.x} y2={E} />
            </g>
          )}
        </svg>

        {/* Lectura de coordenadas: es la cota del punto señalado, no un adorno. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between border-t border-rule bg-sheet-raised px-3 py-2">
          <span className="annot text-ink-faint">5 196 m de lado</span>
          <span className="annot tabular-nums text-ink-soft">
            {readout
              ? `E ${readout.x.toLocaleString("es-AR")} · S ${readout.y.toLocaleString("es-AR")}`
              : "—"}
          </span>
        </div>
      </div>

      <figcaption className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
        La Plata se dibujó entera sobre un tablero en 1882: cuadrícula, diagonales
        y una plaza cada seis cuadras. Es donde estudio ingeniería, y la ciudad que
        uno de estos proyectos mapea calle por calle.
      </figcaption>
    </figure>
  )
}
