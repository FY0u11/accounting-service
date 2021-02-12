import { Request, Response } from 'express'
import authService from '../services/auth.service'

export default async (req: Request, res: Response) => {
  const user = req.body

  const result = await authService(user)

  if (!result) {
    res.status(400).json({ status: 'Invalid login or password' })
    return
  }

  if (typeof result !== 'string') {
    res.status(500).json(result)
    return
  }

  res.json({ token: result })
}
