import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class RegistrarInformeDto {
  private constructor(
    public idIncidente: number,
    public descripcion?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarInformeDto?] {
    const { idIncidente, descripcion } = object as Flexible<RegistrarInformeDto>

    if (idIncidente == null) return ['Falta proporcionar ID del incidente']

    return [
      undefined,
      new RegistrarInformeDto(
        toNumber(idIncidente, 'ID del incidente'),
        descripcion,
      ),
    ]
  }
}
