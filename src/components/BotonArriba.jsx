import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BotonArriba() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const alScrollear = () => setVisible(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', alScrollear)
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  const irArriba = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="boton-arriba"
          onClick={irArriba}
          aria-label="Ir arriba"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BotonArriba
