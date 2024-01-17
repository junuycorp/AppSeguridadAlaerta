import { type Controller } from '@agente/shared/types'
import { NotificarDto } from './notificar/notificar.dto'
import { notificarUseCase } from './notificar/notificar.use-case'
import { type Server } from 'socket.io'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import { envs, logger } from '@agente/configs'
import { listarComunicadosUseCase } from './listar/listar.use-case'

export const notificarCiudadanos: Controller = (req, res, next) => {
  const [error, dto] = NotificarDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  const idUsuario = req.headers.idUser as string
  notificarUseCase(dto!, idUsuario)
    .then((resp) => {
      // Notificar a usuarios
      const io = req.app.get('socketio') as Server

      const socketId = getSocketIdFromUserId(envs.SOCKETS_SERVER_TOKEN)

      if (socketId == null) {
        res.status(503).json({
          mensaje: 'Servicio no disponible',
        })
        logger.error({
          file: 'comunicados.controller.ts',
          error: 'Ciudadano server is not connected',
        })
        return
      }

      io.to(socketId).emit('server-agente:notificar-ciudadanos', resp)

      res.json(resp)
    })
    .catch((error) => {
      next(error)
    })
}

export const listarComunicados: Controller = (req, res, next) => {
  listarComunicadosUseCase()
    .then((resp) => res.json(resp))
    .catch((error) => {
      next(error)
    })
}
