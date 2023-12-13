import { jwtAdapter } from '@agente/adapters'
import { logger } from '@agente/configs'
import { prisma } from '@agente/database'
import type { NextFunction, Request, Response } from 'express'
import type { Socket } from 'socket.io'
import type { ExtendedError } from 'socket.io/dist/namespace'

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
  const [mensaje, nroDocumento] = await validarToken(token)

  if (mensaje != null || nroDocumento == null) {
    res.status(400).json({ mensaje })
    return
  }
  req.headers.idUser = nroDocumento
  req.body.idUser = nroDocumento
  next()
}

type NextSocket = (err?: ExtendedError | undefined) => void
export const socketAuth = async (
  socket: Socket,
  next: NextSocket,
): Promise<void> => {
  const { auth, headers } = socket.handshake
  const token = auth.token ?? headers.authorization

  const [mensaje, nroDocumento] = await validarToken(token)
  if (mensaje != null || nroDocumento == null) {
    next(new Error(mensaje))
    return
  }
  socket.handshake.headers.userId = nroDocumento
  next()
}

const validarToken = async (token: string): Promise<[string?, string?]> => {
  try {
    const payload = await jwtAdapter.validateToken<Payload>(token)
    if (!payload) return ['Token inválido']

    // TODO: Recuperar de cache
    const usuario = await prisma.cuentaUsuario.findUnique({
      where: { nroDocumento: payload.numeroDocumento },
    })
    if (!usuario) return ['Token inválido']
    if (!usuario.estadoRegistro) return ['Usuario no se encuentra activo']

    return [undefined, usuario.nroDocumento]
  } catch (error) {
    logger.error(error)
    return ['Ocurrió un error inesperado']
  }
}
