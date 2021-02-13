import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/auth' || req.url === '/users') {
    next()
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ status: 'Authorization required' })
    return
  }

  const token = req.headers.authorization.replace(/^bearer /i, '')
  try {
    const payload = verify(token, process.env.SECRET) as { id: string }
    req.user = { id: payload.id }
  } catch (e) {
    res.status(400).json({ status: e.message })
    return
  }
  await next()
}
