import type { Controller } from '@agente/shared/types'
import { CrearMensajeDto } from './crear-mensaje.dto'
import { crearMensajeUseCase } from './crear-mensaje.use-case'

export const crearMensaje: Controller = (req, res, next) => {
  const [error, dto] = CrearMensajeDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  crearMensajeUseCase(dto!)
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
