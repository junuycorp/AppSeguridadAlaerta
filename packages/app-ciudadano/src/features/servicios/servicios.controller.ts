import type { NextFunction, Request, Response } from 'express'
import { ConsultaPersonaDto, consultaPersonaUseCase } from './consulta-persona'

export const consultaPersona = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const [error, dto] = ConsultaPersonaDto.crear(req.params)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  consultaPersonaUseCase(dto!)
    .then((persona) => {
      // Formatear respuesta
      res.json({
        numeroDocumento: persona.nroDocumento,
        razonSocial: persona.razonSocial,
        nombres: persona.nombres,
        apellidoPaterno: persona.apellidoPaterno,
        apellidoMaterno: persona.apellidoMaterno,
      })
    })
    .catch((error) => {
      next(error)
    })
}
