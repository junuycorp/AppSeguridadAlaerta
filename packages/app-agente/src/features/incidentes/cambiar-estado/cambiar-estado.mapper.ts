import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface IncidenteMapper
  extends Pick<Incidente, 'idIncidente' | 'estado' | 'subestado'> {
  fechaCreacion: string
  fechaModificacion: string
}

export const cambiarEstadoMapper = (incidente: Incidente): IncidenteMapper => {
  const { idIncidente, estado, subestado, fechaCreacion, fechaModificacion } =
    incidente

  return {
    idIncidente,
    estado,
    subestado,
    fechaCreacion: formatDate(fechaCreacion),
    fechaModificacion: formatDate(fechaModificacion),
  }
}
