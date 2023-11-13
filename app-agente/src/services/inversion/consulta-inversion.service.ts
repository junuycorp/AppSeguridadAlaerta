import * as https from 'https'
import axios from 'axios'

interface Inversion {
  cui: string
  snip: string
  nombreInversion: string
  entidad: string
}

export const consultaInversion = async (
  cui: string,
): Promise<Inversion | undefined> => {
  const apiUrl = 'https://ofi5.mef.gob.pe/inviertews/Dashboard/traeDetInvSSI'

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })

  const data = new URLSearchParams()
  data.append('id', cui)

  const respuesta = await axios({
    method: 'post',
    baseURL: apiUrl,
    timeout: 10000,
    data,
    httpsAgent,
  })

  const inversion = respuesta.data[0]

  if (inversion === undefined) return undefined

  return {
    cui,
    snip: inversion.COD_SNIP,
    nombreInversion: inversion.NOMBRE_INVERSION,
    entidad: inversion.ENTIDAD,
  }
}
