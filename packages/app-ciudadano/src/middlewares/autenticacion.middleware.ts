import { jwtAdapter } from '@ciudadano/adapters'
import { logger } from '@ciudadano/configs'
import { prisma } from '@ciudadano/database'
import type { NextFunction, Request, Response } from 'express'

interface Payload {
  numeroDocumento: string
  razonSocial: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
}

export const autenticarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = req.header('Authorization')
  if (authorization == null) {
    res.status(401).json({ mensaje: 'No se proporcionó ningún token' })
    return
  }
  if (!authorization.startsWith('Bearer ')) {
    res.status(401).json({ mensaje: 'Bearer token inválido' })
    return
  }

  const token = authorization.split(' ').at(1) ?? ''

  try {
    const payload = await jwtAdapter.validateToken<Payload>(token)
    if (!payload) {
      res.status(401).json({ mensaje: 'Token inválido' })
      return
    }

    // TODO: Recuperar de cache
    const usuario = await prisma.cuentaUsuario.findUnique({
      where: { nroDocumento: payload.numeroDocumento },
    })

    if (!usuario) {
      res.status(400).json({ mensaje: 'Token inválido' })
      return
    }
    // Verificar si usuario esta activo
    if (!usuario.estadoRegistro) {
      res.status(401).json({ mensaje: 'Usuario no se encuentra activo' })
      return
    }
    req.body.user = usuario
    req.body.payload = payload
  } catch (error) {
    logger.error(error)
    res.status(500).json({ mensaje: 'Ocurrió un error inesperado' })
  }
  next()
}
