import { cacheAdapter } from '@agente/adapters'
import { envs, logger } from '@agente/configs'
import { enviarMensajeDto } from '@agente/features/chat'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import type { Server } from 'socket.io'

export const socketController = (io: Server): void => {
  io.on('connection', (socket) => {
    const nroDocumento = socket.handshake.auth.userId
    const socketId = socket.id
    const socketKey = `socketId-${nroDocumento}`

    // Guardar en cache
    cacheAdapter.set(socketKey, socketId)

    socket.on('client:enviar-mensaje', (data) => {
      // Validar
      const [error, dto] = enviarMensajeDto(data)
      if (error != null || dto == null) {
        socket.emit('server:error', { mensaje: error })
        return
      }

      dto.destinatarios.forEach((item) => {
        // Enviar mensaje a sereno
        if (item.tipo === 'sereno') {
          const socketId = getSocketIdFromUserId(item.nroDocumento)
          if (socketId != null) {
            io.to(socketId).emit('server:enviar-mensaje', {
              mensaje: dto.mensaje,
              remitente: dto.remitente ?? nroDocumento,
              tipoRemitente: dto.tipoRemitente ?? 'sereno',
            })

            // Guardar en BD
          }
          // TODO: Mantener en cache mensajes pendientes a usuario desconectado
        }
        if (item.tipo === 'ciudadano') {
          // Obtener socket del servidor ciudadano
          const socketId = getSocketIdFromUserId(envs.SOCKETS_SERVER_TOKEN)

          if (socketId != null) {
            io.to(socketId).emit('server-agente:enviar-mensaje', {
              mensaje: dto.mensaje,
              remitente: dto.remitente ?? nroDocumento,
              tipoRemitente: 'sereno',
            })
          } else {
            logger.warn('Servidor socket de ciudadano no conectado')
          }
        }
      })
    })

    socket.on('disconnect', () => {
      // Remover id de cache
      cacheAdapter.del(socketKey)
    })
  })
}
