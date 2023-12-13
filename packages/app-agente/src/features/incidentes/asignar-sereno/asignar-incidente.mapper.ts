import type { IncidenteSereno } from '@agente/database'

type IncidenteSerenoMapper = Omit<
  IncidenteSereno,
  'fechaCreacion' | 'fechaModificacion'
>

export const incidenteSerenoMapper = (
  incidenteSereno: IncidenteSereno,
): IncidenteSerenoMapper => {
  const { fechaCreacion, fechaModificacion, ...rest } = incidenteSereno
  return rest
}
