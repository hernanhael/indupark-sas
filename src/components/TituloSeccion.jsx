import { motion } from 'framer-motion'

const contenedorVariants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const overlineVariants = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const textoVariants = {
  oculto: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const lineaVariants = {
  oculto: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

function TituloSeccion({ overline, children }) {
  return (
    <motion.div
      className="titulo-seccion"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={contenedorVariants}
    >
      {overline && (
        <motion.span className="titulo-overline" variants={overlineVariants}>
          {overline}
        </motion.span>
      )}
      <h2 className="titulo-grande">
        <span className="titulo-mascara">
          <motion.span className="titulo-texto" variants={textoVariants}>
            {children}
          </motion.span>
        </span>
      </h2>
      <motion.span className="titulo-linea" variants={lineaVariants} />
    </motion.div>
  )
}

export default TituloSeccion
