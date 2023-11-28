import type { NextFunction, Request, Response } from 'express'
import { Prisma } from '@ciudadano/database'
import { logger } from '@ciudadano/configs'
import { CustomError } from '@ciudadano/errors'
import { AxiosError } from 'axios'
import { MulterError } from 'multer'

export const handleError = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Obtener informacion de la peticion
  const { user, payload, ...restBody } = req.body
  const request = {
    method: req.method,
    url: req.url,
    body: restBody,
    query: req.query,
    user: {
      nrodoc: payload?.numeroDocumento,
      name: payload?.razonSocial,
    },
  }

  // Controlar errores
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ mensaje: error.message })
    return
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error({
      name: error.name,
      code: error.code,
      meta: error.meta,
      message: error.message,
      request,
    })
    const mensajeError = error.message.split('\n').at(-1)
    res.status(409).json({
      mensaje: 'No se pudo realizar la operación solicitada',
      error: mensajeError,
    })
    return
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    logger.error({
      name: error.name,
      message: error.message,
      request,
    })
    const mensajeError = error.message.split('\n').at(-1)
    res.status(400).json({
      mensaje: 'El formato de alguno de los datos recibidos no son correctos',
      error: mensajeError,
    })
    return
  }
  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ mensaje: 'La solicitud tardó más de lo esperado' })
      return
    }
    if (error.code === 'ECONNREFUSED') {
      res.status(502).json({ mensaje: 'Lo solicitud no se encuentra disponible' })
      logger.error(error)
      return
    }
    const respError = error.response
    if (respError?.data !== undefined) {
      res.status(respError.status).json(respError.data)
      return
    }
  }

  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({
        mensaje: 'Ocurrió un error al subir los archivos',
        error,
      })
      return
    }
  }

  // Registrar error
  logger.error({ error, request })
  console.error(error)
  res
    .status(500)
    .json({ mensaje: 'Ocurrió un error inesperado. Intenteló nuevamente más tarde' })
}
