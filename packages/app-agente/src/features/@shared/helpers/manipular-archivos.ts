/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ffmpeg from 'fluent-ffmpeg'
import mime from 'mime-types'
import path from 'node:path'
import sharp from 'sharp'

const fileTypes = {
  image: 'imagen',
  video: 'video',
  audio: 'audio',
} as const

const fileExtensions = {
  pdf: 'doc-pdf',
  doc: 'doc-word',
  docx: 'doc-word',
  xls: 'doc-excel',
  xlsx: 'doc-excel',
  ppt: 'doc-ppoint',
  pptx: 'doc-ppoint',
} as const

type IObject = Record<string, string>

export const getFileType = (filePath: string): string => {
  const mimeType = mime.lookup(filePath)

  if (mimeType) {
    // Si se encuentra el tipo MIME, puedes determinar el tipo de archivo
    const type = mimeType.split('/')[0]
    const fileType = (fileTypes as IObject)[type]
    if (fileType != null) return fileType

    const ext = path.extname(filePath).slice(1)
    const fileExtension = (fileExtensions as IObject)[ext]
    if (fileExtension != null) return fileExtension

    return 'otro'
  } else {
    // Si no se encuentra el tipo MIME, el tipo de archivo es desconocido
    return 'desconocido'
  }
}

export const thumbnailFromImage = async (
  imagePath: string,
  width: number = 100,
  height: number = 100,
): Promise<Buffer> => {
  return await sharp(imagePath).resize(width, height).toBuffer()
}

export const thumbnailFromVideo = async (
  videoPath: string,
  width: number = 100,
  height: number = 100,
): Promise<Buffer> => {
  const secondFrame = 1 // Frame del segundo 1
  return await new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .seekInput(secondFrame) // Tiempo de captura del frame
      .frames(1) // Cantidad de frames
      .toFormat('image2')
      .on('error', (err) => {
        reject(err)
      })
      .pipe()
      .on('data', (imageBuffer: Buffer) => {
        // Recortar frame
        sharp(imageBuffer)
          .resize(width, height)
          .toBuffer()
          .then((thumbnailBuffer) => {
            resolve(thumbnailBuffer)
          })
          .catch((err) => {
            reject(err)
          })
      })
  })
}
