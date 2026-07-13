import { motion } from 'framer-motion'

const contenedorVariants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const caracteristicas = [
  {
    titulo: '54 lotes desde 2.000 m²',
    icono: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    titulo: 'Cerco perimetral monitoreado',
    icono: (
      <>
        <path d="M1,12 C5,5.5 19,5.5 23,12 C19,18.5 5,18.5 1,12 Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    titulo: 'Seguridad las 24 hs',
    icono: (
      <>
        <path d="M12,2 L20,5 V11 C20,17 16.5,20.5 12,22 C7.5,20.5 4,17 4,11 V5 Z" />
        <polyline points="9,12 11.2,14.2 15.5,9.5" />
      </>
    ),
  },
  {
    titulo: 'Electricidad',
    icono: <path d="M13,2 L5,13.5 H11 L9.5,22 L19,10 H12.5 Z" />,
  },
  {
    titulo: 'Agua',
    icono: <path d="M12,3 C12,3 5.5,10.5 5.5,15 A6.5,6.5 0 0 0 18.5,15 C18.5,10.5 12,3 12,3 Z" />,
  },
  {
    titulo: 'Fibra óptica',
    icono: (
      <>
        <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
        <path d="M8.5,14.5 a5,5 0 0 1 7,0" />
        <path d="M5.5,11.5 a9.2,9.2 0 0 1 13,0" />
        <path d="M2.8,8.5 a13.2,13.2 0 0 1 18.4,0" />
      </>
    ),
  },
  {
    titulo: 'Ubicación estratégica en el sur tucumano',
    icono: (
      <>
        <path d="M12,21.5 C12,21.5 5,13.8 5,9 A7,7 0 1 1 19,9 C19,13.8 12,21.5 12,21.5 Z" />
        <circle cx="12" cy="9" r="2.6" />
      </>
    ),
  },
  {
    titulo: 'Administración y servicios',
    icono: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M9,7 h2 M13,7 h2 M9,11 h2 M13,11 h2 M9,15 h2 M13,15 h2" />
        <path d="M11,21 v-3 h2 v3" />
      </>
    ),
  },
  {
    titulo: 'Parquización y mantenimiento',
    icono: (
      <>
        <circle cx="12" cy="8.5" r="5.5" />
        <path d="M12,14 V21 M8,21 h8" />
      </>
    ),
  },
]

function CaracteristicasParque() {
  return (
    <motion.div
      className="caracteristicas-grid"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={contenedorVariants}
    >
      {caracteristicas.map(({ titulo, icono }) => (
        <motion.div className="caracteristica-item" key={titulo} variants={cardVariants}>
          <svg
            className="caracteristica-icono"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icono}
          </svg>
          <h3>{titulo}</h3>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CaracteristicasParque
