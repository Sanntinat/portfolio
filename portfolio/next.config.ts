import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Hay un package-lock.json más arriba en el árbol del usuario; sin esto
  // Turbopack infiere esa carpeta como raíz del workspace.
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
