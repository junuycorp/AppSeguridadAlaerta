import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class AsignarIncidenteDto {
  private constructor(
    public idSereno: string,
    public idIncidente: number,
  ) {}

  static crear(object: Record<string, unknown>): [string?, AsignarIncidenteDto?] {
    const { idSereno, idIncidente } = object as Flexible<AsignarIncidenteDto>

    if (idSereno == null) return ['Falta proporcionar idSereno']
    if (idIncidente == null) return ['Falta proporcionar idIncidente']

    return [
      undefined,
      new AsignarIncidenteDto(idSereno, toNumber(idIncidente, 'ID de incidente')),
    ]
  }
}
