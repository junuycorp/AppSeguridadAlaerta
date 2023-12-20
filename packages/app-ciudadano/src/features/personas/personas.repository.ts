import type { Prisma, Persona as PrismaPersona } from '@ciudadano/database'
import { prisma } from '@ciudadano/database'

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

  static obtenerOCrear = async (datos: CrearPersona): Promise<Persona> => {
    return await prisma.persona.upsert({
      where: { nroDocumento: datos.nroDocumento },
      update: {},
      create: { ...datos },
    })
  }
}
