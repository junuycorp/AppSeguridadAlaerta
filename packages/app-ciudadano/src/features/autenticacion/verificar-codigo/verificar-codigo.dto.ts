import { validators } from '@ciudadano/configs'

export class VerificarCodigoDto {
  private constructor(
    public opcion: 'correo' | 'sms',
    public destino: string,
    public codigoVerificacion: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, VerificarCodigoDto?] {
    const { opcion, destino, codigoVerificacion } =
      object as Partial<VerificarCodigoDto>

    const regexCodigo = /^\d{6}$/

    if (opcion == null) return ['Falta proporcionar opción']
    if (destino == null) return ['Falta proporcionar destino']
    if (codigoVerificacion == null) return ['Falta código de verificación']

    if (!regexCodigo.test(codigoVerificacion))
      return ['Código de verificación no válido']

    if (opcion !== 'correo' && opcion !== 'sms') return ['Opción no es válido']

    if (opcion === 'correo' && !validators.correo.test(destino))
      return ['Destino no es válido']

    if (opcion === 'sms' && !validators.numeroCelular.test(destino))
      return ['Destino no es válido']

    return [undefined, new VerificarCodigoDto(opcion, destino, codigoVerificacion)]
  }
}
