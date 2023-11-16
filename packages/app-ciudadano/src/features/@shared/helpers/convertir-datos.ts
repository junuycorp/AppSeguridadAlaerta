import { CustomError } from '@ciudadano/errors'

// Convertir a numero o undefined o lanzar error
export const toNumberOrUndefined = (
  value: unknown,
  name: string,
  message: string = 'no es válido',
): number | undefined => {
  if (value == null) return undefined
  const numValue = Number(value)
  if (isNaN(numValue)) throw CustomError.badRequest(`${name} ${message}`)
  return numValue
}

// Convertir a numero o lanzar error
export const toNumber = (
  value: unknown,
  name: string,
  message: string = 'no es válido',
): number => {
  if (value == null) throw CustomError.badRequest(`${name} ${message}`)
  const numValue = Number(value)
  if (isNaN(numValue)) throw CustomError.badRequest(`${name} ${message}`)
  return numValue
}
