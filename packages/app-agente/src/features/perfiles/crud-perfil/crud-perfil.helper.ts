import { CustomError } from '@agente/errors'
import type { CrudPerfilDto, EstadoPerfilDto } from './crud-perfil.dto'
import { PerfilRepository } from '../perfiles.repository'

/** VERIFICACIONES COMUNES
 * - Registro a alterar existe (al actualizar, eliminar, cambiarEstado)
 */

const noExistePerfilPorId = async (id: number): Promise<void> => {
  const perfil = await PerfilRepository.buscarPorId(id)
  if (!perfil) throw CustomError.notFound(`No se encontró el perfil`)
}

export const buscarErrorActualizar = async (
  crudDto: CrudPerfilDto,
  id: number,
): Promise<void> => {
  await noExistePerfilPorId(id)
}

export const buscarErrorEliminar = async (id: number): Promise<void> => {
  await noExistePerfilPorId(id)
}

export const buscarErrorCambiarEstado = async (
  estadoDto: EstadoPerfilDto,
): Promise<void> => {
  await noExistePerfilPorId(estadoDto.perfilCodigo)
}
