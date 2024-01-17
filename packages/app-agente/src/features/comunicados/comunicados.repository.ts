import { type Comunicado, prisma, type Prisma } from '@agente/database'

type CrearComunicado = Prisma.ComunicadoUncheckedCreateInput

export class ComunicadoRepository {
  static crear = async (data: CrearComunicado): Promise<Comunicado> => {
    const comunicado = await prisma.comunicado.create({
      data,
    })
    return comunicado
  }

  static listar = async (): Promise<Comunicado[]> => {
    const comunicados = await prisma.comunicado.findMany()
    return comunicados
  }
}
