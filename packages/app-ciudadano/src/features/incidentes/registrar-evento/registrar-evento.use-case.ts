import type { RegistrarEventoDto } from './registrar-evento.dto'

interface DatosEvento {
  codUsuario: string
  descripcion: string
  longitud: string
  latitud: string
}

export const registrarEventoUseCase = async (
  dto: RegistrarEventoDto,
  codUsuario: string,
): Promise<DatosEvento> => {
  const datosEvento = {
    ...dto,
    codUsuario,
  }

  // TODO: Llamar a back de seguridad

  return datosEvento
}
