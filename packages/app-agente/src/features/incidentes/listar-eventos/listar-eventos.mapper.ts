import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface ListarIncidenteMapper
  extends Omit<Incidente, 'idDenunciante' | 'activo' | 'fechaCreacion'> {
  fechaCreacion: string
}

export const listarIncidenteMapper = (
  incidente: Incidente,
): ListarIncidenteMapper => {
  const { idDenunciante, activo, fechaCreacion, ...rest } = incidente

  return {
    ...rest,
    fechaCreacion: formatDate(fechaCreacion),
  }
}
