import { prisma, type Perfil } from '@agente/database'

export const listarUseCase = async (): Promise<Perfil[]> => {
  const perfil = await prisma.perfil.findMany()
  return perfil
}
