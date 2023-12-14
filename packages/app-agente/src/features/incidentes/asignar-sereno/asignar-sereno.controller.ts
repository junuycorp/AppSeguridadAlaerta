import type { Server } from 'socket.io'
import type { Controller } from '@agente/shared/types'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import { AsignarIncidenteDto } from './asignar-incidente.dto'
import { asignarIncidenteUseCase } from './asignar-incidente.use-case'
import { incidenteSerenoMapper } from './asignar-incidente.mapper'
import { cambiarEstadoMapper } from '../cambiar-estado/cambiar-estado.mapper'

export const asignarIncidente: Controller = (req, res, next) => {
  const [error, dto] = AsignarIncidenteDto.crear(req.body)
  if (error != null || dto == null) {
    res.status(400).json({ mensaje: error })
    return
  }

  asignarIncidenteUseCase(dto)
    .then(([incidenteSereno, incidente]) => {
      const incidenteMapper = incidenteSerenoMapper(incidenteSereno)
      const mapIncidente = cambiarEstadoMapper(incidente)

      // Enviar notificacion a sereno asignado
      const socketId = getSocketIdFromUserId(dto.idSereno)
      let estadoNotificacion = {
        notificado: false,
        mensaje: 'Sereno no se encuentra conectado',
      }
      const io = req.app.get('socketio') as Server
      // Notificar a sereno
      if (socketId != null) {
        io.to(socketId).emit('server:incidente-asignado', {
          mensaje: 'Incidente asignado',
          datos: incidenteMapper,
        })
        estadoNotificacion = {
          notificado: true,
          mensaje: 'Sereno notificado',
        }
      }
      // Notificar a todos los administradores
      // TODO: Usar rooms para especificar
      io.emit('server:cambio-estado', mapIncidente)

      // Enviar respuesta endpoint
      res.json({
        mensaje: 'Asignado correctamente',
        datos: incidenteMapper,
        estadoNotificacion,
      })
    })
    .catch((error) => {
      next(error)
    })
}
