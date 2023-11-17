import { CustomError } from '@agente/errors'
import { UsuarioRepository } from '../usuarios.repository'
import type { CrudUsuarioDto, EstadoUsuarioDto } from './crud-usuario.dto'

const noExisteUsuarioPorId = async (id: string): Promise<void> => {
  const usuario = await UsuarioRepository.buscarPorId(id)
  if (!usuario) throw CustomError.notFound(`No se encontró el usuario`)
}

export const buscarErrorActualizar = async (
  dto: CrudUsuarioDto,
  id: string,
): Promise<void> => {
  await noExisteUsuarioPorId(id)

  let usuario = await UsuarioRepository.buscarPorCorreo(dto.correo)
  if (usuario) throw CustomError.conflict('Ya se encuentra registrado el correo')

  usuario = await UsuarioRepository.buscarPorNroCelular(dto.numeroCelular)
  if (usuario)
    throw CustomError.conflict('Ya se encuentra registrado el número de celular')
}

export const buscarErrorEliminar = async (id: string): Promise<void> => {
  await noExisteUsuarioPorId(id)
}

export const buscarErrorCambiarEstado = async (
  estadoDto: EstadoUsuarioDto,
): Promise<void> => {
  await noExisteUsuarioPorId(estadoDto.nroDocumento)
}
