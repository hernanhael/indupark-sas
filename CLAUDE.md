# Indupark SAS — Sitio web del parque logístico y comercial

## Estado actual (2026-07-22)

Sitio en desarrollo activo con contenido real cargado: textos institucionales del dueño, imagen del portal en el hero, plano de mensura real replicado como SVG interactivo, diagrama de distancias nativo, carousel Perspectivas con renders del parque, sección Características rediseñada (ícono + título, sin cajas), sección Ventajas con íconos animados, página Plano rediseñada (mapa apaisado a ancho completo, etiquetas abreviadas y burbuja de datos al hover/click, sin selector de lote en Contacto) con un carousel de 3 vistas (dinámico / plano original / vista satelital, esta última pendiente de las imágenes reales), scaffold de Inversión y Beneficios, Footer global, y página Contacto **terminada y funcional**: íconos por campo, botón de envío con contorno, botón flotante de WhatsApp con el número real cargado, y envío real de las dos plantillas de email vía EmailJS (confirmación al cliente y notificación al dueño en `indupark.riochico@gmail.com`) — al enviar, el formulario se reemplaza por una card de confirmación con botón "Aceptar" que lo vuelve a mostrar vacío. Ver `ROADMAP.md` para fases y pendientes.

## Qué es

Sitio web de un parque logístico y comercial en Río Chico, Tucumán (18 ha, 4 manzanas): presentación institucional, mapa interactivo de lotes (disponibles/vendidos), formulario de contacto y, a futuro, un recorrido 3D. Todo el contenido es en **español**.

## Stack (ya decidido — no cambiar sin consultar)

- Vite + React, **JavaScript sin TypeScript**
- `react-router-dom` — páginas/rutas activas: `/` (Inicio), `/plano`, `/inversion-beneficios`, `/contacto`
- `framer-motion` — transiciones de página, crossfades del hero y animaciones de aparición
- CSS plano con variables en `:root` — **sin Tailwind ni librerías de UI**
- Tipografías: **Archivo** (títulos, vía Google Fonts en `index.html`) + Inter/system (cuerpo)

## Comandos

```
npm run dev      # servidor de desarrollo
npm run build    # build de producción
```

## Estructura de páginas y componentes

- `pages/Inicio.jsx` — hero + Motivación + Ubicación + Perspectivas + Características + Ventajas.
  - **Hero**: pantalla completa con foto del portal (`public/media/hero-portal.jpg`) + overlay oscuro y zoom lento. El scroll dentro del hero avanza por **pasos discretos** (banner → 4 párrafos institucionales) con crossfade; captura wheel/touch hasta agotar los pasos. Franja `hero-fundido` degrada la foto hacia el fondo de página.
  - **Motivación**: texto justificado (máx. 760px), con espacio previsto para una imagen a su izquierda (pendiente).
  - **Ubicación**: imagen satelital del padrón 166293 enmarcada (borde blanco fino) que linkea a Google Maps (**TODO: reemplazar por el pin exacto**, hoy es una búsqueda aproximada) + `MapaDistancias.jsx`, diagrama SVG nativo con hover que dibuja la ruta y muestra los km; hover/focus sobre el punto central de Indupark dibuja todas las rutas en cascada y muestra todos los kilometrajes (valor `activo = 'todos'`). La etiqueta "Indupark" va a la izquierda del círculo central (anclada por la derecha, `dominantBaseline="middle"`).
  - **Perspectivas**: `Perspectivas.jsx`, carousel de 9 renders (`public/media/perspectivas/`) con frase superpuesta abajo a la izquierda sobre degradé. Autoplay de 6 s (se pausa con hover/focus/fuera de viewport), crossfade direccional con framer-motion, swipe, flechas de teclado, flechas de texto superpuestas a los laterales de la imagen, e indicadores de línea + contador debajo. La frase va en una sola línea en desktop (≥861px) y envuelve en pantallas chicas.
  - **Características**: `CaracteristicasParque.jsx`, 9 ítems en grilla de 3 columnas, sin caja ni líneas: ícono SVG lineal a la izquierda + título al lado. Hover: ícono y texto pasan a blanco pleno.
  - **Ventajas**: `VentajasParque.jsx`, "Ventajas de instalarse en Indupark" — 5 ítems (ícono animado 54px + título + párrafo) en grilla de 3 columnas. Los íconos SVG se dibujan trazo a trazo al entrar en viewport (framer-motion `pathLength`) y llevan loops CSS permanentes (clases `ventaja-*`: pulso de radar, guiones en marcha, nodos que titilan, flecha que flota), desactivados con `prefers-reduced-motion`. Ojo: no mezclar `pathLength` con animaciones CSS de `stroke-dasharray` en el mismo elemento — pisan la misma propiedad.
