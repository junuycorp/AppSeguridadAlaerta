import { prisma, type CentroPoblado } from '@agente/database'

export class CentroPobladoRepository {
  static listar = async (): Promise<CentroPoblado[]> => {
    return await prisma.centroPoblado.findMany()
  }

  static buscarPorId = async (
    idCentroPoblado: number,
  ): Promise<CentroPoblado | null> => {
    return await prisma.centroPoblado.findUnique({
      where: { idCentroPoblado },
    })
  }
}
