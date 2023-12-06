import type { Incidente } from '@prisma-agente/client'

type ListarIncidenteMapper = Omit<
  Incidente,
  'idDenunciante' | 'fechaModificacion' | 'activo'
>

export const listarIncidenteMapper = (
  incidente: Incidente,
): ListarIncidenteMapper => {
  const { idDenunciante, activo, fechaModificacion, ...rest } = incidente
  return rest
}
