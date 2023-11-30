import path from 'node:path'
import fs from 'node:fs'
import type { Buffer } from 'node:buffer'

export const bufferToDisk = (
  fileBuffer: Buffer,
  baseDirectory: string,
  filename: string,
): void => {
  if (!fs.existsSync(baseDirectory)) {
    fs.mkdirSync(baseDirectory, { recursive: true })
  }
  const fileDirectory = path.join(baseDirectory, filename)

  fs.writeFile(fileDirectory, fileBuffer, (error) => {
    if (error) throw new Error(error.message)
  })
}
