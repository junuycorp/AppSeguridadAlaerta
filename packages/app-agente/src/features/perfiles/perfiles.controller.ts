import {
  CrudPerfilDto,
  actualizarUseCase,
  buscarUseCase,
  cambiarEstadoUseCase,
  crearUseCase,
  crudPerfilMapper,
  eliminarUseCase,
  listarUseCase,
} from './crud-perfil'
import type { Controller } from '../@shared/types'

export const listar: Controller = (req, res, next) => {
  listarUseCase()
    .then((entidades) => {
      res.json({
        totalElementos: entidades.length,
        datos: entidades.map(crudPerfilMapper),
      })
    })
    .catch((error) => {
      next(error)
    })
}

export const buscar: Controller = (req, res, next) => {
  const [error, id] = CrudPerfilDto.obtenerId(req.params)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  buscarUseCase(id!)
    .then((perfil) => {
      res.json(crudPerfilMapper(perfil))
    })
    .catch((error) => {
      next(error)
    })
}

export const crear: Controller = (req, res, next) => {
  const [error, crudDto] = CrudPerfilDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  crearUseCase(crudDto!)
    .then((perfil) => {
      res.json({
        mensaje: 'Perfil creado correctamente',
        datos: crudPerfilMapper(perfil),
      })
    })
    .catch((error) => {
      next(error)
    })
}

export const actualizar: Controller = (req, res, next) => {
  const [error, crudDto] = CrudPerfilDto.crear(req.body)
  const [errorId, id] = CrudPerfilDto.obtenerId(req.params)
  const mensaje = error ?? errorId
  if (error != null) {
    res.status(400).json({ mensaje })
    return
  }
  actualizarUseCase(crudDto!, id!)
    .then((perfil) =>
      res.json({
        mensaje: 'Perfil actualizado correctamente',
        datos: crudPerfilMapper(perfil),
      }),
    )
    .catch((error) => {
      next(error)
    })
}

export const eliminar: Controller = (req, res, next) => {
  const [error, id] = CrudPerfilDto.obtenerId(req.params)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  eliminarUseCase(id!)
    .then((perfil) => {
      res.json({
        mensaje: 'Perfil eliminado correctamente',
        datos: crudPerfilMapper(perfil),
      })
    })
    .catch((error) => {
      next(error)
    })
}

export const cambiarEstado: Controller = (req, res, next) => {
  const [error, estadoPerfilDto] = CrudPerfilDto.obtenerEstado({
    ...req.body,
    ...req.params,
  })
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  cambiarEstadoUseCase(estadoPerfilDto!)
    .then((perfil) => {
      res.json({
        mensaje: 'Estado actualizado correctamente',
        datos: crudPerfilMapper(perfil),
      })
    })
    .catch((error) => {
      next(error)
    })
}
