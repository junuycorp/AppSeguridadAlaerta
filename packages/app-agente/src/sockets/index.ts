import { cacheAdapter } from '@agente/adapters'
import { envs, logger } from '@agente/configs'
import { enviarMensajeDto } from '@agente/features/chat'
import { ChatRepository } from '@agente/features/chat/chat.repository'
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

      dto.destinatarios.forEach(async (destinatario) => {
        // Enviar mensaje a sereno
        if (destinatario.tipo === 'sereno') {
          const socketId = getSocketIdFromUserId(destinatario.nroDocumento)
          if (socketId != null) {
            const idRemitente = dto.remitente ?? nroDocumento
            const tipoRemitente = dto.tipoRemitente ?? 'sereno'
            io.to(socketId).emit('server:enviar-mensaje', {
              mensaje: dto.mensaje,
              remitente: idRemitente,
              tipoRemitente,
            })

            await ChatRepository.crearMensaje({
              idIncidente: 84,
              idRemitente,
              idDestinatario: destinatario.nroDocumento,
              tipoRemitente,
              mensaje: dto.mensaje,
              estado: 'RECIBIDO',
            })
          } else {
            await ChatRepository.crearMensaje({
              idIncidente: 84,
              idRemitente: dto.remitente ?? nroDocumento,
              idDestinatario: destinatario.nroDocumento,
              tipoRemitente: dto.tipoRemitente ?? 'sereno',
              mensaje: dto.mensaje,
              estado: 'ENVIADO',
            })
          }
        }
        if (destinatario.tipo === 'ciudadano') {
          // Obtener socket del servidor ciudadano
          const socketId = getSocketIdFromUserId(envs.SOCKETS_SERVER_TOKEN)

          if (socketId != null) {
            io.to(socketId).emit('server-agente:enviar-mensaje', {
              destinatario: destinatario.nroDocumento,
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
