import { SUBESTADOS_INCIDENTE } from '@agente/shared/constants'
import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class RegistrarInformeDto {
  private constructor(
    public idIncidente: number,
    public idCentroPoblado: number,
    public subestado: string,
    public descripcion?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarInformeDto?] {
    const { idIncidente, idCentroPoblado, descripcion, subestado } =
      object as Flexible<RegistrarInformeDto>

    if (idIncidente == null || idIncidente === '')
      return ['Falta proporcionar ID del incidente']
    if (idCentroPoblado == null || idCentroPoblado === '')
      return ['Falta proporcionar ID del centro poblado']
    if (subestado == null || subestado === '')
      return ['Falta proporcionar subestado']

    if (!SUBESTADOS_INCIDENTE.includes(subestado)) return ['Subestado no es válido']

    return [
      undefined,
      new RegistrarInformeDto(
        toNumber(idIncidente, 'ID del incidente'),
        toNumber(idCentroPoblado, 'ID del centro poblado'),
        subestado,
        descripcion,
      ),
    ]
  }
}
