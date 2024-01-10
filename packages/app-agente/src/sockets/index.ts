import { cacheAdapter } from '@agente/adapters'
import { envs, logger } from '@agente/configs'
import { enviarMensajeDto } from '@agente/features/chat'
import { ChatRepository } from '@agente/features/chat/chat.repository'
import { getSocketIdFromUserId } from '@agente/shared/helpers'
import { Prisma } from '@prisma-agente/client'
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
            try {
              // Guardar en base de datos
              await ChatRepository.crearMensaje({
                idIncidente: dto.idIncidente,
                idRemitente,
                idDestinatario: destinatario.nroDocumento,
                tipoRemitente,
                mensaje: dto.mensaje,
                estado: 'RECIBIDO',
              })

              // Mandar mensaje
              io.to(socketId).emit('server:enviar-mensaje', {
                idIncidente: dto.idIncidente,
                mensaje: dto.mensaje,
                remitente: idRemitente,
                tipoRemitente,
              })
            } catch (error) {
              if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                  socket.emit('server:error', {
                    mensaje: 'Id de incidente no válido',
                  })
                }
              }
            }
          } else {
            try {
              await ChatRepository.crearMensaje({
                idIncidente: dto.idIncidente,
                idRemitente: dto.remitente ?? nroDocumento,
                idDestinatario: destinatario.nroDocumento,
                tipoRemitente: dto.tipoRemitente ?? 'sereno',
                mensaje: dto.mensaje,
                estado: 'ENVIADO',
              })
            } catch (error) {
              socket.emit('server:error', {
                mensaje: 'Id de incidente no válido',
              })
            }
          }
        }
        if (destinatario.tipo === 'ciudadano') {
          // Obtener socket del servidor ciudadano
          const socketId = getSocketIdFromUserId(envs.SOCKETS_SERVER_TOKEN)

          if (socketId != null) {
            io.to(socketId).emit('server-agente:enviar-mensaje', {
              idIncidente: dto.idIncidente,
              destinatario: destinatario.nroDocumento,
              mensaje: dto.mensaje,
              remitente: dto.remitente ?? nroDocumento,
              tipoRemitente: 'sereno',
            })
          } else {
            logger.error('Servidor socket de ciudadano no conectado')
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
