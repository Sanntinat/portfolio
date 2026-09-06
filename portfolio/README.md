# Portfolio — Santiago Natalichio

Sitio personal de una página: quién soy, qué construí y cómo contactarme.
Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4. Estático de
punta a punta: no hay backend, base de datos ni analítica.

- **`PRODUCT.md`** — para quién es el sitio, qué cuenta como éxito y qué no se
  puede afirmar hasta que haya evidencia.
- **`DESIGN.md`** — el sistema visual "Plano": la página como hoja de plano,
  con su paleta, tipografía, retícula y reglas de movimiento.

## Cómo se corre

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de producción
pnpm lint
```

## Cómo está organizado

```
app/            rutas: portada, /projects, /projects/[slug], sitemap, robots, icono
components/
  console/      la consola de comandos global (/ o ⌘K)
  hero/         la traza de La Plata, único momento animado del sitio
  layout/       cajetín superior, riel de referencia, cajetín de cierre
  projects/     el índice de proyectos con visor
  sections/     inicio, perfil, proyectos, contacto
  ui/           el campo de dibujo y el helper de acciones
data/projects.ts  las fichas de proyecto
lib/sections.ts   dominio, secciones A–D, contacto y ruta del CV
```

El sitio no usa librería de componentes: las superficies son reglas de 1px y
tokens CSS declarados en `app/globals.css`. Cualquier componente nuevo se
escribe contra esos tokens (`sheet`, `ink`, `rule`, `mark`), no contra una
paleta importada.

## Pendientes de Santiago

El código los deja en `null` a propósito, y mientras lo estén el sitio
directamente no muestra el control en lugar de apuntar a un enlace muerto:

- `lib/sections.ts` → `SITE_URL`: confirmar el dominio del deploy.
- `lib/sections.ts` → `CONTACT.github` y `CONTACT.linkedin`: los perfiles reales.
- `lib/sections.ts` → `RESUME_URL`: dejar el PDF del CV en `public/` y apuntarlo.
- `data/projects.ts` → `github`, `demo` e `images` de cada proyecto: los
  repositorios, las demos desplegadas y las capturas reales. Los textos de las
  tres fichas son provisionales.
