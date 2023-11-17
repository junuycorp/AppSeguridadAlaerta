import { prisma } from '@agente/database'
import type { CuentaUsuario, Prisma } from '@agente/database'

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

  static buscarPorCorreo = async (correo: string): Promise<Usuario | null> => {
    return await prisma.cuentaUsuario.findUnique({ where: { correo } })
  }

  static buscarPorNroCelular = async (
    numeroCelular: string,
  ): Promise<Usuario | null> => {
    return await prisma.cuentaUsuario.findUnique({ where: { numeroCelular } })
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
