// Envío de la consulta del formulario de Contacto.
//
// Hoy está simulado (no sale ningún email real). Cuando el dueño tenga
// cuenta y credenciales de EmailJS, reemplazar el cuerpo de la función
// por el envío real de las dos plantillas — misma data para ambas, cada
// una la usa como necesita (ver el "To Email" configurado en cada
// plantilla dentro del dashboard de EmailJS):
//
//   import emailjs from '@emailjs/browser'
//   const parametros = armarParametrosPlantilla(datos)
//   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//   await Promise.all([
//     emailjs.send(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACION_CLIENTE,
//       parametros,
//       { publicKey },
//     ),
//     emailjs.send(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICACION_DUENO,
//       parametros,
//       { publicKey },
//     ),
//   ])
//
// - src/emails/confirmacion-consulta.html — "To Email" = {{email}} (el
//   usuario que consultó). Espera exactamente las claves devueltas por
//   armarParametrosPlantilla.
// - src/emails/notificacion-consulta.html — "To Email" fijo en
//   indupark.riochico@gmail.com y "Reply To" = {{email}}, para que el
//   dueño pueda responder directo desde su bandeja. Usa las mismas
//   claves.

function armarParametrosPlantilla(datos) {
  return {
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || 'Sin especificar',
    mensaje: datos.mensaje,
    anio: new Date().getFullYear(),
  }
}

export function enviarConsulta(datos) {
  const parametrosPlantilla = armarParametrosPlantilla(datos)

  return new Promise((resolver) => {
    setTimeout(() => resolver({ ok: true, parametrosPlantilla }), 1200)
  })
}
