import type { Flexible } from '@agente/shared/types'

const estados = ['PENDIENTE', 'ATENDIDO', 'ARCHIVADO', 'DERIVADO']
const tipos = ['ACCIDENTE', 'SUBIDA DE RIO', 'VIOLENCIA FAMILIAR', 'RIESGO', 'ROBO']

export class ListarEventosDto {
  private constructor(
    public fechaInicio?: Date,
    public fechaFin?: Date,
    public tipo?: string,
    public estado?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, ListarEventosDto?] {
    const { fechaInicio, fechaFin, tipo, estado } =
      object as Flexible<ListarEventosDto>

    const formatFechaInicio =
      fechaInicio != null ? new Date(fechaInicio + 'T00:00:00-05:00') : undefined
    const formatFechaFin =
      fechaFin != null ? new Date(fechaFin + 'T23:59:59-05:00') : undefined

    if (tipo != null && !tipos.includes(tipo)) return ['Tipo no es válido']
    if (estado != null && !estados.includes(estado)) return ['Estado no es válido']

    return [
      undefined,
      new ListarEventosDto(formatFechaInicio, formatFechaFin, tipo, estado),
    ]
  }
}
