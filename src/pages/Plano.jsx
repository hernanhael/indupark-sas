import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import LoteCard from '../components/LoteCard'
import PlanoParque from '../components/PlanoParque'
import lotes from '../data/lotes.json'

const lotesPorId = Object.fromEntries(lotes.map((lote) => [lote.id, lote]))

function Plano() {
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const loteSeleccionado = idSeleccionado ? lotesPorId[idSeleccionado] : null

  return (
    <PageTransition>
      <main className="pagina">
        <h1>Plano del parque</h1>
        <p className="mapa-descripcion">
          Hacé clic en un lote para ver su superficie y disponibilidad.
        </p>

        <div className="plano-leyenda">
          <span className="plano-leyenda-item">
            <span className="plano-leyenda-color leyenda-disponible" /> Disponible
          </span>
          <span className="plano-leyenda-item">
            <span className="plano-leyenda-color leyenda-vendido" /> Vendido
          </span>
          <span className="plano-leyenda-item">
            <span className="plano-leyenda-color leyenda-verde" /> Espacio verde
          </span>
        </div>

        <div className="mapa-contenedor">
          <PlanoParque
            lotesPorId={lotesPorId}
            idSeleccionado={idSeleccionado}
            onSeleccionar={setIdSeleccionado}
          />
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

export default Plano
