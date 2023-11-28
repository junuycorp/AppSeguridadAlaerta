import type { Controller } from '@agente/shared/types'
import { RegistroEventoDto, registroEventoUseCase } from './registro-evento'
import { incidenteMapper } from './incidentes.mapper'

export const registroEvento: Controller = (req, res, next) => {
  const [error, dto] = RegistroEventoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registroEventoUseCase(dto!)
    .then((incidente) =>
      res.json({
        mensaje: 'Incidente registrado correctamente',
        datos: incidenteMapper(incidente),
      }),
    )
    .catch((error) => {
      next(error)
    })
}
