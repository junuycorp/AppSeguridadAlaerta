import type { Controller } from '@ciudadano/shared/types'
import { listarTiposUseCase } from './listar-tipos.use-case'

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
