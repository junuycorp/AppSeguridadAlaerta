import type { Controller } from '@ciudadano/shared/types'
import { RegistrarEventoDto, registrarEventoUseCase } from './registrar-evento'

export const registrarEvento: Controller = (req, res, next) => {
  const nroDocumento = req.headers.idUser as string
  const [error, dto] = RegistrarEventoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarEventoUseCase(dto!, nroDocumento)
    .then((resp) => {
      res.json({ mensaje: 'Incidente registrado correctamente', datos: resp })
    })
    .catch((error) => {
      next(error)
    })
}
