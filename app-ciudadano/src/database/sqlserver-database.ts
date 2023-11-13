/* eslint-disable @typescript-eslint/no-extraneous-class */
import { logger } from '@/configs'
import { prisma } from './prisma-client'

export class SqlServerDatabase {
  static async connect(): Promise<void> {
    try {
      await prisma.$queryRaw`SELECT 1`
      logger.info('Conectado a base de datos SQL-Server')
    } catch (error) {
      logger.error('Error al conectarse a la base de datos')
      throw error
    }
  }
}
