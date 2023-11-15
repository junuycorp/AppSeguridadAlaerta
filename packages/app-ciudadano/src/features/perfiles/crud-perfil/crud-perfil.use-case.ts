import { prisma, type Perfil } from '@ciudadano/database'

export const listarUseCase = async (): Promise<Perfil[]> => {
  const perfil = await prisma.perfil.findMany()
  return perfil
}
