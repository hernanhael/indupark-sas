import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

const empresas = [
  { nombre: 'Empresa Ejemplo 1' },
  { nombre: 'Empresa Ejemplo 2' },
  { nombre: 'Empresa Ejemplo 3' },
  { nombre: 'Empresa Ejemplo 4' },
]

const pista = [...empresas, ...empresas]

function Empresas() {
  return (
    <PageTransition>
      <main className="pagina">
        <h1>Empresas instaladas</h1>
        <Reveal>
          <p className="empresas-leyenda">Próximamente — logos de las empresas instaladas en el parque.</p>
          <div className="marquee-contenedor">
            <div className="marquee-pista">
              {pista.map((empresa, indice) => (
                <div className="marquee-logo" key={`${empresa.nombre}-${indice}`}>
                  {empresa.nombre}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
    </PageTransition>
  )
}

export default Empresas
