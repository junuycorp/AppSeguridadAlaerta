import NodeCache from 'node-cache'

const cache = new NodeCache({ deleteOnExpire: true })

// Crear nuevo valor, tiempo de expiracion por defecto ilimitado
const set = (key: string, value: unknown, expireTime: number = 0): boolean => {
  return cache.set(key, value, expireTime)
}

const get = <T>(key: string): T | undefined => {
  return cache.get(key) as T
}

// Verificar si existe key
const has = (key: string): boolean => {
  return cache.has(key)
}

// Obtener y borrar key
const take = (key: string): unknown => {
  return cache.take(key)
}

const del = (key: string): number => {
  return cache.del(key)
}

export const cacheAdapter = {
  set,
  get,
  has,
  take,
  del,
}
