import { compareSync, hashSync } from 'bcryptjs'

const hash = (password: string): string => {
  return hashSync(password)
}

const compare = (password: string, hashed: string): boolean => {
  return compareSync(password, hashed)
}

export const bcryptAdapter = {
  hash,
  compare,
}
