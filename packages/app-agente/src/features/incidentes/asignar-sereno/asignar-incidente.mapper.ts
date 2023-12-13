import type { Incidente, IncidenteSereno } from '@agente/database'

type IncidenteSerenoMapper = Omit<
  IncidenteSereno,
  'fechaCreacion' | 'fechaModificacion'
>

interface IIncidenteSereno extends IncidenteSereno {
  incidente: Partial<Incidente>
}

export const incidenteSerenoMapper = (
  incidenteSereno: IIncidenteSereno,
): IncidenteSerenoMapper => {
  const { fechaCreacion, fechaModificacion, ...rest } = incidenteSereno

  delete incidenteSereno.incidente.fechaModificacion
  delete incidenteSereno.incidente.fechaCreacion
  delete incidenteSereno.incidente.activo

  return rest
}
