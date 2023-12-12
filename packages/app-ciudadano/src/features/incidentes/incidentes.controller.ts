import type { Controller, EstadoIncidente } from '@ciudadano/shared/types'
import { RegistrarEventoDto, registrarEventoUseCase } from './registrar-evento'
import { listarPorDenuncianteUseCase } from './listar-eventos/listar-eventos.use-case'
import { ListarEventosDto } from './listar-eventos'
import { buscarEventoUseCase } from './buscar-evento'

type Archivos = Express.Multer.File[] | undefined

export const registrarEvento: Controller = (req, res, next) => {
  const nroDocumento = req.headers.idUser as string
  const archivos = req.files as Archivos
  const [error, dto] = RegistrarEventoDto.crear(req.body)
  if (error != null) {
    res.status(400).json({ mensaje: error })
    return
  }
  registrarEventoUseCase(dto!, nroDocumento, archivos)
    .then((resp) => {
      res.json({ mensaje: 'Incidente registrado correctamente', datos: resp })
    })
    .catch((error) => {
      next(error)
    })
}

export const buscarEvento: Controller = (req, res, next) => {
  const { idIncidente } = req.params
  buscarEventoUseCase(Number(idIncidente))
    .then((incidente) => {
      res.json(incidente)
    })
    .catch((error) => {
      next(error)
    })
}

export const listarPorDenunciante: Controller = (req, res, next) => {
  const idDenunciante = req.headers.idUser as string
  const [error, dto] = ListarEventosDto.crear(req.query)
  if (error != null) {
    res.status(400).json({ mensaje: error })
  }

  listarPorDenuncianteUseCase(
    idDenunciante,
    dto?.tamanio,
    dto?.estado as EstadoIncidente | undefined,
  )
    .then((incidentes) =>
      res.json({
        totalElementos: incidentes.length,
        datos: incidentes,
      }),
    )
    .catch((error) => {
      next(error)
    })
}
