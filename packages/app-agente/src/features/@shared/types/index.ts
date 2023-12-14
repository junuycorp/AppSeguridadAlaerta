import type { Request, Response, NextFunction } from 'express'

// Agregar undefined y string si es de tipo number a todas las propiedades
export type Flexible<T> = {
  [K in keyof T]: T[K] extends number | Date | undefined
    ? string | undefined
    : T[K] | undefined
}

// Agregar undefined para ciertas propiedades que se especifiquen
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

// Funcion controlador de express
export type Controller = (req: Request, res: Response, next: NextFunction) => void

export type Estado = 'PENDIENTE' | 'RECIBIDO' | 'ASIGNADO' | 'TERMINADO'
