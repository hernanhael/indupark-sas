// Plano interactivo del parque, calcado del plano de mensura:
// 4 manzanas (41 lotes) + tira comercial de 24 locales, calles internas,
// arbolado perimetral, accesos y espacio verde.

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const aPuntos = (puntos) => puntos.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

const SUPERFICIES = {
  1: '9.136,89', 2: '4.083,71', 3: '4.257,83', 4: '4.257,83', 5: '4.257,83',
  6: '4.257,83', 7: '4.257,83', 8: '4.255,24', 9: '2.336,41', 10: '2.542,11',
  11: '2.492,49', 12: '2.442,88', 13: '2.393,27', 14: '2.306,76', 15: '2.277,68',
  16: '2.311,45', 17: '2.311,45', 18: '2.311,45', 19: '2.311,45', 20: '2.290,22',
  21: '2.277,68', 22: '2.412,54', 23: '2.419,27', 24: '2.412,54', 25: '2.412,54',
  26: '2.375,92', 27: '2.136,30', 28: '2.432,71', 29: '2.439,44', 30: '2.436,57',
  31: '2.443,29', 32: '2.418,34', 33: '3.393,98', 34: '3.882,25', 35: '3.882,84',
  36: '3.883,43', 37: '3.884,02', 38: '3.884,61', 39: '3.885,19', 40: '3.885,78',
  41: '3.878,65',
}

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

// --- Arbolado: perímetro + anillos alrededor de las manzanas B y C ---
function puntosSobrePoligono(vertices, paso) {
  const puntos = []
  for (let s = 0; s < vertices.length; s++) {
    const p0 = vertices[s]
    const p1 = vertices[(s + 1) % vertices.length]
    const largo = Math.hypot(p1[0] - p0[0], p1[1] - p0[1])
    const n = Math.max(1, Math.round(largo / paso))
    for (let i = s === 0 ? 0 : 1; i <= n; i++) {
      puntos.push(lerp(p0, p1, i / n))
    }
  }
  return puntos
}

const PERIMETRO = [[88, 106], [1080, 30], [1102, 620], [300, 692], [76, 642]]

const arboles = [
  ...puntosSobrePoligono([[96, 116], [1070, 44], [1090, 612], [305, 680], [88, 634]], 42),
  ...puntosSobrePoligono([[320, 100], [606, 100], [606, 540], [320, 540]], 40),
  ...puntosSobrePoligono([[612, 84], [898, 84], [898, 534], [612, 534]], 40),
]

function PlanoParque({ lotesPorId, idSeleccionado, onSeleccionar }) {
  const renderEtiqueta = (lote) => {
    const [cx, cy] = lote.rect
      ? [lote.rect.x + lote.rect.w / 2, lote.rect.y + lote.rect.h / 2]
      : centroide(lote.puntos)
    const estado = lotesPorId[lote.id]?.estado ?? 'disponible'
    const claseTexto = `plano-etiqueta${estado === 'vendido' ? ' plano-etiqueta-vendido' : ''}`

    if (lote.tamano === 'mini') {
      const [tx, ty] = lote.puntos[0]
      return (
        <text key={`et-${lote.id}`} className={claseTexto} x={(tx + lote.puntos[1][0]) / 2} y={ty + 16} textAnchor="middle" fontSize="8.5" style={{ pointerEvents: 'none' }}>
          {lote.numero}
        </text>
      )
    }

    const esGrande = lote.tamano === 'grande'
    return (
      <text key={`et-${lote.id}`} className={claseTexto} x={cx} y={cy - 2} textAnchor="middle" style={{ pointerEvents: 'none' }}>
        <tspan fontSize={esGrande ? 15 : 11.5} fontWeight="700">{`LOTE ${lote.numero}`}</tspan>
        <tspan x={cx} dy={esGrande ? 15 : 11.5} fontSize={esGrande ? 10.5 : 8.5}>
          {`${SUPERFICIES[lote.numero]} m²`}
        </tspan>
      </text>
    )
  }

  const renderLote = (lote) => {
    const dato = lotesPorId[lote.id]
    const estado = dato?.estado ?? 'disponible'
    const clases = [
      'plano-lote',
      `plano-lote-${estado}`,
      idSeleccionado === lote.id ? 'plano-lote-seleccionado' : '',
    ].join(' ')
    const props = {
      className: clases,
      onClick: () => onSeleccionar(lote.id),
      tabIndex: 0,
      role: 'button',
      'aria-label': `Lote ${lote.numero}, ${estado}`,
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSeleccionar(lote.id)
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

  return (
    <svg className="plano-parque" viewBox="0 0 1190 715" role="group" aria-label="Plano de lotes del parque">
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

      {/* Espacio verde (esquina inferior derecha) */}
      <polygon points="1000,610 1088,592 1091,618 1003,636" className="plano-espacio-verde" />

      {/* Lotes */}
      {lotesSinClip.map(renderLote)}
      <g clipPath="url(#clip-manzana-b)">{lotesConClip('clip-manzana-b').map(renderLote)}</g>
      <g clipPath="url(#clip-manzana-c)">{lotesConClip('clip-manzana-c').map(renderLote)}</g>

      {/* Contornos redondeados de las manzanas centrales */}
      <rect x="332" y="112" width="262" height="416" rx="36" className="plano-contorno" />
      <rect x="624" y="96" width="262" height="426" rx="36" className="plano-contorno" />

      {/* Etiquetas */}
      {lotes.map(renderEtiqueta)}

      {/* Arbolado */}
      <g className="plano-arboles">
        {arboles.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="5" />
        ))}
      </g>

      {/* Accesos */}
      <g transform="translate(316, 664) rotate(-6)">
        <rect x="-32" y="-10" width="64" height="20" className="plano-acceso-caja" />
        <text x="0" y="4" textAnchor="middle" className="plano-acceso-texto">ACCESO</text>
      </g>
      <g transform="translate(893, 632) rotate(-5)">
        <rect x="-32" y="-10" width="64" height="20" className="plano-acceso-caja" />
        <text x="0" y="4" textAnchor="middle" className="plano-acceso-texto">ACCESO</text>
      </g>

      {/* Norte */}
      <g transform="translate(1146, 58)">
        <circle r="17" className="plano-norte-circulo" />
        <path d="M0,9 L0,-9 M0,-9 L-4,-2 M0,-9 L4,-2" className="plano-norte-flecha" />
        <text x="0" y="34" textAnchor="middle" className="plano-norte-texto">N</text>
      </g>
    </svg>
  )
}

export default PlanoParque
