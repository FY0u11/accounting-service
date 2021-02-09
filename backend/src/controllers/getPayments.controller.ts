import { Request, Response } from 'express'
import getPaymentsService from '../services/getPayments.service'

export default async (req: Request, res: Response) => {
  const filter = req.query.filter as string
  const result = await getPaymentsService(filter)
  res.status('status' in result ? result.status : 200).json(result)
}
