import { envs } from '@ciudadano/configs'
import { createTransport } from 'nodemailer'

const MAILER_EMAIL = envs.MAILER_EMAIL
const MAILER_PASS = envs.MAILER_PASS
const MAILER_HOST = envs.MAILER_HOST
const MAILER_PORT = envs.MAILER_PORT

const transporter = createTransport({
  // service: 'gmail',
  host: MAILER_HOST,
  port: MAILER_PORT,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASS,
  },
  // tls: {
  //   rejectUnauthorized: true,
  // },
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
