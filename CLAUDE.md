# Indupark SAS — Sitio web del parque industrial

## Estado actual

**Fases 1 a 5 del `PLAN.md` completas** (scaffold, layout global, Inicio, Mapa interactivo, Empresas y Contacto). Queda pendiente la Fase 6 (responsive). Ver `ROADMAP.md` para el detalle de fases y lo que depende del dueño del proyecto.

## Qué es

Sitio web de un parque industrial: presentación institucional, mapa interactivo de lotes (disponibles/vendidos), empresas instaladas, formulario de contacto y, a futuro, un recorrido 3D. Todo el contenido es en **español**.

## Stack (ya decidido — no cambiar sin consultar)

- Vite + React, **JavaScript sin TypeScript**
- `react-router-dom` — cada sección es una página/ruta: `/`, `/mapa`, `/empresas`, `/contacto`
- `framer-motion` — transiciones de página y animaciones de aparición al scrollear
- CSS plano con variables en `:root` — **sin Tailwind ni librerías de UI**

## Comandos

```
npm run dev      # servidor de desarrollo
npm run build    # build de producción
```

## Reglas de diseño (pedidas explícitamente por el dueño del proyecto)

- Fondo azul francia oscuro (`#0f2557` aprox.), texto blanco, estilo **sumamente minimalista**.
- Botones y links: **solo texto**, sin forma de botón — hover con `border-bottom` que aparece/crece. Sin cajas, sin fondos, sin sombras.
- Navbar **sin delimitación**: mismo fondo que el contenido, sin borde ni sombra; el paso del nav al contenido debe ser natural y continuo.
- Animaciones de aparición al scrollear se disparan **una sola vez** (`viewport={{ once: true }}`), no cada vez que el elemento reentra.
- Botón "ir arriba" flotante: mediano (~44px), mínimamente visible (opacidad baja, sube al hover), aparece solo tras scrollear.
- Mapa de lotes: verde = disponible, rojo = vendido; hover agranda levemente el lote; click abre card con número, medidas y comprador.

## Datos de lotes

`src/data/lotes.json` es la **única fuente de verdad** de los lotes. Un registro por lote:

```json
{ "id": "lote-12", "numero": 12, "medidas": "50m x 80m (4.000 m²)",
  "estado": "vendido", "comprador": "Empresa X" }
```

- `id` sigue la convención `lote-<numero>` y debe coincidir con el `id` del elemento SVG del plano.
- `estado`: `"disponible"` o `"vendido"`. Si es vendido, `comprador` lleva el nombre de la empresa.
- Para marcar una venta se edita este JSON a mano; el mapa se repinta solo.

## Documentos de referencia

- `PLAN.md` — plan de implementación completo (arquitectura, páginas, orden de trabajo, verificación).
- `ROADMAP.md` — fases con estado y pendientes que dependen del dueño (plano real, logos, email real, 3D).

## Pendientes que dependen del dueño (no inventar)

- Plano real del loteo (hoy se usa un SVG provisorio).
- Videos/imágenes del hero (van en `public/media/`).
- Textos institucionales, medidas reales de lotes y datos de los vendedores.
- El envío de email del formulario está **simulado**; la función `enviarConsulta()` se reemplazará por EmailJS/Resend más adelante.
