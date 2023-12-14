import type { Server } from 'socket.io'
import type { Controller } from '@agente/shared/types'
import { RegistroEventoDto } from './registro-evento.dto'
import { registroEventoUseCase } from './registro-evento.use-case'
import { incidenteMapper } from '../incidentes.mapper'

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
