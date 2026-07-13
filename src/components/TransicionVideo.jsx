import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function TransicionVideo({ video, children }) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const [progreso, setProgreso] = useState(0)
  const [terminado, setTerminado] = useState(false)

  const seguirProgreso = () => {
    const v = videoRef.current
    if (v && v.duration) {
      setProgreso(v.currentTime / v.duration)
    }
    rafRef.current = requestAnimationFrame(seguirProgreso)
  }

  const detenerSeguimiento = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  useEffect(() => detenerSeguimiento, [])

  return (
    <motion.section
      className="transicion-contenedor"
      onViewportEnter={() => videoRef.current?.play()}
      viewport={{ once: true, amount: 0.5 }}
    >
      <video
        ref={videoRef}
        className="transicion-video"
        src={video}
        muted
        playsInline
        onPlay={seguirProgreso}
        onPause={detenerSeguimiento}
        onEnded={() => {
          detenerSeguimiento()
          setTerminado(true)
        }}
        style={{ opacity: Math.max(0, 1 - progreso) }}
      />
      <motion.div
        className="transicion-texto"
        animate={{ opacity: terminado ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: terminado ? 0.3 : 0 }}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}

export default TransicionVideo
