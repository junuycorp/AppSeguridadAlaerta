import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'
import type { $Enums } from '@prisma-agente/client'

export class CrearMensajeDto {
  private constructor(
    public idIncidente: number,
    public idRemitente: string,
    public idDestinatario: string,
    public tipoRemitente: $Enums.TipoRemitente,
    public mensaje: string,
    public estado: $Enums.EstadoMensaje,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrearMensajeDto?] {
    const {
      idIncidente,
      idRemitente,
      idDestinatario,
      tipoRemitente,
      mensaje,
      estado,
    } = object as Flexible<CrearMensajeDto>

    if (idIncidente == null) return ['Falta proporcionar idIncidente']
    if (idRemitente == null) return ['Falta proporcionar idRemitente']
    if (idDestinatario == null) return ['Falta proporcionar idDestinatario']

    if (tipoRemitente == null) return ['Falta proporcionar tipoRemitente']
    if (!['ciudadano', 'sereno'].includes(tipoRemitente))
      return ['Tipo de remitente no válido. Valores válidos: ciudadano, sereno']

    if (mensaje == null) return ['Falta proporcionar mensaje']
    if (estado == null) return ['Falta proporcionar estado']
    if (!['ENVIADO', 'RECIBIDO', 'LEIDO'].includes(estado))
      return ['Estado no válido. Valores válidos: ENVIADO, RECIBIDO, LEIDO']

    return [
      undefined,
      new CrearMensajeDto(
        toNumber(idIncidente, 'idIncidente'),
        idRemitente,
        idDestinatario,
        tipoRemitente,
        mensaje,
        estado,
      ),
    ]
  }
}
