import type { Controller } from '@agente/shared/types'
import { AsignarIncidenteDto, asignarIncidenteUseCase } from './asignar-incidente'

export const asignarIncidente: Controller = (req, res, next) => {
  const [error, dto] = AsignarIncidenteDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }

  // TODO: Notificar a sereno con socket.io
  asignarIncidenteUseCase(dto!)
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
