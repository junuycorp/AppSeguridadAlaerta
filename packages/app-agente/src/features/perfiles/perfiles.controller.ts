import type { Request, Response, NextFunction } from 'express'
import { crudPerfilMapper, listarUseCase } from './crud-perfil'

export const listar = (req: Request, res: Response, next: NextFunction): void => {
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
