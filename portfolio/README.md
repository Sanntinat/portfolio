# Portfolio — Santiago Natalichio

Sitio personal en español (`/es`) e inglés (`/en`): quién soy, dónde trabajo, qué construí y cómo contactarme.
Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4. Estático de punta a punta: no hay backend, base de datos ni analítica. Se despliega en Vercel.

- **`PRODUCT.md`**: para quién es el sitio, qué cuenta como éxito y qué no se puede afirmar sin evidencia.
- **`DESIGN.md`**: el sistema visual "Plano", la página como hoja de plano, con su paleta, tipografía, retícula y reglas de movimiento.

## Cómo se corre

```bash
pnpm install
pnpm dev      # http://localhost:3000 (redirige a /es o /en)
pnpm build    # build de producción
pnpm lint
```

## Cómo está organizado

```
app/
  [lang]/         rutas por idioma: portada, /projects, /projects/[slug], tarjeta OG
  sitemap.ts      las dos versiones de cada página, enlazadas entre sí
proxy.ts          la raíz manda a /en o /es según el navegador
components/
  console/        la consola de comandos global (/ o ⌘K)
  experience/     el esquema del ruteo de evacuación de HIDRAGIS
  hero/           la traza de La Plata, único momento animado del sitio
  layout/         cajetín superior, riel de referencia, cajetín de cierre
  projects/       índice con visor, portada y esquema por capas
  sections/       inicio, experiencia, proyectos, perfil, contacto
data/
  profile.ts      experiencia, formación, idiomas y stack
  projects.ts     las fichas de proyecto
lib/
  i18n.ts         idiomas y textos de la interfaz
  sections.ts     dominio, secciones A–E, contacto y CV
public/
  cv/             el CV en PDF, en español y en inglés
  projects/       capturas por proyecto
```

El sitio no usa librería de componentes: las superficies son reglas de 1px y tokens CSS declarados en `app/globals.css`. Cualquier componente nuevo se escribe contra esos tokens (`sheet`, `ink`, `rule`, `mark`), no contra una paleta importada.

## De dónde sale el contenido

Los hechos y las cifras son los del CV (github.com/Sanntinat/cv, `datos/cv.yaml`). Si cambia algo allá, se cambia acá en `data/`, en los dos idiomas. Cuando se regenera el CV, se copian los PDF de `salida/base/` a `public/cv/`.

## Sumar capturas a un proyecto

1. Dejar la imagen en `public/projects/<slug>/`.
2. Agregarla a `shots` del proyecto en `data/projects.ts`, con su tamaño real (`w`, `h`), el texto alternativo y el epígrafe en los dos idiomas. Las que tienen texto chico o son diagramas van con `fit: "contain"`.
3. La primera captura reemplaza al esquema en el índice y en la ficha. Hoy todos los proyectos tienen capturas; el esquema queda para el que no las tenga.

Las capturas de OneStock salen de la instancia de demo (`norte.onestock.duckdns.org`); las de EventHub, de su deploy en Render con una cuenta y eventos de demo; y las de PowerFit, del video de la demo. Datos de personas reales, como los de un cliente, se desenfocan antes de capturar.

## Dominio

`SITE_URL` sale de `VERCEL_PROJECT_PRODUCTION_URL` en Vercel. Para un dominio propio, definir `NEXT_PUBLIC_SITE_URL` en el proyecto de Vercel.
