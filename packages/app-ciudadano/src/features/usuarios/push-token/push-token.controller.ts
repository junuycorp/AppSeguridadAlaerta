import type { Controller } from '@ciudadano/shared/types'
import { PushTokenDto } from './push-token.dto'
import { actualizarPushTokenUseCase } from './push-token.use-case'

export const pushToken: Controller = (req, res, next) => {
  const [error, dto] = PushTokenDto.patch(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  const nroDocumento = req.body.idUser

  actualizarPushTokenUseCase(dto!, nroDocumento)
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
