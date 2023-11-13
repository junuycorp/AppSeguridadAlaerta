import type { NextFunction, Request, Response } from 'express'
import { RegistrarDto, registrarUseCase } from './registrar'
import { IniciarSesionDto, iniciarSesionUseCase } from './iniciar-sesion'
import { EnviarCodigoDto, enviarCodigoUseCase } from './enviar-codigo'
import { VerificarCodigoDto, verificarCodigoUseCase } from './verificar-codigo'

export const registrar = (req: Request, res: Response, next: NextFunction): void => {
  const [error, regitrarDto] = RegistrarDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarUseCase(regitrarDto!)
    .then(() => res.json({ mensaje: 'Cuenta creada correctamente' }))
    .catch((error) => {
      next(error)
    })
}

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

export const enviarCodigo = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const [error, enviarCodigoDto] = EnviarCodigoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  enviarCodigoUseCase(enviarCodigoDto!)
    .then(() => res.json({ mensaje: 'El código fue enviado correctamente' }))
    .catch((error) => {
      next(error)
    })
}

export const verificarCodigo = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const [error, verificarCodigoDto] = VerificarCodigoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  verificarCodigoUseCase(verificarCodigoDto!)
    .then(({ mensaje, codigoValido }) => {
      if (!codigoValido) {
        res.status(400).json({ mensaje })
        return
      }
      res.json({ mensaje, codigoValido })
    })
    .catch((error) => {
      next(error)
    })
}
