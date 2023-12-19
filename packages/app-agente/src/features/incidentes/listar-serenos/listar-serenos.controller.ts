import type { Controller } from '@agente/shared/types'
import { listarSerenosUseCase } from './listar-serenos.use-case'

export const listarSerenos: Controller = (req, res, next) => {
  listarSerenosUseCase()
    .then((serenos) =>
      res.json({
        totalElementos: serenos.length,
        datos: serenos,
      }),
    )
    .catch((error) => {
      next(error)
    })
}