- `pages/Plano.jsx` — título dinámico vía `TituloSeccion` (`as="h1"`): "Plano del parque {vista}" (interactivo/original/satelital), actualizado por el callback `onCambioVista` de `VistasPlano.jsx` cada vez que cambia la vista activa (estado `vista` vive en `Plano.jsx`, arranca en `'interactivo'`). `VistasPlano.jsx` es un carousel de 3 vistas del plano, navegable **solo con las flechas o arrastrando** (sin botones/tabs visibles, sin autoplay, marco al 90% del ancho del contenedor):
  - **Interactivo** (antes "Dinámico"; sin cambios internos): `PlanoParque.jsx` — plano de mensura real replicado como SVG interactivo (4 manzanas, 41 lotes + tira comercial de 24 locales, calles, accesos, norte y la ruta al pie como dos líneas). El plano va apaisado (viewBox 1190×748): lotes 33–41 a la izquierda y 1–8 a la derecha, con el norte indicado por una rosa de los vientos (estrella de 4 puntas, brazo largo = N) apuntando a la derecha para que siga siendo correcto. Sin arbolado ni espacio verde. Las etiquetas del mapa son abreviadas y sin superficie (L1…L41 y A1…A24 para los locales); la superficie se ve por hover/click en el panel. Los datos del lote salen en una **burbuja** (`.plano-burbuja`, renderizada dentro de `PlanoParque`, que maneja su propio estado): sigue el cursor con hover, y click/tap/Enter la fija en el lugar (segundo click la suelta; click fuera de un lote también); fijada y disponible muestra el link "Consultar" a `/contacto` (sin preseleccionar nada — Contacto ya no tiene selector de lote). No hay panel lateral ni card modal (`PanelLote` y `LoteCard` fueron eliminados). El arrastre/swipe del carousel está deshabilitado en esta vista para no competir con el hover del mapa.
  - **Original** y **Satelital**: imágenes de referencia estáticas, sin hover/click por lote. Buscan `/media/plano-original.jpg` y `/media/plano-satelital.jpg` (todavía no cargadas — ver pendientes); mientras no existan, el slide muestra "Imagen pendiente de carga" en vez de un ícono roto (se resuelve solo apenas se coloquen los archivos, sin tocar código).
  - El visor (`.plano-vistas-visor`) mantiene siempre la relación de aspecto 1190:748 del plano interactivo para que el crossfade entre vistas no salte de alto; las imágenes usan `object-fit: contain` para no recortarse.
