import { ESTADOS_INCIDENTE } from '@agente/shared/constants'
import { toNumberOrUndefined } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class ListarIncidentesDto {
  private constructor(
    public estado?: string,
    public tamanio?: number,
  ) {}

  static crear(object: Record<string, unknown>): [string?, ListarIncidentesDto?] {
    const { estado, tamanio } = object as Flexible<ListarIncidentesDto>

    if (estado != null && !ESTADOS_INCIDENTE.includes(estado))
      return ['Estado no válido']

    return [
      undefined,
      new ListarIncidentesDto(
        estado,
        toNumberOrUndefined(tamanio, 'Tamaño de página'),
      ),
    ]
  }
}
