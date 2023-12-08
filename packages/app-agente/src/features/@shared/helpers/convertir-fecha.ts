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
export const formatDate = (fecha: string | Date): string =>
  dayjs(fecha).format('YYYY-MM-DDTHH:mm:ssZ')
