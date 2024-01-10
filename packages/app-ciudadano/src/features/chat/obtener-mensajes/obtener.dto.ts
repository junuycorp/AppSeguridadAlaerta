import { ESTADOS_MENSAJE, TIPO_REMITENTE } from '@ciudadano/shared/constants'
import type { EstadoMensaje, Flexible, TipoRemitente } from '@ciudadano/shared/types'

export class ObtenerMensajeDto {
  private constructor(
    public estado?: EstadoMensaje,
    public tipoRemitente?: TipoRemitente,
  ) {}

  static crear(object: Record<string, unknown>): [string?, ObtenerMensajeDto?] {
    const { estado, tipoRemitente } = object as Flexible<ObtenerMensajeDto>

    if (estado != null) {
      if (!ESTADOS_MENSAJE.includes(estado)) return ['Estado no válido']
    }

    if (tipoRemitente != null) {
      if (!TIPO_REMITENTE.includes(tipoRemitente))
        return ['Tipo remitente no válido']
    }

    return [undefined, new ObtenerMensajeDto(estado, tipoRemitente)]
  }
}
