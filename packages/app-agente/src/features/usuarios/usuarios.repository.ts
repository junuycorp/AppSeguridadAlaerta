import { prisma } from '@agente/database'
import type { CuentaUsuario, Prisma } from '@agente/database'
import { CustomError } from '@agente/errors'

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

  static listarConPaginacion = async (
    pagina: number = 1,
    tamanioPagina: number = 10,
  ): Promise<ListarPaginacion> => {
    const total = await prisma.cuentaUsuario.count()
    const totalPaginas = Math.ceil(total / tamanioPagina)

    if (pagina < 1 || pagina > totalPaginas)
      throw CustomError.badRequest('Página fuera de rango')

    const indiceInicio = (pagina - 1) * tamanioPagina
    const datos = await prisma.cuentaUsuario.findMany({
      skip: indiceInicio,
      take: tamanioPagina,
    })
    return {
      totalElementos: total,
      totalPaginas,
      paginaActual: pagina,
      tamanioPagina: datos.length,
      datos,
    }
  }
}

export interface ListarPaginacion {
  totalElementos: number
  totalPaginas: number
  paginaActual: number
  tamanioPagina: number
  datos: Usuario[]
}
