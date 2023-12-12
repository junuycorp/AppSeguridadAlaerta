/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { envs } from '@agente/configs'
import ffmpeg from 'fluent-ffmpeg'
import mime from 'mime-types'
import path from 'node:path'
import fs from 'node:fs'
import * as fsAsync from 'node:fs/promises'
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

export const existsFile = async (filePath: string): Promise<boolean> => {
  try {
    await fsAsync.access(filePath, fsAsync.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

export const thumbnailFromImageToDisk = async (
  imagePath: string,
  basePath: string,
  width: number = 100,
  height: number = 100,
): Promise<string> => {
  const thumbnailsPath = path.join('thumbnails', imagePath)
  const finalPath = path.join(envs.UPLOADS_PATH, thumbnailsPath)

  // Verificar si ya existe archivo
  if (await existsFile(path.join(basePath, thumbnailsPath))) return finalPath

  // Generar miniatura
  const outputPath = path.join(basePath, thumbnailsPath)
  const outputDirectory = outputPath.replace(/\/[^/]+$/, '')

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
  }

  const fullPathImage = path.join(basePath, imagePath)

  await sharp(fullPathImage).resize(width, height).toFile(outputPath)
  return finalPath
}

export const thumbnailFromVideoToDisk = async (
  videoPath: string,
  basePath: string,
  width: number = 100,
  height: number = 100,
): Promise<string> => {
  const relativeDirectory = videoPath.replace(/\/[^/]+$/, '')

  // Nombre de archivo
  const nameBase = path.basename(videoPath, path.extname(videoPath))
  const newName = nameBase + '.jpg'

  const thumbnailPath = path.join('thumbnails', relativeDirectory, newName)
  const finalPath = path.join(envs.UPLOADS_PATH, thumbnailPath)

  // Verificar si ya existe archivo
  if (await existsFile(path.join(basePath, thumbnailPath))) return finalPath

  // Generar miniatura
  const fullPathVideo = path.join(basePath, videoPath)
  const outputPath = path.join(basePath, 'thumbnails', videoPath)
  const outputDirectory = outputPath.replace(/\/[^/]+$/, '')

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
  }

  ffmpeg(fullPathVideo).screenshot({
    timestamps: [1],
    filename: newName,
    folder: outputDirectory,
    size: `${width}x${height}`,
  })

  return finalPath
}

export const thumbnailFromImageToBuffer = async (
  imagePath: string,
  width: number = 100,
  height: number = 100,
): Promise<Buffer> => {
  return await sharp(imagePath).resize(width, height).toBuffer()
}

export const thumbnailFromVideoToBuffer = async (
  videoPath: string,
  width: number = 100,
  height: number = 100,
): Promise<Buffer> => {
  const secondFrame = 1 // Frame del segundo 1
  const chunks: Uint8Array[] = []
  let imageBuffer: Buffer
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
      .on('data', (chunk) => {
        // Generar buffer del frame
        chunks.push(chunk)
        imageBuffer = Buffer.concat(chunks)
      })
      .on('end', () => {
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
