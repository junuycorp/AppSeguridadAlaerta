import { validators } from '@agente/configs'

interface EnviarMensajeDto {
  mensaje: string
  destinatarios: string[]
}
export const enviarMensajeDto = (
  data: Record<string, unknown>,
): [string?, EnviarMensajeDto?] => {
  let mensajeError: string

  const { mensaje, destinatarios } = data

  if (mensaje == null) {
    mensajeError = 'mensaje no proporcionado'
    return [mensajeError, undefined]
  }

  if (typeof mensaje !== 'string') {
    mensajeError = 'mensaje debe ser de tipo string'
    return [mensajeError, undefined]
  }
  if (!Array.isArray(destinatarios)) {
    mensajeError = 'destinatarios debe ser una lista'
    return [mensajeError, undefined]
  }

  if (destinatarios.length === 0) {
    mensajeError = 'destinatarios debe contener al menos un elemento'
    return [mensajeError, undefined]
  }

  for (const idDestinatario of destinatarios) {
    const isValidId = validators.numeroDocumento.test(idDestinatario)
    if (!isValidId) {
      mensajeError = `Nro documento '${idDestinatario}' no es válido`
      return [mensajeError, undefined]
    }
  }

  const correctData = {
    mensaje,
    destinatarios,
  }

  return [undefined, correctData]
}
