import type { Controller, Estado } from '@agente/shared/types'
import {
  listarIncidentesMapper,
  ListarIncidentesDto,
  listarIncidentesPorSerenoUseCase,
} from './listar-incidentes'
import {
  RegistrarInformeDto,
  registrarInformeMapper,
  registrarInformeUseCase,
} from './registrar-informe'

export const listarIncidentePorSereno: Controller = (req, res, next) => {
  const idSereno = req.headers.idUser as string
  const [error, dto] = ListarIncidentesDto.crear(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  listarIncidentesPorSerenoUseCase(idSereno, dto?.estado as Estado, dto?.tamanio)
    .then((incidentes) => {
      res.json({
        totalElementos: incidentes.length,
        datos: incidentes.map(listarIncidentesMapper),
      })
    })
    .catch((error) => {
      next(error)
    })
}

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
