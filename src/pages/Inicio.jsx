import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TituloSeccion from '../components/TituloSeccion'
import MapaDistancias from '../components/MapaDistancias'
import Perspectivas from '../components/Perspectivas'
import CaracteristicasParque from '../components/CaracteristicasParque'

// TODO: reemplazar por el pin exacto del padrón 166293 cuando tengamos las coordenadas
const ENLACE_GOOGLE_MAPS =
  'https://www.google.com/maps/search/?api=1&query=Ruta+38+Villa+Belgrano+R%C3%ADo+Chico+Tucum%C3%A1n'

const contenedorVariants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const lineaVariants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const transicionCapa = { duration: 0.6, ease: 'easeInOut' }

const TOTAL_PASOS = 5 // banner + 4 párrafos

function Inicio() {
  const heroRef = useRef(null)
  const [paso, setPaso] = useState(0)
  const animandoRef = useRef(false)

  useEffect(() => {
    const estaEnViewport = () => {
      const seccion = heroRef.current
      if (!seccion) return false
      const rect = seccion.getBoundingClientRect()
      return rect.top <= 0 && rect.bottom >= window.innerHeight - 1
    }

    const avanzar = (bajando) => {
      animandoRef.current = true
      setPaso((actual) => (bajando ? Math.min(actual + 1, TOTAL_PASOS - 1) : Math.max(actual - 1, 0)))
      setTimeout(() => {
        animandoRef.current = false
      }, 650)
    }

    const manejarWheel = (evento) => {
      if (!estaEnViewport()) return
      const bajando = evento.deltaY > 0
      const puedeAvanzar = bajando ? paso < TOTAL_PASOS - 1 : paso > 0
      if (!puedeAvanzar) return
      evento.preventDefault()
      if (!animandoRef.current) avanzar(bajando)
    }

    let inicioToqueY = null

    const manejarToqueInicio = (evento) => {
      inicioToqueY = evento.touches[0].clientY
    }

    const manejarToqueMovimiento = (evento) => {
      if (inicioToqueY === null || !estaEnViewport()) return
      const deltaY = inicioToqueY - evento.touches[0].clientY
      const bajando = deltaY > 35
      const subiendo = deltaY < -35
      if (!bajando && !subiendo) return
      const puedeAvanzar = bajando ? paso < TOTAL_PASOS - 1 : paso > 0
      if (!puedeAvanzar) return
      evento.preventDefault()
      if (!animandoRef.current) {
        avanzar(bajando)
        inicioToqueY = evento.touches[0].clientY
      }
    }

    window.addEventListener('wheel', manejarWheel, { passive: false })
    window.addEventListener('touchstart', manejarToqueInicio, { passive: true })
    window.addEventListener('touchmove', manejarToqueMovimiento, { passive: false })
    return () => {
      window.removeEventListener('wheel', manejarWheel)
      window.removeEventListener('touchstart', manejarToqueInicio)
      window.removeEventListener('touchmove', manejarToqueMovimiento)
    }
  }, [paso])

  return (
    <PageTransition>
      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero-sticky">
            <div className="hero-fondo" aria-hidden="true" />
            <div className="hero-fundido" aria-hidden="true" />

            <motion.div
              className="hero-capa hero-contenido"
              initial={false}
              animate={{ opacity: paso === 0 ? 1 : 0 }}
              transition={transicionCapa}
            >
              <motion.div initial="oculto" animate="visible" variants={contenedorVariants}>
                <motion.h1 variants={lineaVariants}>Indupark - Río Chico</motion.h1>
                <motion.p className="hero-tagline" variants={lineaVariants}>
                  Parque logístico y comercial
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-capa hero-texto-descriptivo"
              initial={false}
              animate={{ opacity: paso === 1 ? 1 : 0 }}
              transition={transicionCapa}
            >
              <p>
                En el corazón productivo del sur tucumano, el futuro se construye trabajando. Así
                nace Indupark: un parque logístico y comercial de 18 hectáreas pensado para el
                crecimiento empresarial.
              </p>
            </motion.div>

            <motion.div
              className="hero-capa hero-texto-descriptivo"
              initial={false}
              animate={{ opacity: paso === 2 ? 1 : 0 }}
              transition={transicionCapa}
            >
              <p>
                El predio está organizado en 4 manzanas conectadas por calles amplias, diseñadas
                para la circulación de vehículos de gran porte. Cada manzana se subdivide en 54
                lotes, con una superficie mínima de 2000 m2, ampliable según las necesidades de
                cada empresa.
              </p>
            </motion.div>

            <motion.div
              className="hero-capa hero-texto-descriptivo"
              initial={false}
              animate={{ opacity: paso === 3 ? 1 : 0 }}
              transition={transicionCapa}
            >
              <p>
                Indupark está ubicado en el departamento de Río Chico, Comuna Rural de Santa Ana,
                sobre la ruta 38 —conocida como el Camino de la Producción—. Se encuentra a 90 km
                de San Miguel de Tucumán, 100 km de Termas de Río Hondo y 120 km de San Fernando
                del Valle de Catamarca, rodeado por Aguilares (6 km), Alberdi (7 km), Concepción
                (16 km) y La Cocha (27 km).
              </p>
            </motion.div>

            <motion.div
              className="hero-capa hero-texto-descriptivo"
              initial={false}
              animate={{ opacity: paso === 4 ? 1 : 0 }}
              transition={transicionCapa}
            >
              <p>
                Es una zona productiva —agrícola, industrial y comercial— de alta densidad
                poblacional, muy transitada y con abundante mano de obra calificada.
              </p>
            </motion.div>
          </div>
        </section>

        <Reveal className="seccion">
          <div className="seccion-contenido seccion-contenido-ancha">
            <TituloSeccion overline="Motivación">Por qué elegir Indupark</TituloSeccion>
            <p className="motivacion-texto">
              Lo que nos impulsa a hacer este emprendimiento es la posibilidad de aportar al
              sector productivo de nuestra provincia. Por eso diseñamos y estamos construyendo un
              sitio donde las empresas encuentran los servicios y el espacio necesarios para hacer
              más eficiente su actividad. Así revalorizamos la zona y generamos un polo de trabajo
              para los vecinos del lugar. Llevamos adelante este proyecto con altos estándares en
              construcción, seguridad, arquitectura y sustentabilidad. En Indupark estamos
              preparando el terreno para el futuro.
            </p>
          </div>
        </Reveal>

        <section className="seccion">
          <div className="seccion-contenido seccion-contenido-ancha">
            <TituloSeccion overline="Dónde estamos">Ubicación</TituloSeccion>
            <div className="ubicacion-grid">
              <Reveal className="ubicacion-columna-mapa">
                <a
                  className="ubicacion-mapa-enlace"
                  href={ENLACE_GOOGLE_MAPS}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="ubicacion-marco">
                    <img
                      src="/media/mapa-padron.jpg"
                      alt="Vista satelital del padrón 166293 sobre la ruta 38"
                    />
                    <span className="ubicacion-etiqueta">Ver en Google Maps ↗</span>
                  </span>
                </a>
                <p className="ubicacion-descripcion">
                  Padrón 166293 — sobre la Ruta 38, a la altura de Villa Belgrano, Comuna Rural de
                  Santa Ana, departamento de Río Chico.
                </p>
              </Reveal>
              <Reveal className="ubicacion-columna-diagrama">
                <MapaDistancias />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="seccion">
          <div className="seccion-contenido seccion-contenido-ancha">
            <TituloSeccion overline="Pensado para tu operación">Perspectivas</TituloSeccion>
            <Reveal>
              <Perspectivas />
            </Reveal>
          </div>
        </section>

        <section className="seccion">
          <div className="seccion-contenido seccion-contenido-ancha">
            <TituloSeccion overline="Servicios e infraestructura">
              Características del parque
            </TituloSeccion>
            <CaracteristicasParque />
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

export default Inicio
