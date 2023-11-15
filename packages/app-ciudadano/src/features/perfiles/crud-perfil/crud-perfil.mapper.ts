import type { Perfil } from '@ciudadano/database'

type PerfilMapper = Omit<Perfil, 'fechaCreacion' | 'fechaModificacion'>

export const crudPerfilMapper = (perfil: Perfil): PerfilMapper => {
  const { fechaCreacion, fechaModificacion, ...rest } = perfil
  return rest
}
