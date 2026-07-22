import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TituloSeccion from '../components/TituloSeccion'
import BotonWhatsApp from '../components/BotonWhatsApp'
import { enviarConsulta } from '../utils/enviarConsulta'

const ESTADO_INICIAL = { nombre: '', email: '', telefono: '', mensaje: '' }

const iconoProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconoNombre = () => (
  <svg {...iconoProps}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconoEmail = () => (
  <svg {...iconoProps}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const IconoTelefono = () => (
  <svg {...iconoProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconoMensaje = () => (
  <svg {...iconoProps}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

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
        <div className="seccion-contenido seccion-contenido-ancha">
          <TituloSeccion as="h1" overline="Consultas">
            Contacto
          </TituloSeccion>

          <Reveal>
            {envio !== 'enviado' && (
              <p className="contacto-intro">
                Dejanos tus datos y tu consulta: te contactamos a la brevedad para
                coordinar una visita o resolver cualquier duda sobre el parque.
              </p>
            )}

            <AnimatePresence mode="wait">
              {envio === 'enviado' ? (
                <motion.div
                  key="confirmacion"
                  className="contacto-tarjeta"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="contacto-tarjeta-texto">
                    Gracias, tu consulta fue enviada. Te vamos a contactar a la brevedad
                    y te llegará un email de confirmación a la casilla indicada.
                  </p>
                  <button
                    type="button"
                    className="boton-enviar"
                    onClick={() => setEnvio('inicial')}
                  >
                    Aceptar
                  </button>
                </motion.div>
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
                    <span className="campo-etiqueta">Nombre</span>
                    <span className="campo-fila">
                      <IconoNombre />
                      <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} required />
                    </span>
                  </label>

                  <label className="campo">
                    <span className="campo-etiqueta">Email</span>
                    <span className="campo-fila">
                      <IconoEmail />
                      <input type="email" name="email" value={datos.email} onChange={manejarCambio} required />
                    </span>
                  </label>

                  <label className="campo">
                    <span className="campo-etiqueta">Teléfono</span>
                    <span className="campo-fila">
                      <IconoTelefono />
                      <input type="tel" name="telefono" value={datos.telefono} onChange={manejarCambio} />
                    </span>
                  </label>

                  <label className="campo">
                    <span className="campo-etiqueta">Mensaje</span>
                    <span className="campo-fila campo-fila-textarea">
                      <IconoMensaje />
                      <textarea name="mensaje" value={datos.mensaje} onChange={manejarCambio} rows="4" required />
                    </span>
                  </label>

                  <button type="submit" className="boton-enviar" disabled={envio === 'enviando'}>
                    {envio === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </main>

      <BotonWhatsApp />
    </PageTransition>
  )
}

export default Contacto
