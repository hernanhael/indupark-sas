import { motion } from 'framer-motion'

function LoteCard({ lote, onCerrar }) {
  return (
    <motion.div
      className="lote-card-fondo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCerrar}
    >
      <motion.div
        className="lote-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2 }}
        onClick={(evento) => evento.stopPropagation()}
      >
        <button className="lote-card-cerrar" onClick={onCerrar} aria-label="Cerrar">
          ✕
        </button>
        <h2>{lote.nombre}</h2>
        {lote.superficie && <p>{lote.superficie}</p>}
        <p className={`lote-estado lote-estado-${lote.estado}`}>
          {lote.estado === 'vendido' ? 'Vendido' : 'Disponible'}
        </p>
        {lote.estado === 'vendido' && lote.comprador && (
          <p className="lote-comprador">Comprador: {lote.comprador}</p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default LoteCard
