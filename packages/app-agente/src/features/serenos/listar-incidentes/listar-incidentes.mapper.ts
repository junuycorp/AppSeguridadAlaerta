import type { Incidente, IncidenteSereno } from '@agente/database'
import { formatDate } from '@agente/shared/helpers'

// type PerfilMapper = Omit<Perfil, 'fechaCreacion' | 'fechaModificacion'>

interface IIncidenteSereno extends IncidenteSereno {
  incidente: Incidente
}

// Salida
interface ListarIncidenteSereno extends Pick<IncidenteSereno, 'idSereno'> {
  incidente: IIncidente
}
interface IIncidente
  extends Omit<Incidente, 'activo' | 'fechaModificacion' | 'fechaCreacion'> {
  fechaCreacion: string
}

export const listarIncidentesMapper = (
  incidenteSereno: IIncidenteSereno,
): ListarIncidenteSereno => {
  const { fechaAsignacion, idIncidente, incidente, ...restIncidenteSereno } =
    incidenteSereno

  const { activo, fechaCreacion, ...restIncidente } = incidente
  const nuevoIncidente = {
    ...restIncidente,
    fechaCreacion: formatDate(fechaCreacion)!,
  }
  return {
    ...restIncidenteSereno,
    incidente: nuevoIncidente,
  }
}
