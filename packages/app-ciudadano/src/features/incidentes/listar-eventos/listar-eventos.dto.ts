import { ESTADOS_INCIDENTE } from '@ciudadano/shared/constants'
import { toNumberOrUndefined } from '@ciudadano/shared/helpers'
import type { Flexible } from '@ciudadano/shared/types'

export class ListarEventosDto {
  private constructor(
    public tamanio?: number,
    public estado?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, ListarEventosDto?] {
    const { tamanio, estado } = object as Flexible<ListarEventosDto>

    if (estado != null && !ESTADOS_INCIDENTE.includes(estado))
      return ['Estado no válido']

    return [
      undefined,
      new ListarEventosDto(toNumberOrUndefined(tamanio, 'Tamaño de página'), estado),
    ]
  }
}
