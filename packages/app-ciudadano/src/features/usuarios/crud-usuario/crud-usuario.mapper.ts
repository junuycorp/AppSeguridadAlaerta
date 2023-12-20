import type { Persona, CuentaUsuario as Usuario } from '@prisma-agente/client'

interface PerfilMapper {
  nroDocumento: string
  correo: string | null
  numeroCelular: string | null
  perfilCodigo: number
  estadoRegistro: boolean
  persona: {
    razonSocial: string
    nombres: string | null
    apellidoPaterno: string | null
    apellidoMaterno: string | null
    sexo: string | null
  }
}

interface TUsuario extends Usuario {
  persona: Persona
}

export const crudUsuarioMapper = (usuario: Usuario): PerfilMapper => {
  const {
    celularVerificado,
    contrasena,
    contrasenaAnterior,
    correoVerificado,
    fechaCreacion,
    fechaModificacion,
    preguntaSecreta,
    respuesta,
    persona,
    ...rest
  } = usuario as TUsuario

  const { razonSocial, nombres, apellidoMaterno, apellidoPaterno, sexo } = persona

  return {
    ...rest,
    persona: {
      razonSocial,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      sexo,
    },
  }
}
