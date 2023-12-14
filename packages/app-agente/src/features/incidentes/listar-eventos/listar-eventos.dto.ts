import { ESTADOS_INCIDENTE } from '@agente/shared/constants'
import { toNumberOrUndefined } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

const estados = ['PENDIENTE', 'ATENDIDO', 'ARCHIVADO', 'DERIVADO']

export class ListarEventosDto {
  private constructor(
    public fechaInicio?: Date,
    public fechaFin?: Date,
    public idTipoIncidente?: number,
    public estado?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, ListarEventosDto?] {
    const { fechaInicio, fechaFin, idTipoIncidente, estado } =
      object as Flexible<ListarEventosDto>

    const formatFechaInicio =
      fechaInicio != null ? new Date(fechaInicio + 'T00:00:00-05:00') : undefined
    const formatFechaFin =
      fechaFin != null ? new Date(fechaFin + 'T23:59:59-05:00') : undefined

    if (estado != null && !estados.includes(estado)) return ['Estado no es válido']

    return [
      undefined,
      new ListarEventosDto(
        formatFechaInicio,
        formatFechaFin,
        toNumberOrUndefined(idTipoIncidente, 'ID Tipo de incidente'),
        estado,
      ),
    ]
  }

  static listarPorDenunciante(
    object: Record<string, unknown>,
  ): [string?, ListarPorDenuncianteDto?] {
    const { tamanio, estado } = object as Flexible<ListarPorDenuncianteDto>

    if (estado != null && !ESTADOS_INCIDENTE.includes(estado))
      return ['Estado no válido']

    return [
      undefined,
      {
        tamanio: toNumberOrUndefined(tamanio, 'Tamaño de página'),
        estado,
      },
    ]
  }
}

interface ListarPorDenuncianteDto {
  tamanio?: number
  estado?: string
}
