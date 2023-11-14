import type { NextFunction, Request, Response } from 'express'
import { IniciarSesionDto, iniciarSesionUseCase } from './iniciar-sesion'

export const iniciarSesion = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const [error, iniciarSesionDto] = IniciarSesionDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  iniciarSesionUseCase(iniciarSesionDto!)
    .then((token) => res.json({ token }))
    .catch((error) => {
      next(error)
    })
}
