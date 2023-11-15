import { CustomError } from '@agente/errors'
import { consultaPersona } from '@agente/services'
import { PersonaRepository, type Persona } from '@agente/shared/repositories'
import type { ConsultaPersonaDto } from './consulta-persona.dto'

export const consultaPersonaUseCase = async (
  consultaPersonaDto: ConsultaPersonaDto,
): Promise<Persona> => {
  const { numeroDocumento } = consultaPersonaDto

  // Buscar en base de datos
  let persona = await PersonaRepository.buscarPorId(numeroDocumento)
  if (persona) return persona

  // Buscar en endpoint
  if (numeroDocumento.length === 8 || numeroDocumento.length === 11) {
    const data = await consultaPersona(numeroDocumento)
    if (!data) throw CustomError.notFound('No se encontró a la persona')
    // Guardar en BD
    persona = await PersonaRepository.crear({
      nroDocumento: data.numeroDocumento,
      razonSocial: data.razonSocial,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      fechaNacimiento: data.fechaNacimiento,
      sexo: data.sexo,
      idTipoDocumento: data.tipoDocumento.idTipoDocumento,
      idTipoPersona: data.tipoPersona.idTipoPersona,
      codigoUbigeo: data.ubigeo?.codigoUbigeo,
      idNacionalidad: data.nacionalidad?.idNacionalidad,
      usuarioCreador: 'sistema-pide',
    })
  }

  if (!persona) throw CustomError.notFound('No se encontró a la persona')

  return persona
}
