import { emailSenderAdapter, smsSenderAdapter } from '@ciudadano/adapters'

export const enviarCodigoPorCorreo = async (
  emailDestino: string,
  codigoVerificacion: string,
): Promise<void> => {
  const asunto = 'App Alerta - Código de verificación'
  const html = `<p>Su código de verificación es ${codigoVerificacion}. No comparta este código con nadie</p>`
  await emailSenderAdapter.sendEmail(emailDestino, asunto, html)
}

export const enviarCodigoPorSms = async (
  numeroCelularDestino: string,
  codigoVerificacion: string,
): Promise<void> => {
  // const celular = `+51${numeroCelularDestino}`
  // const mensaje = `Su código de verificación es ${codigoVerificacion}. No comparta este código con nadie`
  const mensaje = `Su código de verificación es ${codigoVerificacion}`

  await smsSenderAdapter.sendSms(numeroCelularDestino, mensaje)
}
