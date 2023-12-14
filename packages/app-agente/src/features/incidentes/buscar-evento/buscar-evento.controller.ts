import type { Controller } from '@agente/shared/types'
import { buscarEventoUseCase } from './buscar-evento.use-case'
import { buscarEventoMapper } from './buscar-evento.mapper'

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
