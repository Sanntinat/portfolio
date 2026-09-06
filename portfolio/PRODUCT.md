# Product

<!-- impeccable:product-schema 1 -->

> Nota de procedencia: Santiago pidió avanzar sin ronda de entrevista. Los hechos de
> abajo están tomados del código existente y del brief; los que son **inferidos** están
> marcados como tales y deben confirmarse antes de tratarlos como verdad.

## Platform

web

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui ·
next-themes · framer-motion. Ya establecido por el repositorio; no es una decisión
abierta.

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

Santiago es estudiante avanzado de Ingeniería en Sistemas de Información y construye
aplicaciones completas de punta a punta: modelo de datos, API y interfaz. El ángulo que
un portfolio vecino no puede copiar honestamente es esa combinación de formación en
ingeniería de sistemas con entrega de producto terminado.

El sitio anterior se contradecía a sí mismo — el hero decía "Estudiante avanzado de
Ingeniería en Sistemas", la terminal decía "Backend Developer" y la sección Sobre mí
decía "Diseño productos". Se unificó en la primera, que es la verificable.

## Operating Context

- Se evalúa en una sesión corta, junto a otros portfolios, casi siempre en desktop.
- Es probable que el visitante llegue con el CV o el perfil de LinkedIn ya abierto.
- Idioma: español rioplatense. El voseo del sitio actual es intencional y se conserva.
- Ubicación: La Plata, Buenos Aires, Argentina.

## Capabilities and Constraints

- Sitio estático. No hay backend propio: el formulario de contacto compone un `mailto:`
  en el cliente. Sin base de datos, sin autenticación, sin analítica.
- Tres proyectos en `data/projects.ts`: sistema de turnos odontológicos (Django + React
  + PostgreSQL), mapa de estacionamiento medido de La Plata (React Native + Expo) y un
  e-commerce de gimnasio (Django REST + React + Material UI).
- Los textos de los proyectos son provisionales por pedido explícito de Santiago:
  el trabajo de esta iteración es visual y funcional, no de contenido.

## Evidence on Hand

- Capturas reales de proyectos en `public/projects/eventos/preview1..3.png`.
- **Ausencias que no deben inventarse:** la URL de GitHub es el placeholder
  `https://github.com/tu-usuario`, la de LinkedIn es `linkedin.com/in/tu-usuario`, el
  botón de CV no apunta a ningún archivo, y ningún proyecto tiene demo desplegada
  (`demo: ""`). No hay testimonios, clientes, métricas ni experiencia laboral
  confirmada. Nada de eso puede aparecer en el sitio hasta que Santiago lo aporte.
- Email de contacto real y ya usado en el código: `santiagonatalichio03@gmail.com`.

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
