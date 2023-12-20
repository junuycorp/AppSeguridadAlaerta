import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Convertir fecha UTC a GMT -5 por defecto
export const UtcToGmt = (
  fechaUtm: string,
  zonaHoraria: string = 'America/Lima',
): string => {
  const fechaGMT = dayjs.utc(fechaUtm).tz(zonaHoraria).format()
  return fechaGMT
}

// Formatear fecha
export const formatDate = (fecha: string | Date | null): string | null => {
  if (fecha == null) return null
  return dayjs(fecha).format('YYYY-MM-DDTHH:mm:ssZ')
}

export const obtenerAnioMesActual = (): string => {
  const ahora = new Date()
  const año = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  return `${año}${mes}` // yyyymm
}

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
