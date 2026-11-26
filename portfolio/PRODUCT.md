# Product

<!-- impeccable:product-schema 1 -->

> Nota de procedencia: Santiago pidió avanzar sin ronda de entrevista. Los hechos de
> abajo están tomados del código existente y del brief; los que son **inferidos** están
> marcados como tales y deben confirmarse antes de tratarlos como verdad.

## Platform

web

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-themes ·
lucide-react. Ya establecido por el repositorio; no es una decisión abierta. Se
despliega en Vercel.

## Users

Reclutadores de IT y líderes técnicos en Argentina que abren el sitio desde una lista de
candidatos, en horario laboral y en desktop, con pocos minutos para decidir si contactan.
(**Inferido** del posicionamiento del sitio actual: "estudiante avanzado", CV en el
navbar, formulario de contacto.)

Audiencia secundaria: cualquiera que llegue por el link del CV o de LinkedIn y quiera
verificar rápido que el trabajo listado existe y funciona.

## Product Purpose

Un portfolio personal de una sola página que convierta una visita fría en un contacto.
El éxito es un mensaje recibido o una descarga del CV, no el tiempo de permanencia.

## Positioning

Santiago es desarrollador de software y estudiante de último año de Ingeniería en
Sistemas de Información (UTN La Plata), practicante en el grupo de investigación GIDAS.
Construye aplicaciones completas de punta a punta: modelo de datos, API, interfaz y las
pruebas de cada parte. El ángulo que
un portfolio vecino no puede copiar honestamente es esa combinación de formación en
ingeniería de sistemas con entrega de producto terminado.

El sitio anterior se contradecía a sí mismo — el hero decía "Estudiante avanzado de
Ingeniería en Sistemas", la terminal decía "Backend Developer" y la sección Sobre mí
decía "Diseño productos". Se unificó en la primera, que es la verificable.

## Operating Context

- Se evalúa en una sesión corta, junto a otros portfolios, casi siempre en desktop.
- Es probable que el visitante llegue con el CV o el perfil de LinkedIn ya abierto.
- Idiomas: español rioplatense (con voseo, intencional) en `/es` e inglés en `/en`. La
  raíz manda a uno u otro según el navegador (`proxy.ts`).
- Ubicación: Quilmes, Buenos Aires, Argentina. Estudia y trabaja en La Plata, por eso el
  dibujo de la portada sigue siendo su traza.

## Capabilities and Constraints

- Sitio estático. No hay backend propio: el formulario de contacto compone un `mailto:`
  en el cliente. Sin base de datos, sin autenticación, sin analítica.
- El contenido sale del repo del CV (github.com/Sanntinat/cv, `datos/cv.yaml`), con los
  mismos hechos y cifras: experiencia en `data/profile.ts`, proyectos en
  `data/projects.ts`, textos de interfaz en `lib/i18n.ts`.
- Experiencia: práctica en GIDAS sobre HIDRAGIS. El repositorio es privado y Santiago
  decidió no publicar capturas: se muestra con un esquema dibujado del ruteo.
- Proyectos: OneStock (proyecto final), Sistema Inmune, EventHub, turnos odontológicos
  para el CECQ y la tienda online PowerFit.

## Evidence on Hand

- Capturas reales en `public/projects/<slug>/`: OneStock (instancia de demo, con los
  datos del cliente desenfocados), EventHub (deploy en Render, con eventos de demo),
  Sistema Inmune (tablero y alerta de Grafana, arquitectura, topología) y CECQ.
- PowerFit: capturas del video de la demo. Su repositorio público tiene credenciales
  de la base en `settings.py`, así que la ficha no lo enlaza hasta que se limpie.
- GitHub (github.com/Sanntinat), LinkedIn y el CV en PDF (`public/cv/`, en los dos
  idiomas) son reales.
- **Ausencias que no deben inventarse:** ningún proyecto tiene demo desplegada, no hay
  testimonios ni clientes, y CECQ no llegó a usarse en producción.
- Email de contacto: `santiagonatalichio03@gmail.com`.

## Product Principles

1. **Verificable antes que impresionante.** Ninguna afirmación que Santiago no pueda
   respaldar hoy. Los huecos se muestran como pendientes, no se rellenan con relleno.
2. **Una sola voz.** Un solo posicionamiento repetido de forma consistente en hero,
   consola, proyectos y contacto.
3. **El contacto está siempre a un gesto.** Desde cualquier punto de la página, sin
   scroll de vuelta al inicio.
4. **La ingeniería se demuestra, no se declara.** La página misma es la muestra de
   criterio técnico: teclado, accesibilidad, rendimiento y detalle.

## Accessibility & Inclusion

Sin requisito formal establecido. Se trabaja contra WCAG 2.2 AA como piso: contraste de
texto ≥ 4.5:1 en ambos temas, foco visible, operación completa por teclado y respeto a
`prefers-reduced-motion`.
