import { prisma } from '@ciudadano/database'
import type { Perfil as PrismaPerfil, Prisma } from '@ciudadano/database'

type CrearPerfil = Prisma.PerfilUncheckedCreateInput
type ActualizarPerfil = Prisma.PerfilUncheckedUpdateInput

export type Perfil = PrismaPerfil

export class PerfilRepository {
  static listar = async (): Promise<Perfil[]> => {
    return await prisma.perfil.findMany()
  }

  static buscarPorId = async (perfilCodigo: number): Promise<Perfil | null> => {
    return await prisma.perfil.findUnique({ where: { perfilCodigo } })
  }

  static crear = async (datos: CrearPerfil): Promise<Perfil> => {
    return await prisma.perfil.create({ data: datos })
  }

  static actualizar = async (
    perfilCodigo: number,
    datos: ActualizarPerfil,
  ): Promise<Perfil> => {
    return await prisma.perfil.update({
      where: { perfilCodigo },
      data: datos,
    })
  }

  static eliminar = async (perfilCodigo: number): Promise<Perfil> => {
    return await prisma.perfil.delete({ where: { perfilCodigo } })
  }

  static obtenerAccesosPorPerfil = async (
    perfilCodigo: number,
  ): Promise<Acceso[]> => {
    const resultado = await prisma.listaMenu.findMany({
      where: {
        perfilCodigo,
      },
      select: {
        nivelAcceso: true,
        menuAcceso: {
          select: {
            menuCodigo: true,
            nombre: true,
            descripcion: true,
            subSistema: true,
            nivel: true,
            tipoModulo: true,
            ruta: true,
            icono: true,
            ambitoAcceso: true,
            mostrarEnMenu: true,
            estadoRegistro: true,
          },
        },
      },
    })
    return resultado
  }
}

export interface Acceso {
  nivelAcceso: number
  menuAcceso: {
    descripcion: string
    icono: string | null
    estadoRegistro: boolean
    menuCodigo: string
    nombre: string
    subSistema: string
    nivel: number
    tipoModulo: string | null
    ruta: string | null
    ambitoAcceso: string | null
    mostrarEnMenu: boolean | null
  }
}
