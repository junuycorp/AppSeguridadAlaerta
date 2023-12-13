import { cacheAdapter } from '@agente/adapters'

export const getSocketIdFromUserId = (userId: string): string | undefined => {
  // Formato socket key: socketId-userId
  const socketKey = `socketId-${userId}`
  const socketId = cacheAdapter.get<string | undefined>(socketKey)
  return socketId
}
