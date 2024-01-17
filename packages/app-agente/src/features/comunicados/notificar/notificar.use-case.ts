/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { formatDate } from '@agente/shared/helpers'
import { ComunicadoRepository } from '../comunicados.repository'
import type { NotificarDto } from './notificar.dto'

export const notificarUseCase = async (dto: NotificarDto, idRemitente: string) => {
  const { mensaje, tipo } = dto
  const comunicado = await ComunicadoRepository.crear({ mensaje, tipo, idRemitente })

  const { fechaCreacion } = comunicado
  return {
    ...comunicado,
    fechaCreacion: formatDate(fechaCreacion),
  }
}
