import { NextResponse, type NextRequest } from "next/server"

/**
 * La raíz no tiene contenido propio: manda a /en a quien tiene el navegador en
 * inglés y a /es a todos los demás. El resto de las rutas ya lleva el idioma.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? ""
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? ""
  const lang = first.startsWith("en") ? "en" : "es"

  return NextResponse.redirect(new URL(`/${lang}`, request.url))
}

export const config = { matcher: ["/"] }
