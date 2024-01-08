import path from 'node:path'
import http from 'node:http'
import express, { type Router } from 'express'
import cors from 'cors'
import { Server as SocketServer } from 'socket.io'

import {
  handleError,
  logRequest,
  emptyStringsToNull,
  socketAuth,
} from '@ciudadano/middlewares'
import { logger } from './logger'
import { swaggerDocs } from './swagger'
import { socketController } from '@ciudadano/sockets'

export type Environment = 'development' | 'production' | 'test'
export const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads')

interface Options {
  port?: number
  routes: Router
  environment?: Environment
}

export class Server {
  public readonly app = express()
  public readonly server = http.createServer(this.app)
  public readonly io = new SocketServer(this.server, {
    cors: { origin: '*' },
  })

  private readonly port: number
  private readonly routes: Router
  private readonly environment: Environment

  constructor(options: Options) {
    const { port = 8080, routes, environment = 'development' } = options
    this.port = port
    this.routes = routes
    this.environment = environment
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json()) // Lectura del body
    this.app.use(express.static('public')) // Directorio publico
    this.app.use(logRequest(this.environment)) // Registrar peticiones
    this.app.use(emptyStringsToNull) // Formatear peticion
  }

  public sockets(): void {
    this.app.set('socketio', this.io)
    this.io.use(socketAuth)
    socketController(this.io)
  }

  async start(): Promise<void> {
    this.middlewares()
    this.sockets()
    swaggerDocs(this.app, this.port)
    this.app.use(this.routes)
    this.app.use(handleError)
    this.server.listen(this.port, () => {
      logger.info(`Ejecución en MODO ${this.environment.toUpperCase()}`)
      logger.info(`Servidor corriendo en el puerto ${this.port}`)
    })
  }
}
