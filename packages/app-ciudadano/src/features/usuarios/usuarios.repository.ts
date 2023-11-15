import { prisma } from '@/database'
import type { CuentaUsuario, Prisma } from '@prisma/client'

type CrearUsuario = Prisma.CuentaUsuarioUncheckedCreateInput
type ActualizarUsuario = Prisma.CuentaUsuarioUncheckedUpdateInput

export type Usuario = CuentaUsuario

export class UsuarioRepository {
  static listar = async (): Promise<Usuario[]> => {
    return await prisma.cuentaUsuario.findMany()
  }

  static buscarPorId = async (nroDocumento: string): Promise<Usuario | null> => {
    return await prisma.cuentaUsuario.findUnique({ where: { nroDocumento } })
  }

  static crear = async (datos: CrearUsuario): Promise<Usuario> => {
    return await prisma.cuentaUsuario.create({ data: datos })
  }

  static actualizar = async (
    nroDocumento: string,
    datos: ActualizarUsuario,
  ): Promise<Usuario> => {
    return await prisma.cuentaUsuario.update({
      where: { nroDocumento },
      data: datos,
    })
  }

  static eliminar = async (nroDocumento: string): Promise<Usuario> => {
    return await prisma.cuentaUsuario.delete({ where: { nroDocumento } })
  }
}
