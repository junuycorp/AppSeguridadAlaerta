import type { Incidente } from '@prisma-agente/client'

type IncidenteMapper = Omit<
  Incidente,
  'fechaCreacion' | 'fechaFinalizacion' | 'fechaRecepcion' | 'activo'
>

export const incidenteMapper = (incidente: Incidente): IncidenteMapper => {
  const { fechaCreacion, fechaFinalizacion, fechaRecepcion, activo, ...rest } =
    incidente
  return rest
}
