import { Request, Response } from 'express'
import getUserService from '../services/getUser.service'

export default async (req: Request, res: Response) => {
  const id = req.params.id as string
  const result = await getUserService(id)
  res
    .status(result ? ('status' in result ? result.status : 200) : 404)
    .json(result)
}
