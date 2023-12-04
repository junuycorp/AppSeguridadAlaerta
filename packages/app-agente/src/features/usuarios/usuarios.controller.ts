import type { Controller } from '@agente/shared/types'
import {
  CrudUsuarioDto,
  actualizarUseCase,
  buscarUseCase,
  cambiarEstadoUseCase,
  crearUseCase,
  crudUsuarioMapper,
  eliminarUseCase,
  listarConPaginacionUseCase,
} from './crud-usuario'
import { toNumberOrUndefined } from '@agente/shared/helpers'

export const listar: Controller = (req, res, next) => {
  const { pagina, tamanio } = req.query
  const NumPagina = toNumberOrUndefined(pagina, 'Página')
  const NumTamanio = toNumberOrUndefined(tamanio, 'Tamaño de página')

  listarConPaginacionUseCase(NumPagina, NumTamanio)
    .then((resultado) =>
      res.json({
        ...resultado,
        datos: resultado.datos.map(crudUsuarioMapper),
      }),
    )
    .catch((error) => {
      next(error)
    })
}

export const buscar: Controller = (req, res, next) => {
  const [error, id] = CrudUsuarioDto.obtenerId(req.params)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  buscarUseCase(id!)
    .then((usuario) => {
      res.json(crudUsuarioMapper(usuario))
    })
    .catch((error) => {
      next(error)
    })
}

export const crear: Controller = (req, res, next) => {
  const nroDocumento = req.body.idUser
  const [error, dto] = CrudUsuarioDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  crearUseCase(dto!, nroDocumento)
    .then((usuario) =>
      res.json({
        mensaje: 'Usuario creado correctamente',
        datos: crudUsuarioMapper(usuario),
        // datos: usuario,
      }),
    )
    .catch((error) => {
      next(error)
    })
}

export const actualizar: Controller = (req, res, next) => {
  const nroDocumento = req.body.idUser
  const [error, crudDto] = CrudUsuarioDto.crear({ ...req.body, ...req.params })
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  actualizarUseCase(crudDto!, nroDocumento)
    .then((usuario) =>
      res.json({
        mensaje: 'Usuario actualizado correctamente',
        datos: crudUsuarioMapper(usuario),
      }),
    )
    .catch((error) => {
      next(error)
    })
}

export const eliminar: Controller = (req, res, next) => {
  const [error, id] = CrudUsuarioDto.obtenerId(req.params)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  eliminarUseCase(id!)
    .then((usuario) => {
      res.json({
        mensaje: 'Usuario eliminado correctamente',
        datos: crudUsuarioMapper(usuario),
      })
    })
    .catch((error) => {
      next(error)
    })
}

export const cambiarEstado: Controller = (req, res, next) => {
  const [error, estadoDto] = CrudUsuarioDto.obtenerEstado({
    ...req.body,
    ...req.params,
  })
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  cambiarEstadoUseCase(estadoDto!)
    .then((usuario) => {
      res.json({
        mensaje: 'Estado actualizado correctamente',
        datos: crudUsuarioMapper(usuario),
      })
    })
    .catch((error) => {
      next(error)
    })
}
