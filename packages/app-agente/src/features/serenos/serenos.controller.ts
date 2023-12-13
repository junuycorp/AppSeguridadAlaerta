import type { Controller, Estado } from '@agente/shared/types'
import { AsignarIncidenteDto, asignarIncidenteUseCase } from './asignar-incidente'
import { incidenteSerenoMapper } from './asignar-incidente/asignar-incidente.mapper'
import { listarIncidentesPorSerenoUseCase } from './listar-incidentes/listar-incidentes.use-case'
import { ListarIncidentesDto } from './listar-incidentes/listar-incidentes.dto'
import { listarIncidentesMapper } from './listar-incidentes'

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

// export const listar: Controller = (req, res, next) => {
//   listarUseCase()
//     .then((entidades) => {
//       res.json({
//         totalElementos: entidades.length,
//         datos: entidades.map(crudPerfilMapper),
//       })
//     })
//     .catch((error) => {
//       next(error)
//     })
// }

export const asignarIncidente: Controller = (req, res, next) => {
  const [error, dto] = AsignarIncidenteDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }

  // TODO: Notificar a sereno con socket.io
  asignarIncidenteUseCase(dto!)
    .then((resp) =>
      res.json({
        mensaje: 'Asignado correctamente',
        datos: incidenteSerenoMapper(resp),
      }),
    )
    .catch((error) => {
      next(error)
    })
}
