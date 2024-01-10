import { ESTADOS_INCIDENTE } from '@agente/shared/constants'
import { toNumberOrUndefined } from '@agente/shared/helpers'
import type { EstadoIncidente, Flexible } from '@agente/shared/types'

export class CronologiaEventoDto {
  private constructor(
    public estado?: EstadoIncidente,
    public idTipoIncidente?: number,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CronologiaEventoDto?] {
    const { estado, idTipoIncidente } = object as Flexible<CronologiaEventoDto>

    if (estado != null && !ESTADOS_INCIDENTE.includes(estado))
      return ['Estado no es válido']

    return [
      undefined,
      new CronologiaEventoDto(
        estado,
        toNumberOrUndefined(idTipoIncidente, 'ID tipo incidente'),
      ),
    ]
  }
}
