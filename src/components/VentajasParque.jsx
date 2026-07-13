import { motion } from 'framer-motion'

const contenedorVariants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const itemVariants = {
  oculto: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const trazoVariants = {
  oculto: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: 'easeInOut' }, opacity: { duration: 0.3 } },
  },
}

/*
 * Cada ícono combina trazos que se dibujan al entrar en viewport (motion.path
 * con pathLength) y elementos con loop CSS permanente (clases ventaja-*,
 * definidas en global.css y desactivadas con prefers-reduced-motion).
 */
const ventajas = [
  {
    titulo: 'Infraestructura adecuada',
    texto:
      'Calles pavimentadas, seguridad las 24 horas y servicios pensados para la operación diaria de tu empresa.',
    icono: (
      <>
        {/* Galpón */}
        <motion.path variants={trazoVariants} d="M8 34 V19 L24 9 L40 19 V34" />
        <motion.path variants={trazoVariants} d="M19 34 V25 H29 V34" />
        <motion.path variants={trazoVariants} d="M4 34 H44" />
        {/* Calle con línea central en movimiento */}
        <path className="ventaja-marcha" d="M6 42 H42" />
      </>
    ),
  },
  {
    titulo: 'Seguridad física y jurídica',
    texto:
      'Vigilancia permanente en todo el predio, y respaldo legal: la adquisición de cada lote se formaliza mediante escritura.',
    icono: (
      <>
        {/* Pulso de radar detrás del escudo */}
        <circle className="ventaja-pulso" cx="24" cy="24" r="19" />
        <motion.path
          variants={trazoVariants}
          d="M24 7 L37 12 V22 C37 31.5 31.5 38 24 41 C16.5 38 11 31.5 11 22 V12 Z"
        />
        <motion.path variants={trazoVariants} d="M18 23.5 L22.5 28 L30.5 18.5" />
      </>
    ),
  },
  {
    titulo: 'Valorización constante',
    texto:
      'A medida que el parque se desarrolla, los lotes incrementan su valor — instalarse hoy es también una inversión a futuro.',
    icono: (
      <>
        <motion.path variants={trazoVariants} d="M8 8 V40 H40" />
        <g className="ventaja-flota">
          <motion.path variants={trazoVariants} d="M13 33 L21 25 L27 29 L37 17" />
          <motion.path variants={trazoVariants} d="M31 16 H38 V23" />
        </g>
      </>
    ),
  },
  {
    titulo: 'Economía de red',
    texto:
      'Estar rodeado de otras empresas del sector genera intercambio, sinergias y menores costos operativos.',
    icono: (
      <>
        <motion.path variants={trazoVariants} d="M24 13 L11 30 M24 13 L37 30 M11 30 H37" />
        <motion.path variants={trazoVariants} d="M24 13 L24 36 M11 30 L24 36 L37 30" />
        {/* Nodos que titilan en secuencia */}
        <circle className="ventaja-nodo" cx="24" cy="13" r="3" style={{ animationDelay: '0s' }} />
        <circle className="ventaja-nodo" cx="11" cy="30" r="3" style={{ animationDelay: '0.5s' }} />
        <circle className="ventaja-nodo" cx="37" cy="30" r="3" style={{ animationDelay: '1s' }} />
        <circle className="ventaja-nodo" cx="24" cy="36" r="3" style={{ animationDelay: '1.5s' }} />
      </>
    ),
  },
  {
    titulo: 'Ventajas logísticas',
    texto: 'Accesos y circulación pensados para operar sin demoras, las 24 horas del día.',
    icono: (
      <>
        {/* Ruta circular con guiones en marcha */}
        <circle className="ventaja-marcha-ruta" cx="24" cy="24" r="15" />
        <motion.path variants={trazoVariants} d="M28 5.5 L33.5 7.5 L30 12" />
        <motion.path variants={trazoVariants} d="M20 42.5 L14.5 40.5 L18 36" />
        <motion.path variants={trazoVariants} d="M18 24 H30 M24 18 V30" />
      </>
    ),
  },
]

function VentajasParque() {
  return (
    <motion.div
      className="ventajas-grid"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={contenedorVariants}
    >
      {ventajas.map(({ titulo, texto, icono }) => (
        <motion.div className="ventaja-item" key={titulo} variants={itemVariants}>
          <svg
            className="ventaja-icono"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icono}
          </svg>
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default VentajasParque
