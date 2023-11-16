import { envs } from '@agente/configs'
import axios from 'axios'

// Phone target format: 9xxxxxxxx
export const sendSms = async (phoneTarget: string, body: string): Promise<void> => {
  const urlSms = envs.SMS_API
  const bodyRequest = {
    nroCelular: phoneTarget,
    sms: body,
  }
  await axios.post(urlSms, bodyRequest)
}

export const smsSenderAdapter = {
  sendSms,
}
