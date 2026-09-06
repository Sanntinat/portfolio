# Design — "Plano"

<!-- impeccable:design-schema 1 -->

El mundo visual del portfolio de Santiago Natalichio. Reemplaza al anterior
(degradado azul→cian, píldoras de vidrio esmerilado, manchas desenfocadas, grilla de
puntos y cards redondeadas idénticas), que era el aspecto por defecto de cualquier
portfolio de desarrollador y no decía nada sobre este.

## Concepto

**La página es una hoja de plano.**

Santiago estudia Ingeniería en Sistemas de Información en La Plata: una ciudad que es,
literalmente, un objeto de ingeniería — una traza cuadrada dibujada sobre un tablero en
1882, con grilla ortogonal, diagonales de esquina a esquina y plazas cada seis cuadras.
Uno de sus proyectos es un mapa interactivo de esa misma traza. El vocabulario del
dibujo técnico no es una metáfora prestada: es el material del sujeto.

De ahí sale todo el sistema: retícula de pliego, cotas, referencias de grilla, líneas de
llamada, cajetín de rotulación y marcas de revisión. Cada uno de esos recursos lleva
información real. Ninguno es decorativo.

## Color

Dos temas que son la misma hoja bajo dos luces distintas, no una paleta y su inversión
mecánica.

**Claro — hoja de plano.** Papel mineral, ligeramente verdoso y frío, no crema.

| Token | Valor | Uso |
|---|---|---|
| `--sheet` | `#e8e6df` | papel |
| `--sheet-sunk` | `#deddd4` | paneles hundidos, campos de formulario |
| `--sheet-raised` | `#f2f1ec` | área de trazado, superficies elevadas |
| `--ink` | `#15181a` | tinta de dibujo, texto principal |
| `--ink-soft` | `#55595a` | anotación secundaria (5.3:1 sobre papel) |
| `--ink-faint` | `#797d7b` | graduaciones de regla — nunca texto de cuerpo |
| `--rule` | `#c4c1b7` | línea de dibujo de 1px |
| `--rule-soft` | `#d7d4cb` | retícula menor |
| `--mark` | `#b4331f` | óxido de revisión — acento único (5.7:1) |

**Oscuro — cianotipo.** El azul de Prusia del heliográfico, con la línea en tiza.

| Token | Valor |
|---|---|
| `--sheet` | `#0a1a28` |
| `--sheet-sunk` | `#061220` |
| `--sheet-raised` | `#0f2233` |
| `--ink` | `#dce8f1` (13.9:1) |
| `--ink-soft` | `#93aabd` (7.0:1) |
| `--rule` | `#1e3852` |
| `--mark` | `#e2603d` (4.6:1) |

**Regla del acento.** `--mark` es el único color de la página y funciona como marca de
revisión: estado activo, foco, el cursor del plano, el enlace en curso. La estructura la
carga el peso de la línea, nunca el color. Prohibido el degradado de texto: el énfasis
sale del cuerpo y del tamaño.

## Tipografía

Dos familias, claramente distintas, cada una con un trabajo.

**Archivo** (variable, eje `wdth` 62–125) para todo lo que se lee. El eje de ancho es la
herramienta de rotulación: los títulos van estrechados (`wdth 72`) como el lettering
comprimido de un plano; los encabezados de sección a `wdth 84`; el cuerpo a ancho
normal. Una familia haciendo tres trabajos mediante un eje real, no tres familias.

**Azeret Mono** para texto de instrumento y sólo para eso: cotas, coordenadas, comandos
de la consola, identificadores de stack y referencias de grilla. Nunca como disfraz de
"tecnológico" sobre prosa o etiquetas.

Escala: display `clamp(3rem, 11vw, 6rem)` con `letter-spacing -0.028em`; encabezado de
sección `clamp(1.75rem, 3.6vw, 2.75rem)`; entrada 1.125rem; cuerpo 1rem/1.6 con medida
máxima de 68ch; anotación 0.6875rem con `letter-spacing 0.08em`. Numerales tabulares en
todo el sitio.

## Estructura

- **Alineación a bandera izquierda, siempre.** Los planos no se centran.
- **Radio 2px.** Los dibujos tienen esquinas rectas. Nada de píldoras. La única forma
  circular del sitio son los nodos del plano, que sí son círculos.
- **Retícula del pliego** de 32px, con línea mayor cada 128px, dibujada como fondo fijo.
  Es el campo de dibujo, no una textura.
- **Riel de referencia** fijo a la izquierda en `lg+`: lleva las referencias A–D de las
  secciones y hace de indicador de posición. Es navegación real, no numeración
  decorativa; en un plano una referencia de grilla es información.
- **Cajetín de rotulación** para identidad, sección y contacto: bloque con reglas y
  campos etiquetados, como el cajetín de una lámina.
- **Sin eyebrows.** Ningún rótulo por encima de un encabezado. El encabezado se sostiene
  solo.
- **Sin cards idénticas** como estructura de página. Los proyectos son un índice de
  llamadas de plano con detalle fijado, no una grilla de tarjetas.

## Movimiento

**Un solo momento de autoría:** al cargar, el plano de La Plata se traza a sí mismo —
perímetro, grilla, diagonales y nodos — con `stroke-dashoffset` escalonado y salida
exponencial (`cubic-bezier(0.16, 1, 0.3, 1)`). Es el plóter dibujando la lámina.

Todo lo demás responde a una acción de la persona: apertura de la consola, expansión de
un proyecto, cambio de tema, foco. Nada de entradas por scroll idénticas sección a
sección. `prefers-reduced-motion` desactiva el trazado y entrega el dibujo terminado.

## Superficies del navegador

Selección, cursor de texto, `accent-color`, barra de desplazamiento, anillo de foco y
`text-underline-offset` están tematizados desde la paleta. Los numerales son tabulares.

## Interacción distintiva

**La consola.** La terminal del sitio anterior era una caja de vidrio decorativa en el
hero. Ahora es una consola de comandos global: se abre con `/` o `⌘K` desde cualquier
parte, navega, abre proyectos, cambia el tema y copia el email. Es la demostración de
criterio técnico que la página afirma, y funciona con teclado de punta a punta.
