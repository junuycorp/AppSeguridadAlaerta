import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface IncidenteMapper extends Pick<Incidente, 'idIncidente' | 'estado'> {
  fechaCreacion: string
  fechaModificacion: string
}

export const cambiarEstadoMapper = (incidente: Incidente): IncidenteMapper => {
  const { idIncidente, estado, fechaCreacion, fechaModificacion } = incidente

  return {
    idIncidente,
    estado,
    fechaCreacion: formatDate(fechaCreacion),
    fechaModificacion: formatDate(fechaModificacion),
  }
}
