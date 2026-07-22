import { motion } from 'framer-motion'

const WHATSAPP_NUMERO = '5493813199621'
const WHATSAPP_MENSAJE = 'Hola, quiero más información sobre Indupark.'

function BotonWhatsApp() {
  const href = WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`
    : undefined

  return (
    <motion.a
      className="boton-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#ffffff"
          d="M12.04 2.13c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.15-1.35a9.87 9.87 0 0 0 4.89 1.28h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-6.99a9.82 9.82 0 0 0-6.99-2.9zm0 18.12h-.01c-1.53 0-3.03-.41-4.33-1.19l-.31-.18-3.06.8.82-2.98-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.23-8.22a8.17 8.17 0 0 1 5.82 2.41 8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.11 8.22zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.24-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.68 4.25 3.76.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z"
        />
      </svg>
    </motion.a>
  )
}

export default BotonWhatsApp
