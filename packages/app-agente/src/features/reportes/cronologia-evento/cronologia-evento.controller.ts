import type { Controller } from '@agente/shared/types'
import { CronologiaEventoDto } from './cronologia-evento.dto'
import { cronologiaEventoUseCase } from './cronologia-evento.use-case'

export const cronologiaEvento: Controller = (req, res, next) => {
  const [error, dto] = CronologiaEventoDto.crear(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  cronologiaEventoUseCase(dto?.estado, dto?.idTipoIncidente)
    .then((resp) =>
      res.json({
        totalElementos: resp.length,
        datos: resp,
      }),
    )
    .catch((error) => {
      next(error)
    })
}
