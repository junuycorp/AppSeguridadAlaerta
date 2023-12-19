import type { Server } from 'socket.io'
import type { Controller } from '@agente/shared/types'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import { AsignarIncidenteDto } from './asignar-incidente.dto'
import { asignarIncidenteUseCase } from './asignar-incidente.use-case'
import { cambiarEstadoMapper } from '../cambiar-estado/cambiar-estado.mapper'

export const asignarIncidente: Controller = (req, res, next) => {
  const [error, dto] = AsignarIncidenteDto.crear(req.body)
  if (error != null || dto == null) {
    res.status(400).json({ mensaje: error })
    return
  }

  asignarIncidenteUseCase(dto)
    .then((incidenteSereno) => {
      const io = req.app.get('socketio') as Server
      const mapIncidente = cambiarEstadoMapper(incidenteSereno[0].incidente)

      const listaAsignaciones = incidenteSereno.map(
        ({ idIncidente, incidente, sereno }) => {
          // Enviar notificacion a sereno asignado
          const socketId = getSocketIdFromUserId(sereno.idSereno)
          let estadoNotificacion = {
            notificado: false,
            mensaje: 'Sereno no se encuentra conectado',
          }
          // Notificar a sereno
          if (socketId != null) {
            io.to(socketId).emit('server:incidente-asignado', {
              mensaje: 'Incidente asignado',
              datos: {
                idIncidente,
                idSereno: sereno.idSereno,
                incidente,
              },
            })
            estadoNotificacion = {
              notificado: true,
              mensaje: 'Sereno notificado',
            }
          }
          return {
            idIncidente,
            sereno,
            estadoNotificacion,
          }
        },
      )
      // Notificar a todos los administradores
      // TODO: Usar rooms para especificar
      io.emit('server:cambio-estado', mapIncidente)

      // Enviar respuesta endpoint
      res.json({
        mensaje: 'Asignado correctamente',
        datos: listaAsignaciones,
      })
    })
    .catch((error) => {
      next(error)
    })
}
