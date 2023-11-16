import { type Prisma, type Persona as PrismaPersona, prisma } from '@agente/database'

type CrearPersona = Prisma.PersonaUncheckedCreateInput
type ActualizarPersona = Prisma.PersonaUncheckedUpdateInput

export type Persona = PrismaPersona

export class PersonaRepository {
  static listar = async (): Promise<Persona[]> => {
    return await prisma.persona.findMany()
  }

  static buscarPorId = async (nroDocumento: string): Promise<Persona | null> => {
    return await prisma.persona.findUnique({ where: { nroDocumento } })
  }

  static crear = async (datos: CrearPersona): Promise<Persona> => {
    return await prisma.persona.create({ data: datos })
  }

  static actualizar = async (
    nroDocumento: string,
    datos: ActualizarPersona,
  ): Promise<Persona> => {
    return await prisma.persona.update({
      where: { nroDocumento },
      data: datos,
    })
  }

  static eliminar = async (nroDocumento: string): Promise<Persona> => {
    return await prisma.persona.delete({ where: { nroDocumento } })
  }
}
