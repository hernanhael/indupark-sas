import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TransicionVideo from '../components/TransicionVideo'

const contenedorVariants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const lineaVariants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const beneficios = [
  {
    titulo: 'Ubicación estratégica',
    texto: 'Fácil acceso a rutas y vías principales.',
  },
  {
    titulo: 'Seguridad',
    texto: 'Vigilancia y control de accesos.',
  },
  {
    titulo: 'Infraestructura',
    texto: 'Servicios e infraestructura preparados para la industria.',
  },
  {
    titulo: 'Flexibilidad',
    texto: 'Lotes de distintas dimensiones según la necesidad de cada empresa.',
  },
]

function Inicio() {
  return (
    <PageTransition>
      <main>
        <section className="hero">
          <div className="hero-fondo" aria-hidden="true" />
          <motion.div
            className="hero-contenido"
            initial="oculto"
            animate="visible"
            variants={contenedorVariants}
          >
            <motion.h1 variants={lineaVariants}>Indupark SAS</motion.h1>
            <motion.p className="hero-tagline" variants={lineaVariants}>
              Parque industrial pensado para el crecimiento de tu empresa
            </motion.p>
          </motion.div>
        </section>

        <TransicionVideo video="/media/video-camion.mp4">
          <h2>Quiénes somos</h2>
          <p>Descripción institucional pendiente de definición por el dueño del proyecto.</p>
        </TransicionVideo>

        <Reveal className="seccion seccion-alterno">
          <div className="seccion-contenido">
            <h2>Ubicación</h2>
            <p>Información de acceso y ubicación pendiente de definición.</p>
            <div className="ubicacion-placeholder">Mapa / imagen de ubicación (pendiente)</div>
          </div>
        </Reveal>

        <Reveal className="seccion">
          <div className="seccion-contenido">
            <h2>Por qué elegir Indupark</h2>
            <div className="beneficios-grid">
              {beneficios.map(({ titulo, texto }) => (
                <div className="beneficio-item" key={titulo}>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
    </PageTransition>
  )
}

export default Inicio
