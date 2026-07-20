// Plano interactivo del parque, calcado del plano de mensura, en formato
// apaisado (1190 × 748): la manzana de los lotes 33-41 queda a la izquierda
// y la de los lotes 1-8 a la derecha, por lo que el norte apunta a la derecha.
// 4 manzanas (41 lotes) + tira comercial de 24 locales, calles internas,
// accesos y la ruta al pie. Etiquetas abreviadas (L1…L41 / A1…A24); los datos
// del lote salen en una burbuja que sigue el cursor (hover) o se fija (click).

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const aPuntos = (puntos) => puntos.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

const centroide = (puntos) => {
  const sx = puntos.reduce((s, p) => s + p[0], 0)
  const sy = puntos.reduce((s, p) => s + p[1], 0)
  return [sx / puntos.length, sy / puntos.length]
}

const lotes = []

// --- Manzana A (izquierda): lotes 41 a 33, franjas horizontales ---
{
  const L0 = [96, 120]
  const L1 = [84, 638]
  const R0 = [302, 112]
  const R1 = [302, 600]
  for (let i = 0; i < 9; i++) {
    const t0 = i / 9
    const t1 = (i + 1) / 9
    const puntos = [lerp(L0, L1, t0), lerp(R0, R1, t0), lerp(R0, R1, t1), lerp(L0, L1, t1)]
    lotes.push({ id: `lote-${41 - i}`, numero: 41 - i, puntos, tamano: 'medio' })
  }
}

// --- Manzana B (centro-izquierda): 32-27 y 26-21 en dos columnas ---
{
  const y0 = 112
  const y1 = 528
  const alto = (y1 - y0) / 6
  for (let i = 0; i < 6; i++) {
    lotes.push({
      id: `lote-${32 - i}`, numero: 32 - i, clip: 'clip-manzana-b', tamano: 'medio',
      rect: { x: 332, y: y0 + i * alto, w: 131, h: alto },
    })
    lotes.push({
      id: `lote-${26 - i}`, numero: 26 - i, clip: 'clip-manzana-b', tamano: 'medio',
      rect: { x: 463, y: y0 + i * alto, w: 131, h: alto },
    })
  }
}

// --- Manzana C (centro-derecha): 20-15 y 14-9 en dos columnas ---
{
  const y0 = 96
  const y1 = 522
  const alto = (y1 - y0) / 6
  for (let i = 0; i < 6; i++) {
    lotes.push({
      id: `lote-${20 - i}`, numero: 20 - i, clip: 'clip-manzana-c', tamano: 'medio',
      rect: { x: 624, y: y0 + i * alto, w: 131, h: alto },
    })
    lotes.push({
      id: `lote-${14 - i}`, numero: 14 - i, clip: 'clip-manzana-c', tamano: 'medio',
      rect: { x: 755, y: y0 + i * alto, w: 131, h: alto },
    })
  }
}

// --- Manzana D (derecha): lote 8 arriba, franjas 7-2, lote 1 grande abajo ---
{
  const bordeDerecho = (y) => 1078 + ((y - 40) * 20) / 574

  lotes.push({
    id: 'lote-8', numero: 8, tamano: 'medio',
    puntos: [[916, 72], [1078, 40], [bordeDerecho(128), 128], [916, 128]],
  })

  const yTop = 128
  const yBase = 477
  const alto = (yBase - yTop) / 6
  for (let k = 0; k < 6; k++) {
    const yA = yTop + k * alto
    const yB = yTop + (k + 1) * alto
    lotes.push({
      id: `lote-${7 - k}`, numero: 7 - k, tamano: 'medio',
      puntos: [[916, yA], [bordeDerecho(yA), yA], [bordeDerecho(yB), yB], [916, yB]],
    })
  }

  lotes.push({
    id: 'lote-1', numero: 1, tamano: 'grande',
    puntos: [[916, 477], [bordeDerecho(477), 477], [bordeDerecho(614), 614], [916, 614]],
  })
}

// --- Tira comercial: 24 locales angostos, numerados 24→1 de izquierda a derecha ---
{
  const T0 = [352, 560]
  const T1 = [866, 536]
  const B0 = [352, 642]
  const B1 = [866, 600]
  for (let j = 0; j < 24; j++) {
    const t0 = j / 24
    const t1 = (j + 1) / 24
    lotes.push({
      id: `local-${24 - j}`, numero: 24 - j, tamano: 'mini',
      puntos: [lerp(T0, T1, t0), lerp(T0, T1, t1), lerp(B0, B1, t1), lerp(B0, B1, t0)],
    })
  }
}

