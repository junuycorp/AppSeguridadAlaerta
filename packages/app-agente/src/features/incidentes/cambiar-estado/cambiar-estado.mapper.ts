import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface IncidenteMapper
  extends Pick<Incidente, 'idIncidente' | 'idDenunciante' | 'estado' | 'subestado'> {
  fechaCreacion: string
  fechaAsignacion: string | null
  fechaRecepcion: string | null
  fechaFinalizacion: string | null
}

export const cambiarEstadoMapper = (incidente: Incidente): IncidenteMapper => {
  const {
    idIncidente,
    idDenunciante,
    estado,
    subestado,
    fechaCreacion,
    fechaRecepcion,
    fechaAsignacion,
    fechaFinalizacion,
  } = incidente

  return {
    idIncidente,
    idDenunciante,
    estado,
    subestado,
    fechaCreacion: formatDate(fechaCreacion)!,
    fechaRecepcion: fechaRecepcion ? formatDate(fechaRecepcion) : null,
    fechaAsignacion: fechaAsignacion ? formatDate(fechaAsignacion) : null,
    fechaFinalizacion: fechaFinalizacion ? formatDate(fechaFinalizacion) : null,
  }
}
