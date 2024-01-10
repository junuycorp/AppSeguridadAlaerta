import type { Server } from 'socket.io'
import type { Controller } from '@agente/shared/types'
import { RegistrarInformeDto } from './registrar-informe.dto'
import { registrarInformeUseCase } from './registrar-informe.use-case'
import { registrarInformeMapper } from './registrar-informe.mapper'
import { cambiarEstadoMapper } from '@agente/features/incidentes/cambiar-estado/cambiar-estado.mapper'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import { envs } from '@agente/configs'

type Archivos = Express.Multer.File[] | undefined
export const registrarInforme: Controller = (req, res, next) => {
  const idSereno = req.headers.idUser as string
  const archivos = req.files as Archivos
  const [error, dto] = RegistrarInformeDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarInformeUseCase(dto!, idSereno, archivos)
    .then(([informe, incidente]) => {
      const mapIncidente = cambiarEstadoMapper(incidente)

      // Notificar cambio estado
      const io = req.app.get('socketio') as Server
      // TODO: Notificar usando rooms
      io.emit('server:cambio-estado', mapIncidente)

      // Notificar a ciudadano
      const socketServerCiudadano = getSocketIdFromUserId(envs.SOCKETS_SERVER_TOKEN)
      if (socketServerCiudadano != null) {
        io.to(socketServerCiudadano).emit(
          'server-agente:cambio-estado',
          mapIncidente,
        )
      }

      // Enviar respues de peticion
      res.json({
        mensaje: 'Informe registrado correctamente',
        datos: registrarInformeMapper(informe),
      })
    })
    .catch((error) => {
      next(error)
    })
}
