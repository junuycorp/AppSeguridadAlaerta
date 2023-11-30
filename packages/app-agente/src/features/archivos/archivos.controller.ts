import type { Controller } from '@agente/shared/types'
import { CrearRutasDto } from './crear-multiple/crear-multiple.dto'
import { crearMultipleUseCase } from './crear-multiple/crear-multiple.use-case'

export const crearMultiple: Controller = (req, res, next) => {
  const [error, dto] = CrearRutasDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  crearMultipleUseCase(dto!)
    .then((totalCreados) =>
      res.json({
        totalCreados,
      }),
    )
    .catch((error) => {
      next(error)
    })
}
