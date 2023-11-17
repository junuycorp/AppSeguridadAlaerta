import { CustomError } from '@agente/errors'
import { type Usuario, UsuarioRepository } from '../usuarios.repository'
import type { CrudUsuarioDto, EstadoUsuarioDto } from './crud-usuario.dto'
import {
  buscarErrorActualizar,
  buscarErrorCambiarEstado,
  buscarErrorEliminar,
} from './crud-usuario.helper'

export const listarUseCase = async (): Promise<Usuario[]> => {
  return await UsuarioRepository.listar()
}

export const buscarUseCase = async (id: string): Promise<Usuario> => {
  const usuario = await UsuarioRepository.buscarPorId(id)
  if (!usuario) throw CustomError.notFound(`No se encontró el usuario`)
  return usuario
}

export const actualizarUseCase = async (
  crudDto: CrudUsuarioDto,
  id: string,
): Promise<Usuario> => {
  try {
    const usuario = await UsuarioRepository.actualizar(id, crudDto)
    return usuario
  } catch (error) {
    await buscarErrorActualizar(crudDto, id)
    throw error
  }
}
export const eliminarUseCase = async (id: string): Promise<Usuario> => {
  try {
    const usuario = await UsuarioRepository.eliminar(id)
    return usuario
  } catch (error) {
    await buscarErrorEliminar(id)
    throw CustomError.conflict('Es posible que el perfil esté siendo usado')
  }
}

export const cambiarEstadoUseCase = async (
  estadoDto: EstadoUsuarioDto,
): Promise<Usuario> => {
  try {
    const { nroDocumento, estadoRegistro } = estadoDto
    const usuario = await UsuarioRepository.actualizar(nroDocumento, {
      estadoRegistro,
    })
    return usuario
  } catch (error) {
    await buscarErrorCambiarEstado(estadoDto)
    throw error
  }
}
