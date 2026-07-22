// Envío de la consulta del formulario de Contacto vía EmailJS.
//
// Manda las dos plantillas con los mismos parámetros — cada una decide
// destinatario según el "To Email"/"Reply To" configurado en el
// dashboard de EmailJS:
// - src/emails/confirmacion-consulta.html — To Email = {{email}} (el
//   usuario que consultó).
// - src/emails/notificacion-consulta.html — To Email fijo en
//   indupark.riochico@gmail.com, Reply To = {{email}}.

import emailjs from '@emailjs/browser'

function armarParametrosPlantilla(datos) {
  return {
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || 'Sin especificar',
    mensaje: datos.mensaje,
    anio: new Date().getFullYear(),
  }
}

export async function enviarConsulta(datos) {
  const parametrosPlantilla = armarParametrosPlantilla(datos)
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID

  await Promise.all([
    emailjs.send(
      serviceId,
      import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACION_CLIENTE,
      parametrosPlantilla,
      { publicKey },
    ),
    emailjs.send(
      serviceId,
      import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICACION_DUENO,
      parametrosPlantilla,
      { publicKey },
    ),
  ])

  return { ok: true, parametrosPlantilla }
}
