import { cacheAdapter } from '@agente/adapters'
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

      dto.destinatarios.forEach((idDestinatario) => {
        const socketId = getSocketIdFromUserId(idDestinatario)

        if (socketId != null) {
          io.to(socketId).emit('server:enviar-mensaje', {
            mensaje: dto.mensaje,
            remitente: nroDocumento,
          })
        }

        // TODO: Mantener en cache mensajes pendientes a usuario desconectado
      })
    })

    socket.on('disconnect', () => {
      // Remover id de cache
      cacheAdapter.del(socketKey)
    })
  })
}
