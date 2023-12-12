import http from 'node:http'
import express, { type Router } from 'express'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'
import {
  handleError,
  logRequest,
  emptyStringsToNull,
  socketAuth,
} from '@agente/middlewares'
import { logger } from './logger'
import { swaggerDocs } from './swagger'
import { socketController } from '@agente/sockets'
import path from 'node:path'

export type Environment = 'development' | 'production' | 'test'
export const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads')

interface Options {
  port?: number
  routes: Router
  environment?: Environment
}

export class Server {
  private readonly app = express()
  public readonly server = http.createServer(this.app)
  private readonly io = new SocketServer(this.server, {
    cors: {
      origin: ['http://localhost:5173', 'http://seguridad.junuy.pe'],
    },
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
    this.app.use('/uploads', express.static(uploadsPath)) // Directorio uploads
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
