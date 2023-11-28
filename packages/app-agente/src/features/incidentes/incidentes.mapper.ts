import type { Incidente } from '@prisma-agente/client'

type IncidenteMapper = Omit<Incidente, 'fechaCreacion' | 'fechaModificacion'>

export const incidenteMapper = (incidente: Incidente): IncidenteMapper => {
  const { fechaCreacion, fechaModificacion, ...rest } = incidente
  return rest
}
