import type { Controller } from '@agente/shared/types'
import { RegistroEventoDto, registroEventoUseCase } from './registro-evento'
import { incidenteMapper } from './incidentes.mapper'
import type { Server } from 'socket.io'

export const registroEvento: Controller = (req, res, next) => {
  const [error, dto] = RegistroEventoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registroEventoUseCase(dto!)
    .then((incidente) => {
      const io = req.app.get('socketio') as Server
      const mapIncidente = incidenteMapper(incidente)

      io.emit('server:nuevo-incidente', mapIncidente)
      res.json({
        mensaje: 'Incidente registrado correctamente',
        datos: mapIncidente,
      })
    })
    .catch((error) => {
      next(error)
    })
}
