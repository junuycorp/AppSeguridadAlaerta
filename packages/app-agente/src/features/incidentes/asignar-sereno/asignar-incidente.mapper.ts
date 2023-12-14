import type { Incidente, IncidenteSereno } from '@agente/database'

type IncidenteSerenoMapper = Omit<IncidenteSereno, 'activo' | 'fechaAsignacion'>

interface IIncidenteSereno extends IncidenteSereno {
  incidente: Partial<Incidente>
}

export const incidenteSerenoMapper = (
  incidenteSereno: IIncidenteSereno,
): IncidenteSerenoMapper => {
  const { fechaAsignacion, ...rest } = incidenteSereno

  delete incidenteSereno.incidente.activo
  // incidenteSereno.fechaAsignacion

  return rest
}
