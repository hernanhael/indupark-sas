# Roadmap — Indupark SAS

## Fases de desarrollo

- [x] **Fase 0 — Documentación**: PLAN.md, CLAUDE.md, ROADMAP.md *(2026-07-06)*
- [x] **Fase 1 — Base del proyecto**: scaffold Vite + React, `react-router-dom` y `framer-motion`, estructura de carpetas, `global.css` con paleta y tipografía
- [x] **Fase 2 — Layout global**: router, Navbar (ahora fija), transición entre páginas, scroll-to-top al navegar, botón "ir arriba"
- [x] **Fase 3 — Página Inicio**: hero animado, descripción, ubicación, beneficios
- [x] **Fase 4 — Mapa interactivo**: `lotes.json`, SVG provisorio, colores por estado, hover, card de lote
- [x] **Fase 5 — Empresas y Contacto**: marquee placeholder + formulario con envío simulado
- [x] **Fase 7 — Contenido real del Inicio** *(2026-07-13)*: textos institucionales del dueño, hero con foto del portal y avance por pasos (banner → 4 párrafos), sección Motivación, sección Ubicación (imagen del padrón con link a Google Maps + diagrama de distancias SVG nativo con hover), sección Características (9 cards con íconos). Tipografía Archivo para títulos. Sección Empresas retirada temporalmente.
- [x] **Fase 8 — Plano real** *(2026-07-13)*: plano de mensura replicado como SVG interactivo (`PlanoParque.jsx`): 4 manzanas, 41 lotes con superficies reales + tira comercial de 24 locales, calles, arbolado, accesos, espacio verde y norte. `lotes.json` reescrito con los datos reales.
- [x] **Fase 9 — Perspectivas y rediseño de Características** *(2026-07-13)*: nueva sección "Perspectivas" entre Ubicación y Características (`Perspectivas.jsx`): carousel de 9 renders del parque con frase superpuesta, autoplay pausable, swipe, flechas de teclado y de texto en los laterales, indicadores + contador. Sección Características rediseñada: de cards con caja a ítems en fila (ícono + título, sin fondo ni borde).
- [x] **Fase 10 — Renombre Mapa→Plano y scaffold Inversión** *(2026-07-13)*: `pages/Mapa.jsx` renombrado a `pages/Plano.jsx` (ruta `/plano`, link "Plano" en navbar). Nueva página `pages/Inversion.jsx` (ruta `/inversion-beneficios`, título "Inversión y Beneficios", link "Inversión" en navbar) creada como scaffold vacío a la espera del contenido real.
- [x] **Fase 11 — Ventajas y Footer** *(2026-07-13)*: sección "Ventajas de instalarse en Indupark" al final de Inicio (`VentajasParque.jsx`: 5 ítems con íconos SVG que se dibujan trazo a trazo y quedan con loops sutiles permanentes) y `Footer.jsx` global (fondo más oscuro `#06122e`, contenido centrado: marca + tagline y legal con año dinámico; sin navegación ni datos de contacto todavía).
- [x] **Fase 12 — Ajustes finos de Ubicación** *(2026-07-13)*: hover/focus sobre el punto central de Indupark en `MapaDistancias.jsx` dibuja las 8 rutas en cascada y muestra todos los kilometrajes; etiqueta "Indupark" reposicionada a la izquierda del círculo central (antes iba debajo).
- [x] **Fase 13 — Rediseño de la página Plano** *(2026-07-13)*: título con `TituloSeccion` (estilo Inicio, prop `as="h1"`), plano apaisado fiel al de mensura — sin arbolado, espacio verde ni leyenda; ruta al pie y rosa de los vientos con el norte a la derecha —, etiquetas abreviadas (L1…L41 / A1…A24), mapa a ancho completo y burbuja con los datos del lote que sigue el cursor (hover) o se fija (click/tap/Enter) con link "Consultar" que preselecciona el lote en Contacto (`?lote=<nombre>`). Locales renombrados a "Local A<n>" en `lotes.json`; `LoteCard` y `PanelLote` eliminados; fix del select de Contacto (usaba `medidas`, campo inexistente).
- [ ] **Fase 6 — Responsive**: ajuste de grillas, hero por pasos, nav y plano en móvil; `npm run build` limpio
- [x] **Fase 14 — Rediseño de Contacto y plantilla de email** *(2026-07-14)*: página Contacto alineada al resto del sitio (`TituloSeccion as="h1"`, `seccion-contenido-ancha`, `Reveal`, párrafo de introducción). Se armó la plantilla HTML de confirmación al cliente (`src/emails/confirmacion-consulta.html`, franjas navy de marca + cuerpo claro para legibilidad en email) y se dejó `enviarConsulta()` estructurado para el envío real (arma los parámetros de plantilla; `.env.example` con las variables de EmailJS) — sigue simulado hasta que el dueño tenga cuenta/credenciales.
- [x] **Fase 15 — Íconos y ajustes del formulario de Contacto** *(2026-07-14)*: ícono lineal sutil por campo (nombre, email, teléfono, lote, mensaje), línea inferior que crece al foco (mismo lenguaje que `.link-texto`), fix de autofill del navegador pintando los inputs de blanco (`:-webkit-autofill` + `color-scheme: dark`), el select de lote ahora solo muestra el nombre (sin superficie).
- [x] **Fase 16 — Botón flotante de WhatsApp y botón de envío** *(2026-07-14)*: `BotonWhatsApp.jsx`, botón flotante clásico (círculo verde, esquina inferior izquierda) montado solo en Contacto — número real pendiente del dueño. Botón "Enviar consulta" (`.boton-enviar`) rediseñado con contorno fino de 1px (sin relleno), única excepción deliberada a la regla "solo texto" del resto del sitio.

## Pendientes que dependen de material del dueño

- [ ] **Pin exacto de Google Maps**: coordenadas del padrón 166293 (hoy el link es una búsqueda aproximada de Ruta 38 / Villa Belgrano)
- [ ] **Superficies de los locales**: los 24 locales de la tira comercial no tienen superficie en el plano
- [ ] **Distancia a Santiago del Estero**: el diagrama muestra "Aeropuerto" sin km
- [ ] **Imagen para Motivación**: prevista a la izquierda del texto justificado
- [ ] **Render faltante en Perspectivas**: `perspectiva-4.jpg` repite el render de "Calles internas"; falta el render real de "Acceso de doble carril con vigilancia las 24 horas"
- [ ] **Contenido de Inversión y Beneficios**: planes de pago, financiamiento propio o bancario, beneficios, moneda, plazos — hoy la página es solo un scaffold vacío
- [ ] **Datos de contacto para el Footer**: teléfono, email y/o redes sociales — hoy el footer solo tiene marca, tagline y navegación
- [ ] **Empresas reales**: reincorporar la página Empresas con logos cuando haya compradores (vinculadas al campo `comprador` de `lotes.json`)
- [ ] **Email real**: crear la cuenta de EmailJS (o Resend), cargar la plantilla `src/emails/confirmacion-consulta.html` como "Confirmación al cliente" y completar `.env` con `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_CONFIRMACION_CLIENTE` y `VITE_EMAILJS_PUBLIC_KEY` — el código de `enviarConsulta()` ya queda listo para conectar (ver comentario en el archivo)
- [ ] **Número de WhatsApp**: `WHATSAPP_NUMERO` en `components/BotonWhatsApp.jsx` está vacío (formato internacional sin "+", ej. `"5493812345678"`); el botón flotante de Contacto se ve pero no navega hasta completarlo
- [ ] **Recorrido 3D**: ruta `/recorrido` con Three.js / react-three-fiber para recorrer el parque
