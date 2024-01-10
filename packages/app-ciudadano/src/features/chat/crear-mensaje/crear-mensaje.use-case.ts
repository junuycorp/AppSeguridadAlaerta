import { crearMensajeService, type InputCrearMensaje } from './crear-mensaje.service'

export const crearMensajeUseCase = async (
  datos: InputCrearMensaje,
): Promise<void> => {
  await crearMensajeService(datos)
}
