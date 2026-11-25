import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Hay un package-lock.json más arriba en el árbol del usuario; sin esto
  // Turbopack infiere esa carpeta como raíz del workspace.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Las rutas sin idioma de la versión anterior siguen funcionando.
  async redirects() {
    return [
      { source: "/projects", destination: "/es/projects", permanent: true },
      { source: "/projects/sistema-eventos", destination: "/es/projects/cecq", permanent: true },
      {
        source: "/projects/mapa-estacionamiento-la-plata",
        destination: "/es/projects/estacionamiento",
        permanent: true,
      },
      { source: "/projects/api-reservas", destination: "/es/projects", permanent: true },
      { source: "/projects/:slug", destination: "/es/projects/:slug", permanent: true },
    ]
  },
}

export default nextConfig
