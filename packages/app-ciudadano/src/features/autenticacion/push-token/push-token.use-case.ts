import { UsuarioRepository } from '@ciudadano/shared/repositories'
import type { PushTokenDto } from './push-token.dto'

interface ActulizarPushToken {
  mensaje: string
  data: { nroDoc: string; pushToken: string | null }
}

export const actualizarPushTokenUseCase = async (
  dto: PushTokenDto,
  nroDoc: string,
): Promise<ActulizarPushToken> => {
  const { pushToken } = dto

  const usuario = await UsuarioRepository.actualizar(nroDoc, { pushToken })
  return {
    mensaje: 'Actualizado correctamente',
    data: { nroDoc: usuario.nroDocumento, pushToken: usuario.pushToken },
  }
}
