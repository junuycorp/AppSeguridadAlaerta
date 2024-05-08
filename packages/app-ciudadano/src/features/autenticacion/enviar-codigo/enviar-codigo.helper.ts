import { emailSenderAdapter, smsSenderAdapter } from '@ciudadano/adapters'

export const enviarCodigoPorCorreo = async (
  emailDestino: string,
  codigoVerificacion: string,
): Promise<void> => {
  const asunto = 'MegaSeguro - Código de verificación'
  const html = getHtmlSignUp(codigoVerificacion)
  await emailSenderAdapter.sendEmail(emailDestino, asunto, html)
}

export const enviarCodigoPorSms = async (
  numeroCelularDestino: string,
  codigoVerificacion: string,
): Promise<void> => {
  // const celular = `+51${numeroCelularDestino}`
  // const mensaje = `Su código de verificación es ${codigoVerificacion}. No comparta este código con nadie`
  // const mensaje = `Su código de verificación es ${codigoVerificacion}`
  const mensaje = `${codigoVerificacion}`

  await smsSenderAdapter.sendSms(numeroCelularDestino, mensaje)
}

export const getHtmlSignUp = (code: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificación de Registro</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #333;
        }
    
        p {
          color: #666;
        }
    
        .verification-code {
          background-color: #00A319;
          color: #fff;
          padding: 10px;
          font-size: 18px;
          text-align: center;
          margin: 20px 0;
          border-radius: 5px;
        }
    
        .footer {
          text-align: center;
          color: #999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Verificación de Registro</h2>
        <p>Gracias por registrarte en MegaSeguro. Para completar tu registro, por favor utiliza el siguiente código de verificación:</p>
    
        <div class="verification-code">
          ${code}
        </div>
    
        <p>Ingresa este código para finalizar el proceso de registro. Si no has solicitado este registro, por favor ignora este correo.</p>
    
        <p>¡Gracias!</p>
    
        <div class="footer">
          <p>Este correo electrónico fue enviado automáticamente. Por favor, no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>`
}
