import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class AsignarIncidenteDto {
  private constructor(
    public listaSerenos: string[],
    public idIncidente: number,
  ) {}

  static crear(object: Record<string, unknown>): [string?, AsignarIncidenteDto?] {
    const { listaSerenos, idIncidente } = object as Flexible<AsignarIncidenteDto>

    if (listaSerenos == null) return ['Falta proporcionar listaSerenos']
    if (listaSerenos.length === 0) return ['Falta indicar a los serenos asignados']
    if (idIncidente == null) return ['Falta proporcionar idIncidente']

    return [
      undefined,
      new AsignarIncidenteDto(
        listaSerenos,
        toNumber(idIncidente, 'ID de incidente'),
      ),
    ]
  }
}
