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
  const {
    fechaCreacion: _fc,
    fechaModificacion: _fm,
    idIncidente,
    incidente,
    ...restIncidenteSereno
  } = incidenteSereno

  const { fechaModificacion, activo, fechaCreacion, ...restIncidente } = incidente
  const nuevoIncidente = {
    ...restIncidente,
    fechaCreacion: formatDate(fechaCreacion),
  }
  return {
    ...restIncidenteSereno,
    incidente: nuevoIncidente,
  }
}
