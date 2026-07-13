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
- [ ] **Fase 6 — Responsive**: ajuste de grillas, hero por pasos, nav y plano en móvil; `npm run build` limpio

## Pendientes que dependen de material del dueño

- [ ] **Pin exacto de Google Maps**: coordenadas del padrón 166293 (hoy el link es una búsqueda aproximada de Ruta 38 / Villa Belgrano)
- [ ] **Superficies de los locales**: los 24 locales de la tira comercial no tienen superficie en el plano
- [ ] **Distancia a Santiago del Estero**: el diagrama muestra "Aeropuerto" sin km
- [ ] **Imagen para Motivación**: prevista a la izquierda del texto justificado
- [ ] **Render faltante en Perspectivas**: `perspectiva-4.jpg` repite el render de "Calles internas"; falta el render real de "Acceso de doble carril con vigilancia las 24 horas"
- [ ] **Contenido de Inversión y Beneficios**: planes de pago, financiamiento propio o bancario, beneficios, moneda, plazos — hoy la página es solo un scaffold vacío
- [ ] **Datos de contacto para el Footer**: teléfono, email y/o redes sociales — hoy el footer solo tiene marca, tagline y navegación
- [ ] **Empresas reales**: reincorporar la página Empresas con logos cuando haya compradores (vinculadas al campo `comprador` de `lotes.json`)
- [ ] **Email real**: conectar el formulario a EmailJS o Resend (reemplazar `enviarConsulta()`), con confirmación automática al usuario
- [ ] **Recorrido 3D**: ruta `/recorrido` con Three.js / react-three-fiber para recorrer el parque
