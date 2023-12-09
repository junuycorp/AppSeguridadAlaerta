/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mime from 'mime-types'

export const getFileType = (filePath: string): string => {
  const mimeType = mime.lookup(filePath)

  if (mimeType) {
    // Si se encuentra el tipo MIME, puedes determinar el tipo de archivo
    if (mimeType.startsWith('image')) return 'imagen'
    else if (mimeType.startsWith('video')) return 'video'
    else if (mimeType.startsWith('audio')) return 'audio'
    else return 'otro'
  } else {
    // Si no se encuentra el tipo MIME, el tipo de archivo es desconocido
    return 'desconocido'
  }
}
