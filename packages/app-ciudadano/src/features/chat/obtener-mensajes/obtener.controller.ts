import type { Controller } from '@ciudadano/shared/types'
import { ObtenerMensajeDto } from './obtener.dto'
import { obtenerMensajesUseCase } from './obtener.use-case'

export const obtenerMensajes: Controller = (req, res, next) => {
  const [error, dto] = ObtenerMensajeDto.crear(req.query)
  if (error != null || dto == null) {
    res.status(400).json({ mensaje: error })
    return
  }
  const { idIncidente } = req.params

  obtenerMensajesUseCase(Number(idIncidente), dto)
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
