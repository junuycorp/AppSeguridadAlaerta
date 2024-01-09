import { prisma } from '@agente/database'
import type { Mensaje, Prisma } from '@prisma-agente/client'

export class ChatRepository {
  static crearMensaje = async (
    data: Prisma.MensajeUncheckedCreateInput,
  ): Promise<Mensaje> => {
    return await prisma.mensaje.create({ data })
  }
}
