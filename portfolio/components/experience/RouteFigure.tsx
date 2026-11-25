/**
 * Lámina del ruteo de evacuación de HIDRAGIS. No es una captura del sistema
 * (el repositorio es privado): es un esquema de lo que hace. Damero rotado
 * como la traza de La Plata, una zona anegada rayada que corta el camino
 * corto, y la ruta publicada rodeando el agua.
 *
 * La geometría se calcula una vez, en coordenadas de cuadra, y se proyecta a
 * la lámina rotando 42°. Sin JavaScript en el cliente.
 */

const W = 640
const H = 380
const S = 40 // una cuadra
const ANG = (-42 * Math.PI) / 180
const CX = W * 0.54
const CY = H * 0.5
const OX = 5
const OY = 4.4

type Pt = [number, number]

const P = (x: number, y: number): Pt => {
  const dx = (x - OX) * S
  const dy = (y - OY) * S
  return [
    CX + dx * Math.cos(ANG) - dy * Math.sin(ANG),
    CY + dx * Math.sin(ANG) + dy * Math.cos(ANG),
  ]
}

const pts = (list: Pt[]) => list.map(([x, y]) => P(x, y).map((v) => v.toFixed(1)).join(",")).join(" ")
const r = (v: number) => Number(v.toFixed(1))

const N = 14
const streets = Array.from({ length: N + 5 }, (_, k) => k - 4)

const blob: Pt[] = Array.from({ length: 48 }, (_, k) => {
  const t = (k / 48) * Math.PI * 2
  const rad = 1.75 + 0.28 * Math.sin(3 * t + 0.6) + 0.12 * Math.cos(5 * t)
  return [5.6 + rad * 1.25 * Math.cos(t), 5.1 + rad * Math.sin(t)]
})

const route: Pt[] = [
  [2, 6],
  [2, 4],
  [3, 4],
  [3, 2],
  [8, 2],
]
const excluded: Pt[] = [
  [2, 6],
  [8, 6],
  [8, 2],
]
const plazas: Pt[] = [0, 6, 12].flatMap((x) => [0, 6, 12].map((y) => [x, y] as Pt))

function Callout({ at, dx, dy, text }: { at: Pt; dx: number; dy: number; text: string }) {
  const [px, py] = P(...at)
  const tx = px + dx
  const ty = py + dy
  const dir = dx > 0 ? 1 : -1
  return (
    <g>
      <line x1={r(px)} y1={r(py)} x2={r(tx)} y2={r(ty)} stroke="var(--ink-soft)" strokeWidth="0.8" />
      <line x1={r(tx)} y1={r(ty)} x2={r(tx + 8 * dir)} y2={r(ty)} stroke="var(--ink-soft)" strokeWidth="0.8" />
      <text
        x={r(tx + 12 * dir)}
        y={r(ty + 3.5)}
        textAnchor={dir > 0 ? "start" : "end"}
        className="font-mono"
        fontSize="10"
        letterSpacing="0.08em"
        fill="var(--ink)"
      >
        {text}
      </text>
    </g>
  )
}

export default function RouteFigure({
  aria,
  caption,
  legendRoute,
  legendExcluded,
  resident,
  shelter,
  label,
  name,
}: {
  aria: string
  caption: string
  legendRoute: string
  legendExcluded: string
  resident: string
  shelter: string
  label: string
  name: string
}) {
  const [ax, ay] = P(2, 6)
  const [bx, by] = P(8, 2)
  const [xx, xy] = P(5.1, 6)

  return (
    <figure>
      <div className="relative overflow-hidden border border-ink bg-sheet-raised">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={aria} className="block w-full">
          <defs>
            <pattern id="agua" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" fill="var(--sheet-sunk)" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink-faint)" strokeWidth="1" />
            </pattern>
          </defs>

          {streets.map((i) => {
            const major = i % 6 === 0
            const props = {
              stroke: major ? "var(--ink-soft)" : "var(--rule)",
              strokeWidth: major ? 1.3 : 0.8,
            }
            const [a1, a2] = [P(i, -4), P(i, N)]
            const [b1, b2] = [P(-4, i), P(N, i)]
            return (
              <g key={i} {...props}>
                <line x1={r(a1[0])} y1={r(a1[1])} x2={r(a2[0])} y2={r(a2[1])} />
                <line x1={r(b1[0])} y1={r(b1[1])} x2={r(b2[0])} y2={r(b2[1])} />
              </g>
            )
          })}

          {/* Las diagonales de esquina a esquina. */}
          {[
            [P(-4, -4), P(N, N)],
            [P(-4, 12), P(12, -4)],
          ].map(([a, z], k) => (
            <line
              key={k}
              x1={r(a[0])}
              y1={r(a[1])}
              x2={r(z[0])}
              y2={r(z[1])}
              stroke="var(--ink-soft)"
              strokeWidth="1.3"
            />
          ))}

          <polygon points={pts(blob)} fill="url(#agua)" stroke="var(--ink-soft)" strokeWidth="1" />

          {plazas.map(([x, y]) => {
            const [px, py] = P(x, y)
            return (
              <circle
                key={`${x}-${y}`}
                cx={r(px)}
                cy={r(py)}
                r="3.4"
                fill="var(--sheet-raised)"
                stroke="var(--ink-soft)"
                strokeWidth="1.2"
              />
            )
          })}

          <polyline
            points={pts(excluded)}
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />
          <path
            d={`M${r(xx - 5)} ${r(xy - 5)} L${r(xx + 5)} ${r(xy + 5)} M${r(xx + 5)} ${r(xy - 5)} L${r(xx - 5)} ${r(xy + 5)}`}
            stroke="var(--mark)"
            strokeWidth="1.6"
          />

          <polyline
            points={pts(route)}
            fill="none"
            stroke="var(--mark)"
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx={r(ax)} cy={r(ay)} r="5" fill="var(--mark)" />
          <rect
            x={r(bx - 6)}
            y={r(by - 6)}
            width="12"
            height="12"
            fill="var(--sheet-raised)"
            stroke="var(--mark)"
            strokeWidth="2"
          />

          <Callout at={[2, 6]} dx={-26} dy={24} text={resident} />
          <Callout at={[8, 2]} dx={26} dy={-18} text={shelter} />
          <Callout at={[6.4, 5.6]} dx={32} dy={28} text="h > 0.30 m" />
        </svg>

        <div className="annot absolute top-0 left-0 space-y-1 border-r border-b border-rule bg-sheet-raised px-3 py-2 text-ink-soft">
          <p className="flex items-center gap-2">
            <span aria-hidden className="inline-block h-0.5 w-5 bg-mark" />
            {legendRoute}
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden className="inline-block w-5 border-t border-dashed border-ink-faint" />
            {legendExcluded}
          </p>
        </div>

        <dl className="annot absolute right-0 bottom-0 grid grid-cols-[auto_auto] border-t border-l border-ink bg-sheet-raised">
          <dt className="border-r border-rule px-3 py-1.5 text-ink-faint">{label}</dt>
          <dd className="px-3 py-1.5 text-ink">{name}</dd>
        </dl>
      </div>

      <figcaption className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-soft">{caption}</figcaption>
    </figure>
  )
}
