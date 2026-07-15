// Envío de la consulta del formulario de Contacto.
//
// Hoy está simulado (no sale ningún email real). Cuando el dueño tenga
// cuenta y credenciales de EmailJS, reemplazar el cuerpo de la función
// por el envío real, por ejemplo:
//
//   import emailjs from '@emailjs/browser'
//   await emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACION_CLIENTE,
//     armarParametrosPlantilla(datos),
//     { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
//   )
//
// La plantilla HTML que recibe esos parámetros vive en
// src/emails/confirmacion-consulta.html y espera exactamente las claves
// devueltas por armarParametrosPlantilla.

function armarParametrosPlantilla(datos) {
  return {
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || 'Sin especificar',
    lote: datos.lote || 'Sin especificar',
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
