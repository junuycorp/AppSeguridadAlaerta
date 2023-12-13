import { cacheAdapter } from '@agente/adapters'
import type { Server } from 'socket.io'

export const socketController = (io: Server): void => {
  io.on('connection', (socket) => {
    const nroDocumento = socket.handshake.auth.userId
    const socketId = socket.id
    const socketKey = `socketId-${nroDocumento}`

    // Guardar en cache
    cacheAdapter.set(socketKey, socketId)

    socket.on('disconnect', () => {
      // Remover id de cache
      cacheAdapter.del(socketKey)
    })
  })
}
