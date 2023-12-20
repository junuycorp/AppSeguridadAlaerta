import { CustomError } from '@ciudadano/errors'
import {
  type Usuario,
  type ListarPaginacion,
  UsuarioRepository,
} from '../usuarios.repository'
import type { CrudUsuarioDto, EstadoUsuarioDto } from './crud-usuario.dto'
import {
  buscarErrorActualizar,
  buscarErrorCambiarEstado,
  buscarErrorCrear,
} from './crud-usuario.helper'
import { bcryptAdapter } from '@ciudadano/adapters'
import { ID } from '@ciudadano/shared/constants'
import { PersonaRepository } from '@ciudadano/shared/repositories'

export const listarConPaginacionUseCase = async (
  pagina: number = 1,
  tamanioPagina: number = 10,
): Promise<ListarPaginacion> => {
  return await UsuarioRepository.listarConPaginacion(pagina, tamanioPagina)
}

export const buscarUseCase = async (id: string): Promise<Usuario> => {
  const usuario = await UsuarioRepository.buscarPorId(id)
  if (!usuario) throw CustomError.notFound(`No se encontró el usuario`)
  return usuario
}

export const crearUseCase = async (
  crudDto: CrudUsuarioDto,
  codUsuarioCreador: string,
): Promise<Usuario> => {
  const { nombres, apellidoPaterno, apellidoMaterno, sexo, ...usuarioDto } = crudDto
  const razonSocial = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`
  try {
    // Crear persona si no existe
    await PersonaRepository.obtenerOCrear({
      nroDocumento: crudDto.nroDocumento,
      idTipoDocumento: ID.tipoDocumentoDNI,
      idTipoPersona: ID.tipoPersonaNatural,
      razonSocial,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento: null,
      sexo,
      codigoUbigeo: null,
      idNacionalidad: ID.nacionalidadPeru,
      usuarioCreador: codUsuarioCreador,
      usuarioModificador: null,
    })

    // Convertir contraseña en hash
    const { contrasena } = usuarioDto
    const hashContrasenia = bcryptAdapter.hash(contrasena)
    usuarioDto.contrasena = hashContrasenia

    const usuario = await UsuarioRepository.crear(usuarioDto)
    return usuario
  } catch (error) {
    await buscarErrorCrear(usuarioDto.nroDocumento)
    throw error
  }
}

export const actualizarUseCase = async (
  crudDto: CrudUsuarioDto,
  codUsuarioModificador: string,
): Promise<Usuario> => {
  const id = crudDto.nroDocumento
  try {
    const { apellidoMaterno, apellidoPaterno, nombres, sexo, ...datosUsuario } =
      crudDto
    const datosPersona = {
      nroDocumento: crudDto.nroDocumento,
      razonSocial: `${nombres} ${apellidoPaterno} ${apellidoMaterno}`,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      sexo,
      usuarioModificador: codUsuarioModificador,
    }

    const hashContrasenia = bcryptAdapter.hash(datosUsuario.contrasena)
    datosUsuario.contrasena = hashContrasenia

    const usuario = await UsuarioRepository.actualizarUsuarioPersona(
      datosPersona,
      datosUsuario,
    )

    return usuario
  } catch (error) {
    await buscarErrorActualizar(crudDto, id)
    throw error
  }
}
// export const eliminarUseCase = async (id: string): Promise<Usuario> => {
//   try {
//     const usuario = await UsuarioRepository.eliminar(id)
//     return usuario
//   } catch (error) {
//     await buscarErrorEliminar(id)
//     throw CustomError.conflict('Es posible que el perfil esté siendo usado')
//   }
// }

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
