import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import LoteCard from '../components/LoteCard'
import lotes from '../data/lotes.json'

const ANCHO_LOTE = 180
const ALTO_LOTE = 180

const disposicionProvisoria = [
  { id: 'lote-1', x: 20, y: 20 },
  { id: 'lote-2', x: 220, y: 20 },
  { id: 'lote-3', x: 420, y: 20 },
  { id: 'lote-4', x: 620, y: 20 },
  { id: 'lote-5', x: 820, y: 20 },
  { id: 'lote-6', x: 20, y: 260 },
  { id: 'lote-7', x: 220, y: 260 },
  { id: 'lote-8', x: 420, y: 260 },
  { id: 'lote-9', x: 620, y: 260 },
  { id: 'lote-10', x: 820, y: 260 },
]

const lotesPorId = Object.fromEntries(lotes.map((lote) => [lote.id, lote]))

function Mapa() {
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const loteSeleccionado = idSeleccionado ? lotesPorId[idSeleccionado] : null

  return (
    <PageTransition>
      <main className="pagina">
        <h1>Mapa del parque</h1>
        <div className="mapa-contenedor">
          <svg viewBox="0 0 1040 460" className="mapa-svg" role="img" aria-label="Plano del parque industrial">
            <rect x="0" y="200" width="1040" height="60" className="camino" />
            <rect x="500" y="0" width="40" height="460" className="camino" />

            {disposicionProvisoria.map(({ id, x, y }) => {
              const lote = lotesPorId[id]
              if (!lote) return null
              return (
                <g key={id}>
                  <motion.rect
                    id={id}
                    x={x}
                    y={y}
                    width={ANCHO_LOTE}
                    height={ALTO_LOTE}
                    className={`lote lote-${lote.estado}`}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setIdSeleccionado(id)}
                  />
                  <text
                    x={x + ANCHO_LOTE / 2}
                    y={y + ALTO_LOTE / 2}
                    className="lote-numero"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ pointerEvents: 'none' }}
                  >
                    {lote.numero}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <AnimatePresence>
          {loteSeleccionado && (
            <LoteCard lote={loteSeleccionado} onCerrar={() => setIdSeleccionado(null)} />
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  )
}

export default Mapa
