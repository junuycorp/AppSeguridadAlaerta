import type { Controller } from '@agente/shared/types'

export const Chat: Controller = (req, res, next) => {
  const [error, dto] = ChatDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  ChatUseCase(dto)
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
