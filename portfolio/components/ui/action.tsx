import Link from "next/link"

type Variant = "solid" | "outline"

const base =
  "group/action inline-flex h-11 items-center gap-2.5 px-5 text-sm transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50"

const variants: Record<Variant, string> = {
  solid: "bg-ink text-sheet hover:bg-mark",
  outline:
    "border border-rule text-ink hover:border-ink hover:bg-sheet-sunk",
}

export function actionClass(variant: Variant = "outline", className = "") {
  return `${base} ${variants[variant]} ${className}`
}

/** Acción de navegación interna. */
export function ActionLink({
  href,
  variant = "outline",
  className,
  children,
}: {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={actionClass(variant, className)}>
      {children}
    </Link>
  )
}

/** Acción hacia afuera del sitio o hacia un protocolo (mailto). */
export function ActionAnchor({
  href,
  variant = "outline",
  external = false,
  className,
  children,
}: {
  href: string
  variant?: Variant
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={actionClass(variant, className)}
    >
      {children}
    </a>
  )
}
