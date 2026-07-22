import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TituloSeccion from '../components/TituloSeccion'
import VistasPlano from '../components/VistasPlano'
import lotes from '../data/lotes.json'

const lotesPorId = Object.fromEntries(lotes.map((lote) => [lote.id, lote]))

function Plano() {
  const [vista, setVista] = useState('interactivo')

  return (
    <PageTransition>
      <main className="pagina">
        <div className="seccion-contenido seccion-contenido-ancha">
          <TituloSeccion as="h1" overline="Distribución del predio">
            {`Plano del parque ${vista}`}
          </TituloSeccion>

          <Reveal>
            <VistasPlano lotesPorId={lotesPorId} onCambioVista={setVista} />
          </Reveal>
        </div>
      </main>
    </PageTransition>
  )
}

export default Plano
