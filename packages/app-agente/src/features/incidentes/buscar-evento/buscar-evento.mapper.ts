import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface BuscarEventoMapper
  extends Omit<Incidente, 'fechaModificacion' | 'fechaCreacion'> {
  fechaCreacion: string
}

export const buscarEventoMapper = (incidente: Incidente): BuscarEventoMapper => {
  const { fechaModificacion, ...rest } = incidente

  return {
    ...rest,
    fechaCreacion: formatDate(incidente.fechaCreacion),
  }
}
