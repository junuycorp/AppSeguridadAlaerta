import { io as ioServer } from 'socket.io-client'
import type { Server } from 'socket.io'

import { cacheAdapter } from '@ciudadano/adapters'
import { envs, logger } from '@ciudadano/configs'
import { enviarMensajeDto } from '@ciudadano/features/chat/dto/enviar-mensaje.dto'
import { getSocketIdFromUserId } from '@ciudadano/shared/helpers/cache.helpers'
import { crearMensajeUseCase } from '@ciudadano/features/chat/crear-mensaje/crear-mensaje.use-case'
import { type Comunicado } from '@ciudadano/features/comunicados/comunicado.interface'
import { comunicadoUseCase } from '@ciudadano/features/comunicados/comunicado.use-case'

// Conectar a servidor agente
export const socketAgente = ioServer(envs.SEGURIDAD_API, {
  auth: {
    token: envs.SOCKETS_SERVER_TOKEN,
  },
})

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

      const dtoWithRemitente = {
        ...dto,
        remitente: socket.handshake.auth.userId,
        tipoRemitente: 'ciudadano',
      }
      socketAgente.emit('client:enviar-mensaje', dtoWithRemitente)
    })

    socket.on('disconnect', () => {
      // Remover id de cache
      cacheAdapter.del(socketKey)
    })
  })

  socketAgente.on(
    'server-agente:notificar-ciudadanos',
    async (data: Comunicado): Promise<void> => {
      await comunicadoUseCase(data) // Enviar notificacion
      io.emit('server:enviar-comunicado', data) // Enviar evento
    },
  )

  socketAgente.on(
    'server-agente:enviar-mensaje',
    async (data: ServerAgenteEnviarMensaje) => {
      const { idIncidente, mensaje, destinatario, remitente, tipoRemitente } = data
      const socketId = getSocketIdFromUserId(destinatario)

      if (socketId != null) {
        try {
          // Guardar en BD, estado RECIBIDO
          await crearMensajeUseCase({
            idIncidente,
            idRemitente: remitente,
            idDestinatario: destinatario,
            tipoRemitente,
            mensaje,
            estado: 'RECIBIDO',
          })

          io.to(socketId).emit('server:enviar-mensaje', {
            idIncidente,
            mensaje,
            remitente,
            tipoRemitente,
          })
        } catch (error) {
          io.to(socketId).emit('server:error', {
            mensaje: 'Id de incidente proporcionado no válido',
          })
          logger.error('SOCKETSERVER', error)
        }
      } else {
        // Guardar en BD, estado ENVIADO
        try {
          await crearMensajeUseCase({
            idIncidente,
            idRemitente: remitente,
            idDestinatario: destinatario,
            tipoRemitente,
            mensaje,
            estado: 'ENVIADO',
          })
        } catch (error) {
          logger.error('SOCKETSERVER', error)
          // io.to(socketId).emit('server:error', {
          //   mensaje: 'Id de incidente proporcionado no válido',
          // })
        }
      }
    },
  )
  socketAgente.on(
    'server-agente:cambio-estado',
    async (data: ServerAgenteCambioEstado) => {
      const socketId = getSocketIdFromUserId(data.idDenunciante)
      if (socketId != null) {
        io.to(socketId).emit('server:cambio-estado', data)
      }
    },
  )
}

interface ServerAgenteEnviarMensaje {
  idIncidente: number
  mensaje: string
  destinatario: string
  remitente: string
  tipoRemitente: 'sereno' | 'ciudadano'
}

interface ServerAgenteCambioEstado {
  idIncidente: number
  idDenunciante: string
  estado: string
  subestado: string
  fechaCreacion: string
  fechaRecepcion: string
  fechaAsignacion: string
  fechaFinalizacion: string
}
