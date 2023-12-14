import type { Controller } from '@agente/shared/types'
import { listarUseCase } from './crud-centros.use-case'

export const listar: Controller = (req, res, next) => {
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
