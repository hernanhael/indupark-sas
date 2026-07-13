import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DIAPOSITIVAS = [
  {
    src: '/media/perspectivas/perspectiva-1.jpg',
    texto: 'Seguridad y comodidad para tu empresa, ese es el objetivo de Indupark.',
  },
  {
    src: '/media/perspectivas/perspectiva-2.jpg',
    texto: 'Calles internas amplias y pavimentadas, para llegar a cada lote de forma fluida.',
  },
  {
    src: '/media/perspectivas/perspectiva-3.jpg',
    texto: 'Vereda, arbolado y alumbrado público en todo el predio.',
  },
  {
    src: '/media/perspectivas/perspectiva-4.jpg',
    texto: 'Acceso de doble carril con vigilancia las 24 horas.',
  },
  {
    src: '/media/perspectivas/perspectiva-5.jpg',
    texto: 'Sectores propios para administración y enfermería.',
  },
  {
    src: '/media/perspectivas/perspectiva-6.jpg',
    texto: 'Una cafetería pensada para trabajar o desconectar.',
  },
  {
    src: '/media/perspectivas/perspectiva-7.jpg',
    texto: 'Estación de servicio propia, con soluciones energéticas para cada empresa.',
  },
  {
    src: '/media/perspectivas/perspectiva-8.jpg',
    texto: 'Lotes con frente a ruta, ideales para comercios al por menor.',
  },
  {
    src: '/media/perspectivas/perspectiva-9.jpg',
    texto: 'Colectora paralela a la ruta: ingreso y egreso ágil, sin demoras.',
  },
]

const TOTAL = DIAPOSITIVAS.length
const INTERVALO_AUTOPLAY = 6000
const UMBRAL_ARRASTRE = 60

const variantes = {
  entra: (direccion) => ({ opacity: 0, x: direccion * 48, scale: 1.03 }),
  centro: { opacity: 1, x: 0, scale: 1 },
  sale: { opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } },
}

function formatear(n) {
  return String(n).padStart(2, '0')
}

function Perspectivas() {
  const [[indice, direccion], setEstado] = useState([0, 0])
  const [pausado, setPausado] = useState(false)
  const [enViewport, setEnViewport] = useState(false)
  const contenedorRef = useRef(null)
  const reducirMovimiento = useReducedMotion()

  const irA = (destino, dir) => {
    setEstado([((destino % TOTAL) + TOTAL) % TOTAL, dir])
  }

  useEffect(() => {
    const elemento = contenedorRef.current
    if (!elemento) return
    const observador = new IntersectionObserver(
      ([entrada]) => setEnViewport(entrada.isIntersecting),
      { threshold: 0.35 }
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  // Precarga el resto de las imágenes recién cuando el carousel entra en pantalla
  useEffect(() => {
    if (!enViewport) return
    DIAPOSITIVAS.forEach(({ src }) => {
      const imagen = new Image()
      imagen.src = src
    })
  }, [enViewport])

  useEffect(() => {
    if (pausado || !enViewport || reducirMovimiento) return
    const id = setInterval(() => {
      setEstado(([actual]) => [(actual + 1) % TOTAL, 1])
    }, INTERVALO_AUTOPLAY)
    return () => clearInterval(id)
  }, [pausado, enViewport, reducirMovimiento, indice])

  const manejarTeclado = (evento) => {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault()
      irA(indice - 1, -1)
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault()
      irA(indice + 1, 1)
    }
  }

  const manejarArrastre = (_evento, info) => {
    if (info.offset.x < -UMBRAL_ARRASTRE) irA(indice + 1, 1)
    else if (info.offset.x > UMBRAL_ARRASTRE) irA(indice - 1, -1)
  }

  const diapositiva = DIAPOSITIVAS[indice]

  return (
    <div
      className="perspectivas"
      ref={contenedorRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Perspectivas del parque"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onKeyDown={manejarTeclado}
    >
      <div className="perspectivas-marco">
        <div className="perspectivas-visor" aria-live={pausado ? 'polite' : 'off'}>
          <AnimatePresence initial={false} custom={direccion}>
            <motion.figure
              key={indice}
              className="perspectivas-diapositiva"
              custom={direccion}
              variants={reducirMovimiento ? undefined : variantes}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={manejarArrastre}
            >
              <img src={diapositiva.src} alt="" draggable="false" />
              <div className="perspectivas-degrade" aria-hidden="true" />
              <figcaption className="perspectivas-texto">{diapositiva.texto}</figcaption>
            </motion.figure>
          </AnimatePresence>
          <button
            type="button"
            className="perspectivas-flecha perspectivas-flecha-anterior"
            aria-label="Imagen anterior"
            onClick={() => irA(indice - 1, -1)}
          >
            ←
          </button>
          <button
            type="button"
            className="perspectivas-flecha perspectivas-flecha-siguiente"
            aria-label="Imagen siguiente"
            onClick={() => irA(indice + 1, 1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="perspectivas-controles">
        <span className="perspectivas-contador">
          {formatear(indice + 1)} / {formatear(TOTAL)}
        </span>
        <div className="perspectivas-indicadores">
          {DIAPOSITIVAS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                i === indice ? 'perspectivas-indicador perspectivas-indicador-activo' : 'perspectivas-indicador'
              }
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === indice}
              onClick={() => irA(i, i > indice ? 1 : -1)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Perspectivas
