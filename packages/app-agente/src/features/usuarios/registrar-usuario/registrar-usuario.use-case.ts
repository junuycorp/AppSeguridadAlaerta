import { PersonaRepository } from '@agente/shared/repositories'
import { type Usuario, UsuarioRepository } from '../usuarios.repository'
import { type RegistrarUsuarioDto } from './registrar-usuario.dto'
import { ID } from '@agente/shared/constants'
import { CustomError } from '@agente/errors'
import { bcryptAdapter } from '@agente/adapters'

export const registrarUsuarioUseCase = async (
  crudDto: RegistrarUsuarioDto,
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

const buscarErrorCrear = async (nroDocumento: string): Promise<void> => {
  // Verificar si ya existe usuario
  const usuario = await UsuarioRepository.buscarPorId(nroDocumento)
  if (usuario) throw CustomError.conflict('El usuario ya se encuentra registrado')
}
