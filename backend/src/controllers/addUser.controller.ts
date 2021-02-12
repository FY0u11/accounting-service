import { Request, Response } from 'express'
import addUserService from '../services/addUser.service'

export default async (req: Request, res: Response) => {
  const user = req.body
  const result = await addUserService(user)
  res.status('error' in result ? 500 : 201).json(result)
}
