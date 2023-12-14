import type { Server } from 'socket.io'
import type { Controller } from '@agente/shared/types'
import { CambiarEstadoDto } from './cambiar-estado.dto'
import { cambiarEstadoUseCase } from './cambiar-estado.use-case'
import { cambiarEstadoMapper } from './cambiar-estado.mapper'

export const cambiarEstado: Controller = (req, res, next) => {
  const { idIncidente } = req.params
  const [error, dto] = CambiarEstadoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
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
