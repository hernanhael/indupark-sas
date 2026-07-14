import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TituloSeccion from '../components/TituloSeccion'
import PlanoParque from '../components/PlanoParque'
import lotes from '../data/lotes.json'

const lotesPorId = Object.fromEntries(lotes.map((lote) => [lote.id, lote]))

function Plano() {
  return (
    <PageTransition>
      <main className="pagina">
        <div className="seccion-contenido seccion-contenido-ancha">
          <TituloSeccion as="h1" overline="Distribución del predio">
            Plano del parque
          </TituloSeccion>

          <Reveal>
            <PlanoParque lotesPorId={lotesPorId} />
          </Reveal>
        </div>
      </main>
    </PageTransition>
  )
}

export default Plano
