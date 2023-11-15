import { validators } from '@/configs'

export class EnviarCodigoDto {
  private constructor(
    public opcion: 'correo' | 'sms',
    public destino: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, EnviarCodigoDto?] {
    const { destino, opcion } = object as Partial<EnviarCodigoDto>

    if (opcion == null) return ['Falta proporcionar opción']
    if (destino == null) return ['Falta proporcionar destino']

    if (opcion !== 'correo' && opcion !== 'sms') return ['Opción no es válido']

    if (opcion === 'correo' && !validators.correo.test(destino))
      return ['Destino no es válido']

    if (opcion === 'sms' && !validators.numeroCelular.test(destino))
      return ['Destino no es válido']

    return [undefined, new EnviarCodigoDto(opcion, destino)]
  }
}
