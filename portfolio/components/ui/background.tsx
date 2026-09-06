/**
 * El campo de dibujo del pliego. Retícula menor de 32px y mayor de 128px,
 * atenuada hacia el pie para que el contenido respire. Sin parallax, sin
 * manchas desenfocadas: es la lámina sobre la que está dibujada la página.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-sheet" />

      <div
        className="sheet-grid absolute inset-0 opacity-70"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      <div
        className="sheet-grid-major absolute inset-0 opacity-60"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 45%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 45%, transparent 95%)",
        }}
      />

      {/* Borde de lámina: el papel se asienta apenas más oscuro en los cantos. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,var(--sheet-sunk)_100%)] opacity-60" />
    </div>
  )
}
