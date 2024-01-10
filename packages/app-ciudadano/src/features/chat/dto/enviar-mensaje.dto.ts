import { validators } from '@ciudadano/configs'
import { toNumber } from '@ciudadano/shared/helpers'
import type { Flexible } from '@ciudadano/shared/types'

interface Destinatario {
  nroDocumento: string
  tipo: 'sereno'
}

interface EnviarMensajeDto {
  idIncidente: number
  mensaje: string
  destinatarios: Destinatario[]
  remitente?: string
  tipoRemitente?: 'sereno' | 'ciudadano'
}
export const enviarMensajeDto = (
  data: Record<string, unknown>,
): [string?, EnviarMensajeDto?] => {
  let mensajeError: string

  const { idIncidente, mensaje, destinatarios, remitente, tipoRemitente } =
    data as Flexible<EnviarMensajeDto>

  if (idIncidente == null) return ['Id de incidente no proporcionado']

  if (mensaje == null) {
    mensajeError = 'mensaje no proporcionado'
    return [mensajeError, undefined]
  }

  if (remitente != null) {
    if (!validators.numeroDocumento.test(remitente)) {
      mensajeError = 'Nro documento de remitente no es válido'
      return [mensajeError, undefined]
    }
  }

  if (!Array.isArray(destinatarios)) {
    mensajeError = 'destinatarios debe ser una lista'
    return [mensajeError, undefined]
  }

  if (destinatarios.length === 0) {
    mensajeError = 'destinatarios debe contener al menos un elemento'
    return [mensajeError, undefined]
  }

  for (const item of destinatarios) {
    const isValidId = validators.numeroDocumento.test(item.nroDocumento)
    if (!isValidId) {
      mensajeError = `Nro documento '${item.nroDocumento}' no es válido`
      return [mensajeError, undefined]
    }
    if (!['sereno'].includes(item.tipo)) {
      mensajeError = 'Tipo no es válido. Valores permitidos: sereno'
      return [mensajeError, undefined]
    }
  }

  const correctData = {
    idIncidente: toNumber(idIncidente, 'Id de incidente'),
    mensaje,
    destinatarios,
    remitente,
    tipoRemitente,
  }

  return [undefined, correctData]
}
