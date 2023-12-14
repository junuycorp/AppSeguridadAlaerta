import type { Controller } from '@agente/shared/types'
import { listarTiposUseCase } from './crud-tipos.use-case'

export const listarTipos: Controller = (req, res, next) => {
  listarTiposUseCase()
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
