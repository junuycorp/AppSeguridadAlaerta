import type { NextFunction, Request, Response } from 'express'

// Convertir strings vacios a null y recortar espacios en blanco
export const emptyStringsToNull = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const isEmptyObj = Object.keys(req.body).length === 0
  if (!isEmptyObj) {
    setEmptyToNull(req.body)
  }
  next()
}

type Obj = Record<string, unknown>
const setEmptyToNull = (object: Obj): Obj => {
  Object.keys(object).forEach((key) => {
    const currentKey = object[key]
    // Verificar si es un string
    if (typeof currentKey === 'string') {
      const trimmedKey = currentKey.trim()
      object[key] = trimmedKey === '' ? null : trimmedKey
    }
    // Verificar si es un arreglo
    else if (Array.isArray(currentKey)) {
      if (currentKey.length !== 0) {
        ;(currentKey as Obj[]).forEach((obj) => {
          if (typeof obj === 'object') {
            setEmptyToNull(obj)
          }
        })
      }
    }
    // Verificar si es un objeto
    // NOTA: typeof [] o null es object
    else if (typeof currentKey === 'object' && currentKey !== null) {
      setEmptyToNull(currentKey as Obj)
    }
  })
  return object
}
