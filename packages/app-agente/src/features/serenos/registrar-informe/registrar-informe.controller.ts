import type { Controller } from '@agente/shared/types'
import { RegistrarInformeDto } from './registrar-informe.dto'
import { registrarInformeUseCase } from './registrar-informe.use-case'
import { registrarInformeMapper } from './registrar-informe.mapper'

type Archivos = Express.Multer.File[] | undefined
export const registrarInforme: Controller = (req, res, next) => {
  const idSereno = req.headers.idUser as string
  const archivos = req.files as Archivos
  const [error, dto] = RegistrarInformeDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarInformeUseCase(dto!, idSereno, archivos)
    .then((resp) => {
      res.json({
        mensaje: 'Informe registrado correctamente',
        datos: registrarInformeMapper(resp),
      })
    })
    .catch((error) => {
      next(error)
    })
}
