import type { Controller } from '@agente/shared/types'
import { RegistrarUsuarioDto, registrarUsuarioUseCase } from './registrar-usuario'
import {
  CrudUsuarioDto,
  actualizarUseCase,
  buscarUseCase,
  cambiarEstadoUseCase,
  crudUsuarioMapper,
  eliminarUseCase,
  listarUseCase,
} from './crud-usuario'

export const listar: Controller = (req, res, next) => {
  listarUseCase()
    .then((usuarios) =>
      res.json({
        totalElementos: usuarios.length,
        datos: usuarios.map(crudUsuarioMapper),
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

export const actualizar: Controller = (req, res, next) => {
  const [error, crudDto] = CrudUsuarioDto.crear(req.body)
  const [errorId, id] = CrudUsuarioDto.obtenerId(req.params)
  const mensaje = error ?? errorId
  if (mensaje != null) {
    res.status(400).json({ mensaje })
    return
  }
  actualizarUseCase(crudDto!, id!)
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

export const registrarUsuario: Controller = (req, res, next) => {
  const usuario = req.body.user
  const [error, dto] = RegistrarUsuarioDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarUsuarioUseCase(dto!, usuario.nroDocumento)
    .then((usuario) =>
      res.json({
        mensaje: 'Usuario registrado correctamente',
        datos: crudUsuarioMapper(usuario),
      }),
    )
    .catch((error) => {
      next(error)
    })
}
