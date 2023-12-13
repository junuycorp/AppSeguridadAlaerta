import type { Controller, Estado, Tipo } from '@agente/shared/types'
import { RegistroEventoDto, registroEventoUseCase } from './registro-evento'
import { incidenteMapper } from './incidentes.mapper'
import type { Server } from 'socket.io'
import { listarPorDenuncianteUseCase, listarUseCase } from './listar-eventos'
import { listarIncidenteMapper } from './listar-eventos/listar-eventos.mapper'
import { ListarEventosDto } from './listar-eventos/listar-eventos.dto'
import { buscarEventoMapper, buscarEventoUseCase } from './buscar-evento'
import {
  CambiarEstadoDto,
  cambiarEstadoMapper,
  cambiarEstadoUseCase,
} from './cambiar-estado'
import {
  AsignarIncidenteDto,
  asignarIncidenteUseCase,
  incidenteSerenoMapper,
} from './asignar-incidente'

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

export const buscarEvento: Controller = (req, res, next) => {
  const { idIncidente } = req.params
  buscarEventoUseCase(Number(idIncidente))
    .then((incidente) => {
      res.json(buscarEventoMapper(incidente))
    })
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

export const cambiarEstado: Controller = (req, res, next) => {
  const { idIncidente } = req.params
  const [error, dto] = CambiarEstadoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return cambiarEstadoUseCase
  }
  cambiarEstadoUseCase(Number(idIncidente), dto!)
    .then((incidente) => {
      const io = req.app.get('socketio') as Server
      const mapIncidente = cambiarEstadoMapper(incidente)

      io.emit('server:cambio-estado', mapIncidente)
      res.json({
        mensaje: 'Incidente actualizado correctamente',
        datos: mapIncidente,
      })
    })
    .catch((error) => {
      next(error)
    })
}

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
