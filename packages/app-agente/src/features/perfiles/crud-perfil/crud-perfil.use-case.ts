import { prisma, type Perfil } from '@agente/database'
import { CustomError } from '@agente/errors'
import { PerfilRepository } from '../perfiles.repository'
import type { CrudPerfilDto, EstadoPerfilDto } from './crud-perfil.dto'
import {
  buscarErrorActualizar,
  buscarErrorCambiarEstado,
  buscarErrorEliminar,
} from './crud-perfil.helper'

export const listarUseCase = async (): Promise<Perfil[]> => {
  const perfiles = await prisma.perfil.findMany()
  return perfiles
}

export const buscarUseCase = async (id: number): Promise<Perfil> => {
  const perfil = await PerfilRepository.buscarPorId(id)
  if (!perfil) throw CustomError.notFound(`No se encontró la perfil`)
  return perfil
}

export const crearUseCase = async (crudDto: CrudPerfilDto): Promise<Perfil> => {
  const perfil = await PerfilRepository.crear(crudDto)
  return perfil
}

export const actualizarUseCase = async (
  crudDto: CrudPerfilDto,
  id: number,
): Promise<Perfil> => {
  try {
    const entidad = await PerfilRepository.actualizar(id, crudDto)
    return entidad
  } catch (error) {
    await buscarErrorActualizar(crudDto, id)
    throw error
  }
}

export const eliminarUseCase = async (id: number): Promise<Perfil> => {
  try {
    const perfil = await PerfilRepository.eliminar(id)
    return perfil
  } catch (error) {
    await buscarErrorEliminar(id)
    throw CustomError.conflict('Es posible que el perfil esté siendo usado')
  }
}

export const cambiarEstadoUseCase = async (
  estadoDto: EstadoPerfilDto,
): Promise<Perfil> => {
  try {
    const { perfilCodigo, estadoRegistro } = estadoDto
    const perfil = await PerfilRepository.actualizar(perfilCodigo, {
      estadoRegistro,
    })
    return perfil
  } catch (error) {
    await buscarErrorCambiarEstado(estadoDto)
    throw error
  }
}
