import { NextFunction, Request, Response } from 'express'
import { authService } from '../services/auth.service'

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body
  try {
    res.json({ data: await authService(user) })
  } catch (e) {
    await next(e)
  }
}
