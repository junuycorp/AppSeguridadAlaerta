import type { Controller } from '@agente/shared/types'
import { listarUseCase } from './crud-centros.use-case'

export const listarCentrosPoblados: Controller = (req, res, next) => {
  listarUseCase()
    .then((centros) =>
      res.json({
        totalElementos: centros.length,
        datos: centros,
      }),
    )
    .catch((error) => {
      next(error)
    })
}
