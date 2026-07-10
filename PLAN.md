# Plan de implementación — Sitio web Indupark SAS

## Contexto

Crear desde cero el sitio web de un parque industrial (Indupark SAS). El sitio se organiza en **páginas separadas con rutas** (Inicio, Mapa, Empresas, Contacto, y futura sección 3D), con navegación por navbar. Diseño minimalista: fondo azul francia oscuro, tipografía blanca amigable, botones de solo texto con subrayado al hover, y animaciones que aparecen al scrollear dentro de cada página.

**Decisiones ya tomadas con el usuario:**
- Stack: **React + Vite** (JavaScript) + **React Router** (cada sección es una página/ruta)
- Plano del parque: el usuario **tiene el plano real** y lo va a entregar (SVG, imagen o PDF). Mientras tanto se desarrolla con un SVG provisorio con la misma estructura de datos, para que el reemplazo sea directo.
- Formulario de contacto: **envío simulado** por ahora (estructura lista para conectar EmailJS/Resend después).
- Datos de lotes: **archivo JSON** editable a mano.
- Navbar **integrada, sin delimitación**: sin borde, sombra ni cambio de fondo — el paso del nav al contenido debe ser natural, todo sobre el mismo azul.
- **Botón "ir arriba"**: flotante, de tamaño mediano y mínimamente visible (baja opacidad, sube al hover), aparece recién al scrollear.

## Stack técnico

- **Vite + React** (JS, sin TypeScript para mantenerlo simple)
- **react-router-dom** para las rutas: `/` (Inicio), `/mapa`, `/empresas`, `/contacto`
- **Framer Motion** para animaciones: transiciones suaves entre páginas (`AnimatePresence`), aparición al scrollear, micro-interacciones (hover de lotes, apertura de card)
- CSS plano con variables (`:root`) — sin Tailwind, acorde al pedido minimalista
- Fuente amigable vía Google Fonts (ej. *Poppins* o *Inter*)

## Paleta y estilo

- Fondo: azul francia oscuro (`#0f2557` aprox., ajustable), variante más profunda para bloques alternos
- Texto: blanco `#ffffff` / blanco suavizado `rgba(255,255,255,.75)` para secundarios
- Acentos del mapa: verde disponible (`#2ecc71`), rojo vendido (`#e74c3c`)
- Botones y links: solo texto, `border-bottom` que aparece/crece en hover. Sin cajas ni fondos.
- Navbar: mismo fondo azul que la página (transparente), sin línea divisoria; el link activo se distingue apenas (subrayado fino u opacidad). La transición nav → contenido es continua.
- Animaciones de aparición **una sola vez** (`viewport={{ once: true }}`) — eventuales, no repetitivas.

## Estructura de archivos

```
indupark-sas/
├── CLAUDE.md                # convenciones: stack, paleta, estilo de código, cómo editar lotes.json
├── ROADMAP.md               # fases futuras: plano real, logos empresas, email real, tour 3D
├── PLAN.md                  # este archivo
├── index.html
├── package.json / vite.config.js
├── public/
│   └── media/               # videos/imágenes de presentación que aporte el usuario
└── src/
    ├── main.jsx             # router
    ├── App.jsx              # layout: Navbar + <Outlet/> + BotonArriba, AnimatePresence
    ├── styles/
    │   ├── global.css       # variables, reset, tipografía, clases de link-texto
    │   └── (css por página)
    ├── data/
    │   └── lotes.json       # fuente única de datos de lotes
    ├── components/
    │   ├── Navbar.jsx       # links de texto a cada ruta, sin delimitación visual
    │   ├── BotonArriba.jsx  # flotante, mediano, opacidad baja, visible al scrollear
    │   ├── Reveal.jsx       # wrapper de animación al scrollear (Framer Motion, once)
    │   └── LoteCard.jsx     # card con datos del lote seleccionado
    └── pages/
        ├── Inicio.jsx       # hero + descripción + ubicación + beneficios
        ├── Mapa.jsx         # SVG interactivo
        ├── Empresas.jsx     # logos con movimiento (placeholder)
        └── Contacto.jsx     # formulario simulado
```

## Comportamiento global

- **Navegación**: al cambiar de ruta, scroll al top automático y transición suave (fade corto) con `AnimatePresence` para que el cambio de página no sea brusco.
- **Botón "ir arriba"**: en todas las páginas; aparece con fade cuando el usuario scrolleó más de una pantalla; círculo mediano (~44px) con flecha, `opacity: .35` en reposo → `1` al hover.

