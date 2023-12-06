import type { Controller } from '@agente/shared/types'
import { RegistroEventoDto, registroEventoUseCase } from './registro-evento'
import { incidenteMapper } from './incidentes.mapper'
import type { Server } from 'socket.io'
import { listarUseCase } from './listar-eventos'
import { listarIncidenteMapper } from './listar-eventos/listar-eventos.mapper'
import { ListarEventosDto } from './listar-eventos/listar-eventos.dto'
import type { Estado, Tipo } from './incidentes.repository'

export const listar: Controller = (req, res, next) => {
  const [error, dtoQuery] = ListarEventosDto.crear(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
  }
  const { fechaInicio, fechaFin, tipo, estado } = dtoQuery!
  listarUseCase(fechaInicio, fechaFin, tipo as Tipo, estado as Estado)
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

export const registroEvento: Controller = (req, res, next) => {
  const [error, dto] = RegistroEventoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registroEventoUseCase(dto!)
    .then((incidente) => {
      const io = req.app.get('socketio') as Server
      const mapIncidente = incidenteMapper(incidente)

      io.emit('server:nuevo-incidente', mapIncidente)
      res.json({
        mensaje: 'Incidente registrado correctamente',
        datos: mapIncidente,
      })
    })
    .catch((error) => {
      next(error)
    })
}
