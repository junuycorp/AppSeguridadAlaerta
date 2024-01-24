import { type Comunicado } from './comunicado.interface'
import { UsuarioRepository } from '../usuarios/usuarios.repository'
import { sendPushNotifications } from '@ciudadano/shared/helpers'

export const comunicadoUseCase = async (data: Comunicado): Promise<void> => {
  const pushTokens = await UsuarioRepository.obtenerPushTokens()
  let title = '🚨 Alerta'
  if (data.tipo === 'noticia') title = '📢 Noticia'
  if (data.tipo === 'recomendacion') title = '💡 Recomendación'

  await sendPushNotifications(pushTokens, title, data.mensaje)
}
