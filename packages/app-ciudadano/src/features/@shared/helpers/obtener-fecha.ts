export const obtenerFechaActual = (): string => {
  const ahora = new Date()
  const año = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${año}${mes}${dia}` // yyyymmdd
}

export const obtenerHoraActual = (): string => {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  const segundos = String(ahora.getSeconds()).padStart(2, '0')
  // const milisegundos = String(ahora.getMilliseconds()).padStart(3, '0')
  return `${horas}${minutos}${segundos}`
}
