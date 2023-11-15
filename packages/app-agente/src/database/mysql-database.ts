/* eslint-disable @typescript-eslint/no-extraneous-class */
import { logger } from '@/configs'
import { prisma } from './prisma-client'

export class MysqlDatabase {
  static async connect(): Promise<void> {
    try {
      await prisma.$queryRaw`SELECT 1`
      logger.info('Conectado a base de datos MySql')
    } catch (error) {
      logger.error('Error al conectarse a la base de datos')
      throw error
    }
  }
}
