import { prisma } from '@/database'
import { CustomError } from '@/errors'
import { bcryptAdapter } from '@/adapters'
import type { RegistrarDto } from './registrar.dto'
import { codigoId } from '@shared/constants'
import { PersonaRepository } from '@shared/repositories'

export const registrarUseCase = async (
  registrarDto: RegistrarDto,
): Promise<void> => {
  const { numeroDocumento, correo, contrasenia, numeroCelular } = registrarDto

  // Verificar si usuario ya existe
  const existeUsuario = await prisma.cuentaUsuario.findUnique({
    where: { nroDocumento: numeroDocumento },
  })
  if (existeUsuario)
    throw CustomError.badRequest('Usuario ya se encuentra registrado')

  // Verificar si persona existe en DB
  const existePersona = await PersonaRepository.buscarPorId(numeroDocumento)
  if (!existePersona)
    throw CustomError.notFound(
      `No existen registros de la persona con número documento ${numeroDocumento}`,
    )

  // Verificar si correo está en uso
  const existeCorreo = await prisma.cuentaUsuario.findFirst({
    where: { correo },
  })
  if (existeCorreo) throw CustomError.badRequest('El correo ya se encuentra en uso')

  // Verificar si numero celular está en uso
  const existeCelular = await prisma.cuentaUsuario.findFirst({
    where: { numeroCelular },
  })
  if (existeCelular)
    throw CustomError.badRequest('El número de celular ya se encuentra en uso')

  // Hash de contraseña
  const hashClave = bcryptAdapter.hash(contrasenia)

  await prisma.cuentaUsuario.create({
    data: {
      nroDocumento: numeroDocumento,
      correo,
      numeroCelular,
      contrasena: hashClave,
      perfilCodigo: codigoId.idPerfilUsuario,
    },
  })
}
