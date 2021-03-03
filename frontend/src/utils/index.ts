import { verify } from 'jsonwebtoken'

export const nF = () => {}

export const saveToken = (token: string) => {
  window.localStorage.setItem('token', token)
}

export const getTokenPayload = (token: string) => {
  const jwtSecret = process.env.NEXT_PUBLIC_SECRET
  if (!jwtSecret) {
    console.log('Missing NEXT_PUBLIC_SECRET in .env.local')
    return
  }
  return verify(token, jwtSecret) as {
    id: string
    role: 'admin' | 'user'
    username: string
  }
}
