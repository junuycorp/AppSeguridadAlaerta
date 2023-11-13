/* NO UTILIZADO - MEJOR ALTERNATIVA ENCONTRADA
import puppeteer, { TimeoutError } from 'puppeteer'
import { CustomError } from '@/errors'

interface Inversion {
  cui: string
  snip: string
  nombreInversion: string
}

// Obteniendo información realizando Scrapping
export const consultaInversionScrap = async (
  codUnico: string,
): Promise<Inversion | undefined> => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  const url = 'https://ofi5.mef.gob.pe/ssi/Ssi/Indexm'

  let nombreInversion: string | null
  let snip: string | null

  try {
    await page.goto(url)
    await page.type('#txt_cod', codUnico) // Ingresar codigo
    await page.click('td > span > img') // Precionar para buscar
    await page.waitForSelector('#td_nominv:not(:empty)', { timeout: 5000 })

    nombreInversion = await page.$eval('#td_nominv', (el) => el.textContent)
    snip = await page.$eval('#td_snip', (el) => el.textContent)
  } catch (error) {
    if (error instanceof TimeoutError)
      throw CustomError.notFound('No se encontraron resultados')
    throw error
  }
  await browser.close()

  if (nombreInversion == null || snip == null) return undefined

  return {
    cui: codUnico,
    snip,
    nombreInversion,
  }
}
*/