const PERIMETRO = [[88, 106], [1080, 30], [1102, 620], [300, 692], [76, 642]]

const VIEWBOX = { ancho: 1190, alto: 748 }

const centroDeLote = (lote) =>
  lote.rect
    ? [lote.rect.x + lote.rect.w / 2, lote.rect.y + lote.rect.h / 2]
    : centroide(lote.puntos)

function PlanoParque({ lotesPorId }) {
  const envoltorioRef = useRef(null)
  const [foco, setFoco] = useState(null) // { id, x, y } — burbuja que sigue el cursor
  const [fijada, setFijada] = useState(null) // { id, x, y } — burbuja fijada con click/tap

  // Mantiene la burbuja dentro del ancho del mapa y con lugar arriba del cursor
  const clamparPos = (x, y, rect) => ({
    x: Math.min(Math.max(x, 90), rect.width - 90),
    y: Math.max(y, 90),
  })

  const posDesdeEvento = (evento) => {
    const rect = envoltorioRef.current.getBoundingClientRect()
    return clamparPos(evento.clientX - rect.left, evento.clientY - rect.top, rect)
  }

  const posDesdeLote = (lote) => {
    const rect = envoltorioRef.current.getBoundingClientRect()
    const [cx, cy] = centroDeLote(lote)
    return clamparPos((cx * rect.width) / VIEWBOX.ancho, (cy * rect.height) / VIEWBOX.alto, rect)
  }

  const alternarFijada = (lote, pos) =>
    setFijada((anterior) => (anterior?.id === lote.id ? null : { id: lote.id, ...pos }))

  const renderEtiqueta = (lote) => {
    const [cx, cy] = lote.rect
      ? [lote.rect.x + lote.rect.w / 2, lote.rect.y + lote.rect.h / 2]
      : centroide(lote.puntos)
    const estado = lotesPorId[lote.id]?.estado ?? 'disponible'
    const claseTexto = `plano-etiqueta${estado === 'vendido' ? ' plano-etiqueta-vendido' : ''}`

    if (lote.tamano === 'mini') {
      const [tx, ty] = lote.puntos[0]
      return (
        <text key={`et-${lote.id}`} className={claseTexto} x={(tx + lote.puntos[1][0]) / 2} y={ty + 16} textAnchor="middle" fontSize="9" fontWeight="700" style={{ pointerEvents: 'none' }}>
          {`A${lote.numero}`}
        </text>
      )
    }

    const esGrande = lote.tamano === 'grande'
    return (
      <text key={`et-${lote.id}`} className={claseTexto} x={cx} y={cy + 5} textAnchor="middle" fontSize={esGrande ? 18 : 13} fontWeight="700" style={{ pointerEvents: 'none' }}>
        {`L${lote.numero}`}
      </text>
    )
  }

  const renderLote = (lote) => {
    const dato = lotesPorId[lote.id]
    const estado = dato?.estado ?? 'disponible'
    const clases = [
      'plano-lote',
      `plano-lote-${estado}`,
      fijada?.id === lote.id ? 'plano-lote-seleccionado' : '',
    ].join(' ')
    const props = {
      className: clases,
      onClick: (e) => {
        e.stopPropagation()
        alternarFijada(lote, posDesdeEvento(e))
      },
      onMouseMove: (e) => setFoco({ id: lote.id, ...posDesdeEvento(e) }),
      onMouseLeave: () => setFoco(null),
      onFocus: () => setFoco({ id: lote.id, ...posDesdeLote(lote) }),
      onBlur: () => setFoco(null),
      tabIndex: 0,
      role: 'button',
      'aria-label': `${lote.id.startsWith('local-') ? `Local A${lote.numero}` : `Lote ${lote.numero}`}, ${estado}`,
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          alternarFijada(lote, posDesdeLote(lote))
        }
      },
    }
    if (lote.rect) {
      return <rect key={lote.id} x={lote.rect.x} y={lote.rect.y} width={lote.rect.w} height={lote.rect.h} {...props} />
    }
    return <polygon key={lote.id} points={aPuntos(lote.puntos)} {...props} />
  }

  const lotesConClip = (clipId) => lotes.filter((l) => l.clip === clipId)
  const lotesSinClip = lotes.filter((l) => !l.clip)

  // La burbuja fijada tiene prioridad salvo que se esté hoovereando otro lote
  const burbuja =
    fijada && (!foco || foco.id === fijada.id)
      ? { ...fijada, esFijada: true }
      : foco
        ? { ...foco, esFijada: false }
        : null
  const datoBurbuja = burbuja ? lotesPorId[burbuja.id] : null

  return (
    <div className="plano-envoltorio" ref={envoltorioRef} onClick={() => setFijada(null)}>
      <svg className="plano-parque" viewBox="0 0 1190 748" role="group" aria-label="Plano de lotes del parque">
      <defs>
        <clipPath id="clip-manzana-b">
          <rect x="332" y="112" width="262" height="416" rx="36" />
        </clipPath>
        <clipPath id="clip-manzana-c">
          <rect x="624" y="96" width="262" height="426" rx="36" />
        </clipPath>
      </defs>

      {/* Calles: el polígono oscuro de base */}
      <polygon points={aPuntos(PERIMETRO)} className="plano-calles" />

      {/* Lotes */}
      {lotesSinClip.map(renderLote)}
      <g clipPath="url(#clip-manzana-b)">{lotesConClip('clip-manzana-b').map(renderLote)}</g>
      <g clipPath="url(#clip-manzana-c)">{lotesConClip('clip-manzana-c').map(renderLote)}</g>

      {/* Contornos redondeados de las manzanas centrales */}
      <rect x="332" y="112" width="262" height="416" rx="36" className="plano-contorno" />
      <rect x="624" y="96" width="262" height="426" rx="36" className="plano-contorno" />

      {/* Etiquetas */}
      {lotes.map(renderEtiqueta)}

      {/* Ruta al pie del predio */}
      <g className="plano-ruta">
        <line x1="40" y1="731" x2="1150" y2="632" />
        <line x1="40" y1="743" x2="1150" y2="644" />
      </g>

      {/* Accesos (sobre el frente que da a la ruta) */}
      <g transform="translate(316, 664) rotate(-6)">
        <rect x="-32" y="-10" width="64" height="20" className="plano-acceso-caja" />
        <text x="0" y="4" textAnchor="middle" className="plano-acceso-texto">ACCESO</text>
      </g>
      <g transform="translate(893, 632) rotate(-5)">
        <rect x="-32" y="-10" width="64" height="20" className="plano-acceso-caja" />
        <text x="0" y="4" textAnchor="middle" className="plano-acceso-texto">ACCESO</text>
      </g>

      {/* Norte: rosa de los vientos con el brazo largo (N) apuntando a la derecha */}
      <g transform="translate(1130, 58)">
        <g transform="rotate(90)">
          <path
            className="plano-norte-estrella"
            d="M0,-26 L3.2,-3.2 L15,0 L3.2,3.2 L0,15 L-3.2,3.2 L-15,0 L-3.2,-3.2 Z"
          />
          <path
            className="plano-norte-relleno"
            d="M0,-26 L3.2,-3.2 L0,0 Z M15,0 L3.2,3.2 L0,0 Z M0,15 L-3.2,3.2 L0,0 Z M-15,0 L-3.2,-3.2 L0,0 Z"
          />
        </g>
        <text x="38" y="4" textAnchor="middle" className="plano-norte-texto">N</text>
      </g>
      </svg>

      {/* Burbuja con los datos del lote */}
      <AnimatePresence>
        {datoBurbuja && (
          <motion.div
            key="burbuja"
            className={`plano-burbuja${burbuja.esFijada ? ' plano-burbuja-fijada' : ''}`}
            style={{ left: burbuja.x, top: burbuja.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            role="status"
          >
            <span className="plano-burbuja-nombre">{datoBurbuja.nombre}</span>
            {datoBurbuja.superficie && (
              <span className="plano-burbuja-superficie">{datoBurbuja.superficie}</span>
            )}
            <span className={`plano-burbuja-estado plano-burbuja-${datoBurbuja.estado}`}>
              {datoBurbuja.estado === 'vendido' ? 'Vendido' : 'Disponible'}
            </span>
            {datoBurbuja.estado === 'vendido' && datoBurbuja.comprador && (
              <span className="plano-burbuja-superficie">{datoBurbuja.comprador}</span>
            )}
            {burbuja.esFijada && datoBurbuja.estado === 'disponible' && (
              <Link className="link-texto plano-burbuja-cta" to="/contacto">
                Consultar
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlanoParque
