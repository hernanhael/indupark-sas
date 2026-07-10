# Roadmap — Indupark SAS

## Fases de desarrollo

- [x] **Fase 0 — Documentación**: PLAN.md, CLAUDE.md, ROADMAP.md *(2026-07-06)*
- [x] **Fase 1 — Base del proyecto**: scaffold Vite + React, instalar `react-router-dom` y `framer-motion`, estructura de carpetas, `global.css` con paleta y tipografía
- [x] **Fase 2 — Layout global**: router, Navbar integrada (sin delimitación), transición entre páginas, scroll-to-top al navegar, botón "ir arriba"
- [x] **Fase 3 — Página Inicio**: hero animado, descripción, ubicación, beneficios, fondo con animación sutil tipo blueprint
- [x] **Fase 4 — Mapa interactivo**: `lotes.json`, SVG provisorio, colores por estado, hover, card de lote
- [x] **Fase 5 — Empresas y Contacto**: marquee de logos placeholder + formulario con envío simulado
- [ ] **Fase 6 — Responsive**: ajuste de grillas, nav y mapa en móvil; `npm run build` limpio

## Fases futuras (dependen de material del dueño)

- [ ] **Plano real**: reemplazar el SVG provisorio por el plano real del loteo (asignar ids `lote-<n>` a cada polígono)
- [ ] **Media del hero**: incorporar videos/imágenes de presentación en `public/media/`
- [ ] **Empresas reales**: cargar logos y nombres de las empresas que adquieran lotes (vinculadas al campo `comprador` de `lotes.json`)
- [ ] **Email real**: conectar el formulario a EmailJS o Resend (reemplazar `enviarConsulta()`), con confirmación automática al usuario
- [ ] **Recorrido 3D**: ruta `/recorrido` con Three.js / react-three-fiber para recorrer el parque
