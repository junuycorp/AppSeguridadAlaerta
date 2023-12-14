import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class RegistrarInformeDto {
  private constructor(
    public idIncidente: number,
    public idCentroPoblado: number,
    public descripcion?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarInformeDto?] {
    const { idIncidente, idCentroPoblado, descripcion } =
      object as Flexible<RegistrarInformeDto>

    if (idIncidente == null || idIncidente === '')
      return ['Falta proporcionar ID del incidente']
    if (idCentroPoblado == null || idCentroPoblado === '')
      return ['Falta proporcionar ID del centro poblado']

    return [
      undefined,
      new RegistrarInformeDto(
        toNumber(idIncidente, 'ID del incidente'),
        toNumber(idCentroPoblado, 'ID del centro poblado'),
        descripcion,
      ),
    ]
  }
}
