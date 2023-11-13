import { cacheAdapter } from '@/adapters'
import type { VerificarCodigoDto } from './verificar-codigo.dto'
// import { prisma } from '@/database'

interface VerificarRespuesta {
  mensaje: string
  codigoValido: boolean
}

export const verificarCodigoUseCase = async (
  verificarCodigoDto: VerificarCodigoDto,
): Promise<VerificarRespuesta> => {
  const { opcion: _opcion, destino, codigoVerificacion } = verificarCodigoDto

  let codigoValido = false
  const codigoOriginal = cacheAdapter.get(destino) as string | null

  if (codigoOriginal == null)
    return {
      mensaje: 'El código es incorrecto o ya expiró. Inténtelo nuevamente',
      codigoValido,
    }

  if (codigoOriginal !== codigoVerificacion)
    return {
      mensaje: 'Código no válido',
      codigoValido,
    }

  cacheAdapter.del(destino)

  // TODO: Actualizar estado de verificado
  // if (opcion === 'correo') {
  //   await prisma.cuentaUsuario.update({
  //     where: { correo: destino },
  //     data: { correoVerificado: true },
  //   })
  // }
  // if (opcion === 'sms') {
  //   await prisma.cuentaUsuario.update({
  //     where: { numeroCelular: destino },
  //     data: { celularVerificado: true },
  //   })
  // }

  codigoValido = true

  return {
    mensaje: 'Código verificado correctamente',
    codigoValido,
  }
}