- `pages/Inversion.jsx` (ruta `/inversion-beneficios`, link de navbar "Inversión") — **scaffold vacío**: solo `<h1>Inversión y Beneficios</h1>`, sin secciones ni contenido. Falta el contenido real (planes de pago, condiciones de financiamiento, beneficios, moneda, plazos).
- `pages/Contacto.jsx` — mismo patrón que el resto de las páginas (`TituloSeccion as="h1"`, `seccion-contenido-ancha`, `Reveal`), con un párrafo de introducción antes del formulario. Campos: nombre, email, teléfono, mensaje (sin selector de lote — se sacó a pedido del dueño; el link "Consultar" del plano ya no arma query param). Cada campo lleva un ícono lineal sutil a la izquierda (mismo estilo `viewBox 24×24`/`strokeWidth 1.7` que `CaracteristicasParque`) dentro de `.campo-fila`, cuya línea inferior crece al hacer foco (mismo lenguaje que `.link-texto`); el ícono y la etiqueta pasan a blanco pleno con `:focus-within`. Fix de autofill: los inputs con autocompletado del navegador (nombre/email) se pintaban de blanco — se corrige forzando el fondo oscuro vía `:-webkit-autofill` + `-webkit-box-shadow` inset, y el body declara `color-scheme: dark` para que los controles nativos respeten el tema oscuro donde el navegador lo soporte. El botón "Enviar consulta" (`.boton-enviar`) es la única excepción deliberada a la regla "solo texto" del resto del sitio: contorno fino de 1px, sin relleno, uppercase espaciado — pedido explícitamente para reforzar la única acción principal de la página. Al enviar, el formulario (y el párrafo de introducción) se ocultan y aparece `.contacto-tarjeta`, una card con el mismo lenguaje visual que `.plano-burbuja` (fondo `--color-fondo-alterno`, borde sutil, radius 6px) con el texto de agradecimiento y un botón "Aceptar" (`.boton-enviar`) que vuelve a mostrar el formulario vacío. Envío **real** vía EmailJS (`utils/enviarConsulta.js`, librería `@emailjs/browser`): arma los parámetros de plantilla (`nombre`, `email`, `telefono`, `mensaje`, `anio`, comunes a las dos plantillas) y dispara los dos `emailjs.send(...)` en paralelo con las credenciales de `.env` (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_CONFIRMACION_CLIENTE`, `VITE_EMAILJS_TEMPLATE_NOTIFICACION_DUENO`, `VITE_EMAILJS_PUBLIC_KEY` — no versionado, ver `.env.example`). Hay **dos** plantillas HTML (mismo estilo: franjas navy de marca arriba/abajo + cuerpo claro para legibilidad en clientes de email), cargadas en el dashboard de EmailJS: `src/emails/confirmacion-consulta.html` (al cliente que consultó — "To Email" = `{{email}}`, "Subject" = "Constancia de consulta") y `src/emails/notificacion-consulta.html` (al dueño — "To Email" fijo `indupark.riochico@gmail.com`, "Reply To" = `{{email}}`, "Subject" = "Nueva consulta"; todo configurado en el dashboard, no en el HTML).
- `components/BotonWhatsApp.jsx` — botón flotante clásico (círculo verde `#25d366`, glifo oficial de WhatsApp en blanco en un solo trazo, esquina inferior derecha) montado únicamente dentro de `Contacto.jsx` (no es global como `BotonArriba`). Se apila arriba de `BotonArriba` (mismo lado, `bottom` mayor) con los centros alineados para no superponerse. `WHATSAPP_NUMERO` tiene el número real del dueño cargado.
- La página **Empresas fue retirada temporalmente** (hasta que haya compradores); es recuperable del historial de git.
- Componentes compartidos: `Navbar` (fija), `Footer` (global en `App.jsx`: fondo más oscuro que la página `#06122e` para diferenciarse, contenido centrado — marca + tagline y línea legal con año dinámico; sin navegación y sin datos de contacto hasta que el dueño los provea), `BotonArriba`, `ScrollToTop`, `PageTransition`, `Reveal`, `TituloSeccion` (overline + título con reveal + línea; prop opcional `as` para el tag del encabezado, por defecto `h2` — Plano usa `as="h1"`).

## Reglas de diseño (pedidas explícitamente por el dueño del proyecto)

- Fondo azul oscuro `#0a1c42` (`--color-fondo`), bloques/cards `#0f2557` (`--color-fondo-alterno`), texto blanco, estilo **sumamente minimalista**.
- Títulos de sección vía `TituloSeccion`: overline en mayúsculas espaciadas + título Archivo 800 uppercase, más chicos que el H1 del hero.
- Botones y links: **solo texto**, sin forma de botón — hover con `border-bottom` que aparece/crece. Sin cajas, sin fondos, sin sombras.
- Navbar **fija** y sin delimitación: transparente, sin borde ni sombra.
- Animaciones de aparición al scrollear se disparan **una sola vez** (`viewport={{ once: true }}`).
- Todas las secciones comparten el contenedor `seccion-contenido-ancha` (1120px) para mantener el mismo margen izquierdo.
- Plano de lotes: verde = disponible, rojizo = vendido; hover aclara y previsualiza en el panel lateral; click fija la selección.

## Datos de lotes

`src/data/lotes.json` es la **única fuente de verdad**. Un registro por lote:

```json
{ "id": "lote-12", "numero": 12, "nombre": "Lote 12",
  "superficie": "2.442,88 m²", "estado": "disponible" }
```

- Ids: `lote-<n>` (1–41, superficies reales del plano de mensura) y `local-<n>` (1–24, tira comercial, superficie pendiente, `nombre` = "Local A<n>").
- `estado`: `"disponible"` o `"vendido"`. Si es vendido, agregar `"comprador": "Empresa X"`.
- Para marcar una venta se edita este JSON a mano; el plano se repinta solo.
- La geometría del plano vive en `PlanoParque.jsx` y se vincula por `id`.

## Documentos de referencia

- `PLAN.md` — plan original de implementación (histórico, no refleja el estado actual).
- `ROADMAP.md` — fases con estado y pendientes que dependen del dueño.

## Pendientes que dependen del dueño (no inventar)

- Coordenadas/link exacto de Google Maps del padrón 166293 (hoy búsqueda aproximada).
- Superficies de los 24 locales de la tira comercial.
- Distancia en km a Santiago del Estero (el diagrama hoy muestra solo "Aeropuerto").
- Imágenes para las vistas "Original" y "Satelital" del carousel de `VistasPlano.jsx`: `public/media/plano-original.jpg` (plano de mensura original) y `public/media/plano-satelital.jpg` (ese plano superpuesto sobre una imagen de Google Maps), idealmente apaisadas ~1190:748. Hasta cargarlas, esos slides muestran "Imagen pendiente de carga".
- Imagen para acompañar la sección Motivación.
- Carousel Perspectivas: las imágenes 2 y 4 son el mismo archivo (falta el render real de "Acceso de doble carril con vigilancia las 24 horas", hoy `perspectiva-4.jpg` repite el de calles internas).
- Sección Empresas: se reincorpora cuando haya compradores.
- Página Inversión y Beneficios (`/inversion-beneficios`): falta todo el contenido (planes de pago, financiamiento propio o bancario, beneficios, moneda, plazos). Hoy es solo un scaffold con el `<h1>`.
- Navbar sin responsive (Fase 6 pendiente): `.navbar-links` no tiene `flex-wrap` ni media query; en viewports angostos puede cortar u overflowear. Se agravó levemente al sumar el link "Inversión" — evaluar al abordar Fase 6.
