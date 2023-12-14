import type { Controller, Estado } from '@agente/shared/types'
import { ListarEventosDto } from './listar-eventos.dto'
import { listarIncidenteMapper } from './listar-eventos.mapper'
import {
  listarPorDenuncianteUseCase,
  listarUseCase,
} from './listar-eventos.use-case'

export const listar: Controller = (req, res, next) => {
  const [error, dtoQuery] = ListarEventosDto.crear(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
  }
  const { fechaInicio, fechaFin, idTipoIncidente, estado } = dtoQuery!
  listarUseCase(fechaInicio, fechaFin, idTipoIncidente, estado as Estado)
    .then((incidentes) =>
      res.json({
        totalElementos: incidentes.length,
        datos: incidentes.map(listarIncidenteMapper),
      }),
    )
    .catch((error) => {
      next(error)
    })
}

export const listarPorDenunciante: Controller = (req, res, next) => {
  const { idDenunciante } = req.params
  const [error, dto] = ListarEventosDto.listarPorDenunciante(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
  }

  listarPorDenuncianteUseCase(idDenunciante, dto?.tamanio, dto?.estado as Estado)
    .then((incidentes) =>
      res.json({
        totalElementos: incidentes.length,
        datos: incidentes.map(listarIncidenteMapper),
      }),
    )
    .catch((error) => {
      next(error)
    })
}
