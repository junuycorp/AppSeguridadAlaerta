import type { Usuario } from '../usuarios.repository'

type OmitProps =
  | 'celularVerificado'
  | 'contrasena'
  | 'contrasenaAnterior'
  | 'correoVerificado'
  | 'fechaCreacion'
  | 'fechaModificacion'
  | 'preguntaSecreta'
  | 'respuesta'
type PerfilMapper = Omit<Usuario, OmitProps>

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
    ...rest
  } = usuario
  return rest
}
