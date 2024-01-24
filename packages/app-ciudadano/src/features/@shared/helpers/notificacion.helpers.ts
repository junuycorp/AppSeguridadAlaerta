import { Expo, type ExpoPushMessage } from 'expo-server-sdk'
import { logger } from '@ciudadano/configs'
// import { type Comunicado } from './comunicado.interface'

const expo = new Expo()

export const sendPushNotifications = async (
  pushTokens: Array<string | null>,
  title: string,
  body: string,
): Promise<void> => {
  const messages: ExpoPushMessage[] = []
  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      logger.error(`Push token ${pushToken} no es válido`)
      continue
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      title,
      body,
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

  /**
   * Obtener resultados de la notificacion
   */
  // const receiptIds = []
  // for (const ticket of tickets) {
  //   if ((ticket as ExpoPushSuccessTicket).id != null) {
  //     receiptIds.push((ticket as ExpoPushSuccessTicket).id)
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
  //       const { status, message, details } = receipts[receiptId] as any
  //       if (status === 'ok') {
  //         continue
  //       } else if (status === 'error') {
  //         console.error(`There was an error sending a notification: ${message}`)
  //         if (details?.error) {
  //           console.error(`The error code is ${details.error}`)
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}