## Páginas

### 1. Inicio (`/`)
- Hero a pantalla completa: nombre "Indupark SAS", tagline, animación de entrada (texto que aparece por líneas). El navbar convive encima del hero sin corte visual.
- Bloques al scrollear: **descripción**, **ubicación** (texto + espacio para mapa/imagen), **beneficios** (grilla de items). Cada bloque envuelto en `<Reveal>` para aparecer una vez.
- Espacios preparados (`public/media/`) para los videos/imágenes que el usuario incorpore después: el layout los contempla con placeholders.
- Animación "propia del sistema": fondo con formas geométricas sutiles animadas en CSS/SVG (líneas tipo plano/blueprint) que no compitan con el texto.

### 2. Mapa del parque (`/mapa`)
- `Mapa.jsx` renderiza un **SVG inline** donde cada lote es un `<path>/<polygon>` con `id` (ej. `lote-12`).
- `lotes.json` — un registro por lote:
  ```json
  { "id": "lote-12", "numero": 12, "medidas": "50m x 80m (4.000 m²)",
    "estado": "vendido", "comprador": "Empresa X" }
  ```
- Estados: `disponible` → verde, `vendido` → rojo. El color se aplica por código según el JSON (editar el JSON repinta el mapa solo).
- **Hover**: el lote escala levemente (`transform: scale(1.03)` con `transform-origin` en su centro) + cursor pointer.
- **Click**: abre `LoteCard` (animada) con número, medidas, estado, y comprador si está vendido. Se cierra con click afuera o botón ✕.
- **Plano real**: cuando el usuario entregue el archivo —
  - Si es SVG: se limpia y se asignan ids a los lotes.
  - Si es imagen/PDF: se usa como capa de fondo y se trazan los polígonos de los lotes encima.
  - Mientras tanto: SVG provisorio (una decena de lotes rectangulares con caminería) para desarrollar toda la interactividad.

### 3. Empresas instaladas (`/empresas`)
- Página placeholder consciente: título + carrusel/marquee de logos en movimiento continuo (CSS animation) con 3–4 logos de ejemplo grises y leyenda "próximamente".
- La estructura (array de empresas con logo) queda lista para cargar las reales más adelante y vincularlas con `comprador` del JSON de lotes.

### 4. Contacto (`/contacto`)
- Formulario minimalista: nombre, email, teléfono, mensaje, interés (lote). Inputs de solo línea inferior (coherente con el estilo).
- Envío **simulado**: validación básica, estado "enviando…" y mensaje de éxito animado. La función `enviarConsulta()` queda aislada para reemplazarla por EmailJS/Resend sin tocar el resto.

### 5. Recorrido 3D (futuro)
- Ítem en la navegación "Recorrido 3D" deshabilitado/"próximamente" (o bloque al final de Inicio). Sin código 3D ahora; la arquitectura de rutas deja lista una futura `/recorrido` con Three.js/react-three-fiber.

## Orden de implementación

1. Scaffold Vite + React, instalar `framer-motion` y `react-router-dom`, estructura de carpetas, `global.css` con paleta y tipografía.
2. Router + layout (`App.jsx`): Navbar integrada, transición entre páginas, scroll-to-top al navegar, `BotonArriba`.
3. Página Inicio completa con animaciones.
4. `lotes.json` + SVG provisorio + interactividad del mapa (colores, hover, card).
5. Empresas (marquee placeholder) y Contacto (formulario simulado).
6. Responsive (el mapa SVG escala solo por `viewBox`; ajustar grillas y nav en móvil).

## Verificación

- `npm run dev` y revisar en el navegador:
  - Navegación entre rutas con transición suave y scroll al top; navbar sin línea/sombra que la separe del contenido.
  - Botón "ir arriba" aparece al scrollear, semi-transparente, funciona en todas las páginas.
  - Animaciones de aparición se disparan una sola vez al scrollear.
  - Mapa: lotes verdes/rojos según JSON; hover agranda; click abre card con datos correctos; editar `lotes.json` cambia el color al recargar.
  - Formulario: valida campos y muestra confirmación simulada.
  - Probar en ancho móvil (devtools) que nada desborde.
- `npm run build` sin errores.

## Pendiente del usuario

- Entregar el **plano real** del loteo (SVG/imagen/PDF) para reemplazar el provisorio.
- Videos/imágenes de presentación para el hero.
- Datos reales: medidas y numeración de lotes, textos institucionales, datos de contacto de los vendedores.
