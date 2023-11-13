import jwt from 'jsonwebtoken'
import { envs } from '@/configs'

const JWT_SEED = envs.JWT_SEED

const generateToken = async (
  payload: Record<string, unknown>,
  duration: string = '2h',
): Promise<string | null> => {
  // Transformar de callback a promesa
  return await new Promise((resolve) => {
    jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
      if (err) {
        resolve(null)
        return
      }
      resolve(token!)
    })
  })
}

const validateToken = async <T>(token: string): Promise<T | null> => {
  // Transformar de callback a promesa
  return await new Promise((resolve) => {
    jwt.verify(token, JWT_SEED, (err, decoded) => {
      if (err) {
        resolve(null)
        return
      }
      resolve(decoded as T)
    })
  })
}

export const jwtAdapter = {
  generateToken,
  validateToken,
}
