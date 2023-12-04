import type { Server } from 'socket.io'

export const socketController = (io: Server): void => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      // Desconectado
    })
  })
}
