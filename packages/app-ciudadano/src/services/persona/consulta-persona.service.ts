import axios from 'axios'
import type { PersonaAPI } from './persona-api.interface'
import { envs } from '@ciudadano/configs'

export const consultaPersona = async (
  numeroDocumento: string,
): Promise<PersonaAPI | undefined> => {
  // API: http://190.108.93.158:3399/servicios/persona/:nrodoc
  const apiUrl = envs.JUNUY_API
  const apiToken = envs.JUNUY_TOKEN

  const respuesta = await axios({
    method: 'get',
    baseURL: apiUrl,
    url: `/persona/${numeroDocumento}`,
    timeout: 15000,
    headers: {
      token: apiToken,
    },
  })

  const persona: PersonaAPI | undefined = respuesta.data
  if (!persona) return

  return persona
}
