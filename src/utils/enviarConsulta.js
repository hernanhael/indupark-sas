export function enviarConsulta(datos) {
  return new Promise((resolver) => {
    setTimeout(() => resolver({ ok: true }), 1200)
  })
}
