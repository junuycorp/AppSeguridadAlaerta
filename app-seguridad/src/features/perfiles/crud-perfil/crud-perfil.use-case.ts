import { prisma } from '@/database'
import type { Perfil } from '@prisma/client'

export const listarUseCase = async (): Promise<Perfil[]> => {
  const perfil = await prisma.perfil.findMany()
  return perfil
}
