// Validar token para utilizar servicio

import type { Request, Response, NextFunction } from 'express'
import { envs } from '@agente/configs'

export const validarTokenServicio = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { token } = req.headers
  if (token == null) {
    res.status(401).json({ mensaje: 'Token no proporcionado' })
    return
  }
  if (token !== envs.SERVICES_TOKEN) {
    res.status(401).json({ mensaje: 'Token no válido' })
    return
  }
  next()
}
