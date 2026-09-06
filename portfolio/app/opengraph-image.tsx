import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt =
  "Santiago Natalichio — estudiante avanzado de Ingeniería en Sistemas en La Plata"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const SHEET = "#e8e6df"
const SHEET_RAISED = "#f2f1ec"
const INK = "#15181a"
const INK_SOFT = "#55595a"
const INK_FAINT = "#797d7b"
const RULE = "#c4c1b7"
const RULE_SOFT = "#d7d4cb"
const MARK = "#b4331f"

const CELL = 42

/**
 * Las tipografías van versionadas en el repo en lugar de bajarse de Google en
 * cada build: la tarjeta se dibuja igual sin red. El render de la tarjeta no
 * entiende el eje de ancho variable de Archivo, así que van dos instancias
 * estáticas y el peso las elige: 700 es la estrechada de rotulación (wdth 75),
 * 400 la de ancho normal para la prosa. Es la misma división que hace el sitio
 * entre .plot-title y el cuerpo.
 */
const font = (file: string) =>
  readFileSync(join(process.cwd(), "assets", "fonts", file))

/**
 * La traza de La Plata, en la misma geometría que dibuja el hero: cuadrado de
 * 320 entre 40 y 360, retícula de 16 divisiones, diagonales de vértice a
 * vértice, rombo de avenidas y las nueve plazas. Acá va quieta: una tarjeta de
 * enlace es una impresión, no una animación.
 */
function traza() {
  const O = 40
  const S = 320
  const E = O + S
  const C = O + S / 2
  const DIV = 16

  const grid = Array.from({ length: DIV - 1 }, (_, i) => O + ((i + 1) * S) / DIV)
  const plazas = [0.25, 0.5, 0.75].flatMap((y) =>
    [0.25, 0.5, 0.75].map((x) => ({
      x: O + x * S,
      y: O + y * S,
      main: x === 0.5 && y === 0.5,
    }))
  )

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<g stroke="${RULE}" stroke-width="0.5">
${grid.map((v) => `<line x1="${v}" y1="${O}" x2="${v}" y2="${E}"/>`).join("")}
${grid.map((h) => `<line x1="${O}" y1="${h}" x2="${E}" y2="${h}"/>`).join("")}
</g>
<rect x="${O}" y="${O}" width="${S}" height="${S}" fill="none" stroke="${INK}" stroke-width="1.6"/>
<g stroke="${INK}" stroke-width="1.1">
<line x1="${O}" y1="${O}" x2="${E}" y2="${E}"/>
<line x1="${E}" y1="${O}" x2="${O}" y2="${E}"/>
</g>
<polygon points="${C},${O} ${E},${C} ${C},${E} ${O},${C}" fill="none" stroke="${INK}" stroke-width="1.1"/>
${plazas
  .map(
    (p) =>
      `<rect x="${p.x - (p.main ? 7 : 4)}" y="${p.y - (p.main ? 7 : 4)}" width="${
        p.main ? 14 : 8
      }" height="${p.main ? 14 : 8}" fill="${
        p.main ? MARK : SHEET_RAISED
      }" stroke="${p.main ? MARK : INK}" stroke-width="1"/>`
  )
  .join("")}
</svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const annot = {
  fontFamily: "Azeret Mono",
  fontWeight: 500,
  fontSize: 17,
  letterSpacing: 1.4,
  color: INK_FAINT,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: SHEET,
          fontFamily: "Archivo",
          color: INK,
          position: "relative",
        }}
      >
        {/* Retícula del pliego: las mismas líneas menores del sitio. */}
        {Array.from({ length: Math.ceil(size.width / CELL) }, (_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: (i + 1) * CELL,
              width: 1,
              backgroundColor: RULE_SOFT,
            }}
          />
        ))}
        {Array.from({ length: Math.ceil(size.height / CELL) }, (_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: (i + 1) * CELL,
              height: 1,
              backgroundColor: RULE_SOFT,
            }}
          />
        ))}

        {/* Cajetín superior */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${RULE}`,
            padding: "26px 56px",
          }}
        >
          <div style={{ ...annot, display: "flex", color: INK_SOFT }}>
            PORTFOLIO
          </div>
          <div style={{ ...annot, display: "flex" }}>34°55′S 57°57′O</div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "0 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 104,
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: -2.6,
              }}
            >
              <div style={{ display: "flex" }}>Santiago</div>
              <div style={{ display: "flex" }}>Natalichio</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: 560,
                margin: "34px 0 26px",
              }}
            >
              <div style={{ display: "flex", width: 84, height: 3, backgroundColor: MARK }} />
              <div style={{ display: "flex", flex: 1, height: 1, backgroundColor: RULE }} />
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 400,
                lineHeight: 1.45,
                color: INK_SOFT,
                maxWidth: 560,
              }}
            >
              Estudiante avanzado de Ingeniería en Sistemas de Información.
              Construyo aplicaciones completas: modelo de datos, API e interfaz.
            </div>
          </div>

          <div style={{ display: "flex", padding: "0 56px 0 24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${RULE}`,
                backgroundColor: SHEET_RAISED,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={traza()} width={356} height={356} alt="" />

              <div
                style={{
                  ...annot,
                  display: "flex",
                  borderTop: `1px solid ${RULE}`,
                  padding: "10px 14px",
                }}
              >
                5 196 m de lado
              </div>
            </div>
          </div>
        </div>

        {/* Cajetín de cierre: los campos que llevaría el pie de una lámina. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${RULE}`,
            padding: "26px 56px",
          }}
        >
          <div style={{ ...annot, display: "flex", color: INK_SOFT }}>
            DJANGO · REACT · POSTGRESQL
          </div>
          <div style={{ ...annot, display: "flex" }}>LA PLATA, ARGENTINA</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: font("Archivo-Condensed-Bold.ttf"),
          weight: 700,
          style: "normal",
        },
        {
          name: "Archivo",
          data: font("Archivo-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
        {
          name: "Azeret Mono",
          data: font("AzeretMono-Medium.ttf"),
          weight: 500,
          style: "normal",
        },
      ],
    }
  )
}
