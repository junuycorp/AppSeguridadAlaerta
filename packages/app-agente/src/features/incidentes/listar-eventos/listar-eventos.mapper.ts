import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@prisma-agente/client'

interface ListarIncidenteMapper
  extends Omit<
    Incidente,
    | 'idDenunciante'
    | 'activo'
    | 'fechaCreacion'
    | 'fechaRecepcion'
    | 'fechaFinalizacion'
  > {
  fechaCreacion: string
  fechaRecepcion: string | null
  fechaFinalizacion: string | null
}

export const listarIncidenteMapper = (
  incidente: Incidente,
): ListarIncidenteMapper => {
  const {
    idDenunciante,
    activo,
    fechaCreacion,
    fechaRecepcion,
    fechaFinalizacion,
    ...rest
  } = incidente

  return {
    ...rest,
    fechaCreacion: formatDate(fechaCreacion),
    fechaRecepcion: fechaRecepcion ? formatDate(fechaRecepcion) : null,
    fechaFinalizacion: fechaFinalizacion ? formatDate(fechaFinalizacion) : null,
  }
}
