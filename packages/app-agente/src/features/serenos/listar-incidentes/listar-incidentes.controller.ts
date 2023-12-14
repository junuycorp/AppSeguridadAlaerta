import type { Controller, Estado } from '@agente/shared/types'
import { ListarIncidentesDto } from './listar-incidentes.dto'
import { listarIncidentesPorSerenoUseCase } from './listar-incidentes.use-case'
import { listarIncidentesMapper } from './listar-incidentes.mapper'

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
