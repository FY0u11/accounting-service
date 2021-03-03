import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { User } from '../models/User'
config()

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/api/v1/auth') return next()
  if (!req.headers.authorization) return next({ status: 401, message: 'Authorization required' })
  const token = req.headers.authorization.split(' ')[1]
  let payload
  try {
    const tokenSecret = process.env.SECRET || ''
    payload = verify(token, tokenSecret) as { id: string }
  } catch (e) {
    return next({ status: 400, message: e.message })
  }
  const candidate = await User.findById(payload.id)
  if (!candidate) return next({ status: 400, message: 'Authorization failed, user from token not found' })
  req.user = { username: candidate.username, role: candidate.role, id: candidate._id }
  next()
}
