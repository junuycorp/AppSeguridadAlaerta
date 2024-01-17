import { TIPO_COMUNICADO } from '@agente/shared/constants'
import type { Flexible, TipoComunicado } from '@agente/shared/types'

export class NotificarDto {
  private constructor(
    public mensaje: string,
    public tipo: TipoComunicado,
  ) {}

  static crear(object: Record<string, unknown>): [string?, NotificarDto?] {
    const { mensaje, tipo } = object as Flexible<NotificarDto>

    if (mensaje == null) return ['Falta proporcionar mensaje']

    if (tipo == null) return ['Falta proporcionar tipo']
    if (!TIPO_COMUNICADO.includes(tipo)) return ['Tipo no es válido']

    return [undefined, new NotificarDto(mensaje, tipo)]
  }
}
