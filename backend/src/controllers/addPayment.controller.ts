import { Request, Response } from 'express'
import addPaymentService from '../services/addPayment.service'

export default async (req: Request, res: Response) => {
  const payment = req.body
  const result = await addPaymentService(payment)
  res.status('error' in result ? 500 : 201).json(result)
}
