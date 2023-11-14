import type { IniciarSesionDto } from './iniciar-sesion.dto'
import { CustomError } from '@/errors'
import { prisma } from '@/database'
import { bcryptAdapter, jwtAdapter } from '@/adapters'
import { PersonaRepository } from '@shared/repositories'

export const iniciarSesionUseCase = async (
  iniciarSesionDto: IniciarSesionDto,
): Promise<string> => {
  const { numeroDocumento, contrasenia } = iniciarSesionDto

  // Verificar si usuario ya existe
  // TODO: Implementacion con repositorio
  const usuario = await prisma.cuentaUsuario.findUnique({
    where: { nroDocumento: numeroDocumento },
  })
  if (!usuario) throw CustomError.badRequest('Usuario y/o contraseña no válidos')

  // Verificar contraseña
  const esValido = bcryptAdapter.compare(contrasenia, usuario.contrasena)
  if (!esValido) throw CustomError.badRequest('Usuario y/o contraseña no válidos')

  // Obtener datos de persona
  const persona = await PersonaRepository.buscarPorId(numeroDocumento)
  if (!persona)
    throw CustomError.internalServer('Error al cargar información del usuario')

  const payload = {
    numeroDocumento: persona.nroDocumento,
    razonSocial: persona.razonSocial,
    nombres: persona.nombres,
    apellidoPaterno: persona.apellidoPaterno,
    apellidoMaterno: persona.apellidoMaterno,
  }

  // Token
  const token = await jwtAdapter.generateToken(payload, '1h')
  if (token == null) throw CustomError.internalServer('Error al generar token')

  return token
}
