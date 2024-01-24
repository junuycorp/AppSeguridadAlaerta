import { Expo, type ExpoPushMessage } from 'expo-server-sdk'
import { envs, logger } from '@ciudadano/configs'
import { type Comunicado } from './comunicado.interface'

export const comunicadoUseCase = async (data: Comunicado): Promise<void> => {
  const pushTokens = ['ExponentPushToken[qxNHctLuVopjCirnHlqxxa]'] // example

  const expo = new Expo({ accessToken: envs.EXPO_ACCESS_TOKEN })

  logger.info('Enviando notificaciones a ciudadanos!')

  // Crear mensajes
  const messages: ExpoPushMessage[] = []
  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      logger.error(`Push token ${pushToken as string} no es válido`)
      continue
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      body: data.mensaje,
      data: { withSome: 'data' },
    })
  }

  const chunks = expo.chunkPushNotifications(messages)
  const tickets = []

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    } catch (error) {
      logger.error(error)
    }
  }
  logger.info('Notificaciones enviadas a ciudadanos!')

  /**
   * Obtener resultados de la notificacion
   */
  // const receiptIds = []
  // for (const ticket of tickets) {
  //   if (ticket.id != null) {
  //     receiptIds.push(ticket.id)
  //   }
  // }

  // const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)

  // for (const chunk of receiptIdChunks) {
  //   try {
  //     const receipts = await expo.getPushNotificationReceiptsAsync(chunk)
  //     console.log(receipts)

  //     // The receipts specify whether Apple or Google successfully received the
  //     // notification and information about an error, if one occurred.
  //     for (const receiptId in receipts) {
  //       const { status, message, details } = receipts[receiptId]
  //       if (status === 'ok') {
  //         continue
  //       } else if (status === 'error') {
  //         console.error(`There was an error sending a notification: ${message}`)
  //         if (details?.error) {
  //           // The error codes are listed in the Expo documentation:
  //           // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
  //           // You must handle the errors appropriately.
  //           console.error(`The error code is ${details.error}`)
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}
