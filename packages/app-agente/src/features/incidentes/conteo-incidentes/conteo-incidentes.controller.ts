import type { Controller } from '@agente/shared/types'
import { conteoIncidentesUseCase } from './conteo-incidentes.use-case'

export const conteoIncidentes: Controller = (req, res, next) => {
  const { idCentroPoblado } = req.params
  conteoIncidentesUseCase(Number(idCentroPoblado))
    .then((resp) => {
      res.json({
        totalElementos: (resp as unknown[]).length,
        datos: resp,
      })
    })
    .catch((error) => {
      next(error)
    })
}
