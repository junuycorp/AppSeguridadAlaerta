export const obtenerFechaActual = (): string => {
  const ahora = new Date()
  const año = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${año}${mes}${dia}` // yyyymmdd
}
