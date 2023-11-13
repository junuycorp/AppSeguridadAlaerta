import crypto from 'crypto'
import { cacheAdapter } from '@/adapters'
import type { EnviarCodigoDto } from './enviar-codigo.dto'
import { enviarCodigoPorCorreo, enviarCodigoPorSms } from './enviar-codigo.helper'

export const enviarCodigoUseCase = async (
  enviarCodigoDto: EnviarCodigoDto,
): Promise<void> => {
  const { opcion, destino } = enviarCodigoDto

  const codigoVerificacion = crypto.randomInt(100000, 999999).toString()
  const tiempoExpiracion = 60 * 5 // 5 min

  // Reescribir codigo de verificacion
  cacheAdapter.set(destino, codigoVerificacion, tiempoExpiracion)

  let enviarCodigo: Promise<void>
  enviarCodigo = enviarCodigoPorCorreo(destino, codigoVerificacion)
  if (opcion === 'sms')
    enviarCodigo = enviarCodigoPorSms(destino, codigoVerificacion)

  await enviarCodigo
}
