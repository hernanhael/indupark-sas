import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { enviarConsulta } from '../utils/enviarConsulta'
import lotes from '../data/lotes.json'

const lotesDisponibles = lotes.filter((lote) => lote.estado === 'disponible')

const ESTADO_INICIAL = { nombre: '', email: '', telefono: '', mensaje: '', lote: '' }

function Contacto() {
  const [datos, setDatos] = useState(ESTADO_INICIAL)
  const [envio, setEnvio] = useState('inicial') // inicial | enviando | enviado

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos((anterior) => ({ ...anterior, [name]: value }))
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setEnvio('enviando')
    await enviarConsulta(datos)
    setEnvio('enviado')
    setDatos(ESTADO_INICIAL)
  }

  return (
    <PageTransition>
      <main className="pagina">
        <h1>Contacto</h1>

        <AnimatePresence mode="wait">
          {envio === 'enviado' ? (
            <motion.p
              key="confirmacion"
              className="contacto-confirmacion"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Gracias, tu consulta fue enviada. Te vamos a contactar a la brevedad.
            </motion.p>
          ) : (
            <motion.form
              key="formulario"
              className="contacto-form"
              onSubmit={manejarEnvio}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <label className="campo">
                Nombre
                <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} required />
              </label>

              <label className="campo">
                Email
                <input type="email" name="email" value={datos.email} onChange={manejarCambio} required />
              </label>

              <label className="campo">
                Teléfono
                <input type="tel" name="telefono" value={datos.telefono} onChange={manejarCambio} />
              </label>

              <label className="campo">
                Lote de interés
                <select name="lote" value={datos.lote} onChange={manejarCambio}>
                  <option value="">Sin especificar</option>
                  {lotesDisponibles.map((lote) => (
                    <option key={lote.id} value={lote.numero}>
                      Lote {lote.numero} — {lote.medidas}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                Mensaje
                <textarea name="mensaje" value={datos.mensaje} onChange={manejarCambio} rows="4" required />
              </label>

              <button type="submit" className="link-texto" disabled={envio === 'enviando'}>
                {envio === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  )
}

export default Contacto
