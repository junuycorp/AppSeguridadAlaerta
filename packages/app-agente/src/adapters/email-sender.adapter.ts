import { envs } from '@agente/configs'
import { createTransport } from 'nodemailer'

const MAILER_EMAIL = envs.MAILER_EMAIL
const MAILER_PASS = envs.MAILER_PASS

const transporter = createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
})

const sendEmail = async (
  target: string,
  subject: string,
  html: string,
): Promise<void> => {
  const options = {
    from: MAILER_EMAIL,
    to: target,
    subject,
    html,
  }
  await transporter.sendMail(options)
}

export const emailSenderAdapter = {
  sendEmail,
}
