// Carousel de 3 vistas del plano: el interactivo (PlanoParque), el plano
// original de mensura y el plano superpuesto sobre una imagen satelital.
// Las dos últimas son imágenes de referencia sin interacción por lote; hasta
// que se coloquen los archivos reales en public/media/, muestran un estado
// "Imagen pendiente de carga" en vez de un ícono de imagen rota. Se navega
// solo con las flechas o arrastrando (sin botones/tabs visibles); el título
// de la página se actualiza vía onCambioVista según la vista activa.

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import PlanoParque from './PlanoParque'

const VISTAS = [
  { id: 'interactivo', titulo: 'interactivo' },
  { id: 'original', titulo: 'original', src: '/media/plano-original.jpg' },
  { id: 'satelital', titulo: 'satelital', src: '/media/plano-satelital.jpg' },
]

const TOTAL = VISTAS.length
const UMBRAL_ARRASTRE = 60

const variantes = {
  entra: (direccion) => ({ opacity: 0, x: direccion * 48 }),
  centro: { opacity: 1, x: 0 },
  sale: { opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
}

function ImagenVista({ src, alt }) {
  const [error, setError] = useState(false)

  if (error) {
    return <div className="plano-vistas-pendiente">Imagen pendiente de carga</div>
  }

  return <img className="plano-vistas-imagen" src={src} alt={alt} onError={() => setError(true)} draggable="false" />
}

function VistasPlano({ lotesPorId, onCambioVista }) {
  const [[indice, direccion], setEstado] = useState([0, 0])
  const reducirMovimiento = useReducedMotion()

  const irA = (destino, dir) => {
    setEstado([((destino % TOTAL) + TOTAL) % TOTAL, dir])
  }

  const manejarArrastre = (_evento, info) => {
    if (info.offset.x < -UMBRAL_ARRASTRE) irA(indice + 1, 1)
    else if (info.offset.x > UMBRAL_ARRASTRE) irA(indice - 1, -1)
  }

  const vista = VISTAS[indice]
  const permiteArrastre = vista.id !== 'interactivo'

  useEffect(() => {
    onCambioVista?.(vista.titulo)
  }, [vista.titulo, onCambioVista])

  return (
    <div className="plano-vistas" role="region" aria-label="Vistas del plano">
      <div className="plano-vistas-marco">
        <div className="plano-vistas-visor">
          <AnimatePresence initial={false} custom={direccion}>
            <motion.div
              key={indice}
              className="plano-vistas-diapositiva"
              custom={direccion}
              variants={reducirMovimiento ? undefined : variantes}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag={permiteArrastre ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={permiteArrastre ? manejarArrastre : undefined}
            >
              {vista.id === 'interactivo' ? (
                <PlanoParque lotesPorId={lotesPorId} />
              ) : (
                <ImagenVista src={vista.src} alt={`Plano ${vista.titulo} del parque`} />
              )}
            </motion.div>
          </AnimatePresence>
          <button
            type="button"
            className="plano-vistas-flecha plano-vistas-flecha-anterior"
            aria-label="Vista anterior"
            onClick={() => irA(indice - 1, -1)}
          >
            ←
          </button>
          <button
            type="button"
            className="plano-vistas-flecha plano-vistas-flecha-siguiente"
            aria-label="Vista siguiente"
            onClick={() => irA(indice + 1, 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default VistasPlano
