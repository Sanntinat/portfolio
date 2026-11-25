/**
 * El campo de dibujo del pliego. Debajo de la retícula, una luz y una sombra
 * muy amplias se corren despacio sobre el papel, como en una mesa de dibujo
 * junto a una ventana; encima, la retícula menor de 32px y la mayor de 128px,
 * atenuadas hacia el pie. Los cantos se asientan más oscuros. Con
 * prefers-reduced-motion la luz queda quieta.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-sheet" />

      <div className="sheet-light" />
      <div className="sheet-shade" />

      <div
        className="sheet-grid absolute inset-0 opacity-70"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      <div
        className="sheet-grid-major absolute inset-0 opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 95%)",
        }}
      />

      {/* Borde de lámina: el papel se asienta apenas más oscuro en los cantos. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,var(--sheet-sunk)_100%)] opacity-60" />
      <div className="sheet-vignette absolute inset-0 opacity-70" />
    </div>
  )
}
