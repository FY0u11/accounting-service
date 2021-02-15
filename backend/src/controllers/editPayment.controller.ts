import { Request, Response } from 'express'
import editPaymentService from '../services/editPayment.service'

export default async (req: Request, res: Response) => {
  const payment = req.body
  const id = req.params.id
  const result = await editPaymentService(id, payment)
  res.status('error' in result ? 500 : 201).json(result)
}
